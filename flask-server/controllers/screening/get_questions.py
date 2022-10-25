from flask import session, jsonify
from models.questions import Questions, questions_schema

def get_questions():

    user_id = session.get("user_id")
     #Check if session exist
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    questions = Questions.query.all()
    return questions_schema.jsonify(questions)