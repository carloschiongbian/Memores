const Header = ({ handleLeftNavigation }) => {

    return (
        <nav id="nav" className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" style={{ "transition": "margin-left 0.5s" }}>
            <div className="container-fluid text-white">

                <div className="d-flex">
                    {/* Button for Left Navigation Menu */}
                    <button className="btn btn-primary me-4" onClick={() => handleLeftNavigation()}>&#9776;</button>
                    <a href="/" className="navbar-brand text-white">Dashboard</a>
                </div>
            </div>
        </nav>
    );
}

export default Header;