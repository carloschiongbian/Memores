import UserNavigationMenu from '../components/userNavigationMenu';
import { Link } from 'react-router-dom';

const UserPage = () => {

    const userInfo = {
        firstName: "Velvet",
        lastName: "Crowe",
        licenseNumber: "12345ABCD6789XXY",
        emailAddress: "velvetcrowe@memores.org",
        contactNumber: "09271231234",
        dateOfBirth: "2000-08-08",
        gender: "female",
        userName: "velvet_crowe",
        password: "p@ssw0rd",
        confirmPassword: "",
        streetAddress: "Aball, Village of Longing",
        city: "Eastgand",
        Country: "Philippines",
        zipCode: "6014"
    }


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
                        <button className='btn btn-danger ms-2'>
                            <span><i class="bi bi-x-lg"></i></span>
                        </button>
                        <button className='btn btn-success ms-2'>
                            <span><i class="bi bi-check-lg"></i></span>
                        </button>
                    </div>
                </nav>

                <section className='pt-4'>
                    <div className='row'>

                        <div className="col">
                            <h5 className='fw-bold'>Personal Information</h5>
                            <div>
                            <label for="contact-number" class="form-label">Professional license</label>
                                <div className='py-4 px-4 bg-gray text-white text-center'>
                                    This is an image placeholder.
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="license-number" class="form-label">License Number</label>
                                <input type="text" class="form-control" id="license-number" placeholder="License Number" />
                            </div>
                            <div class="mb-3">
                                <label for="first-name" class="form-label">First Name</label>
                                <input type="text" class="form-control" id="first-name" placeholder="First Name" />
                            </div>
                            <div class="mb-3">
                                <label for="last-name" class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="last-name" placeholder="Last Name" />
                            </div>
                            <div class="mb-3">
                                <label for="email-address" class="form-label">Email Address</label>
                                <input type="email" class="form-control" id="email-address" placeholder="Email Address" />
                            </div>
                            <div class="mb-3">
                                <label for="contact-number" class="form-label">Contact Number</label>
                                <input type="text" class="form-control" id="contact-number" placeholder="Contact Number" />
                            </div>
                            <div class="mb-3">
                                <label for="birthdate" class="form-label">Date of Birth</label>
                                <input type="date" class="form-control" id="birthdate" value="2000-08-08" />
                            </div>
                            <div class="mb-3">
                                <label for="gender" class="form-label">Gender</label>
                                <select name="gender" id="gender" className='form-select'>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>




                        <div className="col">
                            <h5 className='fw-bold'>Account Information</h5>
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input type="text" class="form-control" id="username" placeholder="Username" />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" placeholder="Password" />
                            </div>
                            <div class="mb-3">
                                <label for="confirm-password" class="form-label">Confirm Password</label>
                                <input type="password" class="form-control" id="confirm-password" placeholder="Confirm Password" />
                            </div>

                            <hr className='my-4'/>

                            <h5 className='fw-bold'>Address Information</h5>
                            <div class="mb-3">
                                <label for="street-address" class="form-label">Street Address</label>
                                <input type="text" class="form-control" id="street-address" placeholder="Street Address" />
                            </div>
                            <div class="mb-3">
                                <label for="city" class="form-label">City</label>
                                <input type="text" class="form-control" id="city" placeholder="City" />
                            </div>
                            <div class="mb-3">
                                <label for="country" class="form-label">Country</label>
                                <select name="country" id="country" className='form-select'>
                                    <option value="male">Philippines</option>
                                    <option value="female">South Korea</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="zip-code" class="form-label">Zip Code</label>
                                <input type="text" class="form-control" id="zip-code" placeholder="Zip Code" />
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </>

    );
}

export default UserPage;