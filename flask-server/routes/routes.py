"""
This file contains all the routes in our API.
Names should be in uppercase to denote that it is CONSTANT.

ROUTE FORMAT SAMPLE:
    goal: To get a specific user
    api route: "/api/get-specific-user"
    constant: GET_SPECIFIC_USER

    variable should look like:
    GET_SPECIFIC_USER = "/api/get-specific-user"
"""

GET_USERS = "/api/get-users"
QUESTIONS = '/api/get-assessment-questions'
ADD_USER = "/api/add-user"
LOGIN = "/api/login"
CURRENT_USER = "/api/@me"
LOGOUT = "/api/logout"
PATIENT_RECORDS = "/patient-records"
PATIENT_DETAILS = "/patient-details/id=<id>"
