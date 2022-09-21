import UserNavigationMenu from '../components/userNavigationMenu';
import { Link } from 'react-router-dom';

const UserPage = () => {
    return (
        <>
            <UserNavigationMenu></UserNavigationMenu>
            <div className="container">

                {/* Breadcrumbs */}
                <nav aria-label="breadcrumb" className='py-4 border-bottom d-flex justify-content-between'>
                    <ol className="breadcrumb mb-0 align-items-center">
                        <li className="breadcrumb-item">
                            <Link to="/userRecord" className='text-decoration-none text-primary fw-bold'>
                                Clinician List</Link>
                        </li>
                        <li className="breadcrumb-item text-success fw-bold">
                            Clinician
                        </li>
                        <li className="breadcrumb-item text-dark fw-bold">
                            John Doe
                        </li>
                    </ol>

                    <div>
                        <button className='btn btn-outline-primary me-2'>
                            <span><i class="bi bi-printer-fill"></i></span>
                        </button>
                        <button className='btn btn-primary ms-2'>
                            <span><i class="bi bi-pencil-square"></i></span> Edit Clinician
                        </button>
                    </div>
                </nav>

                <section>
wfwef
                </section>

            </div>
        </>

    );
}

export default UserPage;