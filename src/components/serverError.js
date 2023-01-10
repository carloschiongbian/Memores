// Render this if there is a problem fetching the data in the database during a page visit.
// i.e., when a user visits the url /patient-details/id=1, and the server cannot provide
// the necessary patient details for some reason, we need to show a user-friendly component
// rather than showing a technical react error (default behaviour if error is not handled properly).
const ServerError = () => {
    return (
        <div className="container w-100">
            <div className="bg-white rounded-4 d-flex align-items-center justify-content-center mt-4 px-4" style={{ "minHeight": "250px", "height": "500px" }}>
                <div className="align-self-center" style={{ "maxWidth": "500px" }}>
                    <div className="d-flex align-items-end">
                        <h1 className='h1 text-wrap mb-0'>500</h1> 
                        <h1 className='h1 text-wrap mb-0'><span className="fs-1 text-danger">Server Error</span></h1> 
                    </div>
                    <h2 className='h3'>Oops! Something went wrong.</h2>
                    <p>There seems to be a temporary problem or glitch with the internal server. Try to refresh the page or try to visit the page after a few minutes. If the problem persists, feel free to contact us.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ServerError;