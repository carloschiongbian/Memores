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
GET_PATIENTS = "/api/get-patients"
GET_PATIENTS_V2 = "/api/get-patients-v2"
GET_PATIENT_DETAILS = "/api/get-patient-details/id=<id>"
UPDATE_PATIENT_DETAILS = '/api/update-patient-details'
UPDATE_PATIENT_NOTES = '/api/update-patient-notes'
CREATE_PATIENT = "/api/create-patient"
ADD_USER = "/api/add-user"
LOGIN = "/api/login"
CURRENT_USER = "/api/@me"
LOGOUT = "/api/logout"
PATIENT_RECORDS = "/api/patient-records"
DELETE_PATIENT_RECORD = "/api/patient-records/delete/id=<id>"
DASHBOARD = "/api/dashboard"

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
UPDATE_USER_AND_PHOTO = '/api/update-user-and-photo'
UPDATE_USER_AND_LICENSE = '/api/update-user-and-license'
UPDATE_BOTH_IMAGE = '/api/update-both-image'
UPDATE_USER_DETAILS_ONLY = '/api/update-user-only'
