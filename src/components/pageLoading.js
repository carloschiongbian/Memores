const PageLoading = () => {
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center h-100 w-100" style={{minHeight: "100vh"}}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
}

export default PageLoading;