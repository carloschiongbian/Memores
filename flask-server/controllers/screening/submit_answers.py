from flask import request, jsonify
from machine_learning_model.parser import SVM_Model

# https://stackoverflow.com/a/16664376/15440045
# request.json: parsed JSON data
def submit_answers():    

    request_obj = request.json
    # print(request.json)

    model = SVM_Model(request_obj)
    model.parse_request_object()
    model.standardize()
    model.parse_answers()
    classification, prob = model.predict()

    # print(classification, prob)
    return jsonify({"classification": classification, "probability": prob})