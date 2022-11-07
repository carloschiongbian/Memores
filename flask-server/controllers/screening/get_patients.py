from flask import session, jsonify, request
from models.patients import Patients
from models.assessments import Assessments
from connection.connection import db, ma

# ... has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
# can be misleading, it sometimes mean that there's a syntax or logic error in the backend.

# https://stackoverflow.com/a/16664376/15440045
# request.args: key/value pairs in the URL query string
# if there is a need to perform an OR query, u can do
# so like filter((Patients.lname.like(search)) | Patients.fname.like(search))
# HOWEVER: SEARCHING USING WILDCARD WILL NOT WORK HERE DUE TO THE ENCRYPTION'S LIMITATION
# SEE GITHUB ISSUE: https://github.com/kvesteri/sqlalchemy-utils/issues/454
# SEE ALSO: https://www.mail-archive.com/sqlalchemy@googlegroups.com/msg23408.html
def get_patients():

    user_id = session.get("user_id")
    #Check if session exist
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    name = request.args.get('name')
    per_page = request.args.get('perPage')
    current_page = request.args.get('currentPage')
    user = request.args.get('createdBy')

    if user is None:
        user = user_id

    query = db.session.query(*Patients.__table__.columns,
                            Assessments.id.label("assessment_id"),
                            Assessments.prediction_result, Assessments.classification_probability,
                            Assessments.date_taken).\
                    select_from(Patients)
    
    if name:
        query = query.filter(Patients.lname.like(name) | Patients.fname.like(name))
        '''
        # the best way to do it is using wildcard, however, this will only work
        # if the columns are not encrypted, since encryption has a limitation.
        search = "%{}%".format(name)
        query = query.filter(Patients.fullname.like(search))
        '''

    # We need to get their patient's assessment history, too
    query = query.outerjoin(Assessments, Patients.id == Assessments.patient_id).\
                filter(Patients.created_by == int(user)).order_by(Patients.id)

    # get the total instances before pagination
    ctr = query.count()

    # If these are not None, it means we had many records and were paginated,
    # the request suggests that the user has clicked the prev/next page.
    if per_page is not None and current_page is not None:
        per_page = int(per_page)
        current_page = int(current_page)
        query = query.offset((current_page * per_page) - per_page).limit(per_page)
    else:
        # get the first five only, and paginate the rest
        query = query.offset(0).limit(5)

    patients = query.all() 
    patients_response_obj = patient_assessments_schema.jsonify(patients)

    return jsonify({
        "patients": patients_response_obj.get_json(),
        "total": str(ctr)
    })


def get_patients_v2():
    '''
        This function implementation will fetch ALL the patient records in the database.
        Pagination and search functions should be done in the front end.

        If wishing to fetch limited data, i.e., 5 records per page with or without search, 
        use the get_patients() implementation above, however, it will only work if the cols
        are not encrypted.
    '''

    user_id = session.get("user_id")
    #Check if session exist
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = request.args.get('createdBy')
    if user is None:
        user = user_id

    query = db.session.query(*Patients.__table__.columns,
                            Assessments.id.label("assessment_id"),
                            Assessments.prediction_result, Assessments.classification_probability,
                            Assessments.date_taken).\
                    select_from(Patients)

    query = query.outerjoin(Assessments, Patients.id == Assessments.patient_id).\
                filter(Patients.created_by == int(user)).order_by(Patients.id)

    # get the total instances before pagination
    ctr = query.count()

    patients = query.all() 
    patients_response_obj = patient_assessments_schema.jsonify(patients)

    return jsonify({
        "patients": patients_response_obj.get_json(),
        "total": str(ctr)
    })
    

# This is the schema for the joined result of the tables 'patients' and 'assessments'
# We have to create a schema so that we can serialize (jsonify() and get_json()) the Response Object (returned by query).
# otherwise, we cannot return this to the front end
# Also, we specify which fields from the 'patients' and 'assessments' table are to be returned.
# It is necessary to do it this way because these fields need to be serialized
class PatientAssessmentSchema(ma.Schema):
    class Meta:
        fields = ('id', 'fname', 'lname', 'fullname', 'assessment_id', 'prediction_result', 'classification_probability', 'result_description', 'date_taken', 'created_by')


patient_assessments_schema = PatientAssessmentSchema(many = True)