from flask import session, jsonify, request
from models.patients import Patients, patient_schema, patients_schema

# https://stackoverflow.com/a/16664376/15440045
# request.args: key/value pairs in the URL query string
# if there is a need to perform an OR query, u can do
# so like filter((Patients.lname.like(search)) | Patients.fname.like(search))
def get_patients():

    user_id = session.get("user_id")
    #Check if session exist
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    name = request.args.get('name')
    per_page = request.args.get('perPage')
    current_page = request.args.get('currentPage')

    query = Patients.query
    if name is not None:
        search = "%{}%".format(name)
        query = query.filter(Patients.fullname.like(search))

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
    patients_response = patients_schema.jsonify(patients)
    
    return jsonify({
        "patients": patients_response.get_json(),
        "total": str(ctr)
    })
    
