from flask import request, jsonify, session
from machine_learning_model.parser import SVM_Model

# https://stackoverflow.com/a/16664376/15440045
# request.json: parsed JSON data
def submit_answers():

    user_id = session.get("user_id")
     #Check if session exist
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401    

    request_obj = request.get_json()
    # print(request_obj['data'])

    model = SVM_Model(request_obj['data'])
    model.parse_request_object()
    model.standardize()
    model.parse_answers()
    classification, prob = model.predict()

    # print(classification, prob)
    return jsonify({"classification": str(classification), "probability": str(prob)})