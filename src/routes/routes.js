// SHARED
const INDEX = "/"
const ERROR_404 = "/error-404"


// USER ROUTES
const SCREENING = "/screening"
const DASHBOARD = "/dashboard"
const PATIENT_RECORDS = "/patient-records"
const PATIENT_DETAILS = "/patient-details"


// ADMIN ROUTES
const USER_RECORDS = "/user-record"
const USER_DETAILS = "/user-details/:id"
const CREATE_USER = "/create-user"

// ADD THE ROUTES HERE TOO
const routes = {
    shared: {
        INDEX, ERROR_404
    },
    user: {
        SCREENING, DASHBOARD,
        PATIENT_RECORDS, PATIENT_DETAILS
    },
    admin: {
        USER_RECORDS, USER_DETAILS,
        CREATE_USER
    }
}

export default routes
