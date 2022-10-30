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
QUESTIONS = "/api/get-assessment-questions"
ADD_USER = "/api/add-user"
LOGIN = "/api/login"
CURRENT_USER = "/api/@me"
LOGOUT = "/api/logout"
PATIENT_RECORDS = "/patient-records"
DELETE_PATIENT_RECORD = "/patient-records/delete/id=<id>"
PATIENT_DETAILS = "/patient-details/id=<id>"
DASHBOARD = "/dashboard"

SUBMIT_ANSWERS = "/api/submit-answers"
UPDATE_USER_ACCOUNT = "/api/update-user"
GET_USER_ACCOUNT_DETAILS = "/api/get-user-account"
DELETE_USER = '/api/delete-user'
GET_USER_VIEW = '/api/get-user-view'
GET_DASHBOARD_DATA = '/api/get-dashboard-data'
GET_DELETED_USERS = '/api/get-deleted-users'
GET_UPDATED_USERS = '/api/get-updated-users'
GET_DISTINCT_ROLES = '/api/get-distinct-roles'
GET_GENERAL_USERS = '/api/get-general-users'
