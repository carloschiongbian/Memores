// SHARED
const INDEX = "/"
const ERROR_404 = "/error-404"


// USER ROUTES
const SCREENING = "/screening"
const DASHBOARD = "/dashboard"
const PATIENT_RECORDS = "/patient-records"
const PATIENT_DETAILS = "/patient-details/id=:id"


// ADMIN ROUTES
const USER_RECORDS = "/user-record"
const ADMIN_DASHBOARD = "/admin-dashboard"

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
        USER_RECORDS, ADMIN_DASHBOARD,
    }
}

export default routes
