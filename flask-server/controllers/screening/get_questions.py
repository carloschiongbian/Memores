from flask import request
from models.questions import Questions, questions_schema

def get_questions():
    questions = Questions.query.all()
    return questions_schema.jsonify(questions)