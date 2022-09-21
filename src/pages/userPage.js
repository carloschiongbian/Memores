import UserNavigationMenu from '../components/userNavigationMenu';
import '../public/css/pages/UserPage/index.css'
import { Link } from 'react-router-dom';

const UserPage = () => {

    const userInfo = {
        licenseImage: require('../public/images/license.jpg'),
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
        country: "Philippines",
        zipCode: "6014"
    }


    return (
        <>
            <UserNavigationMenu></UserNavigationMenu>
            <div className="container">

                {/* Breadcrumbs */}
                <nav aria-label="breadcrumb" className='py-4 border-bottom d-flex justify-content-between flex-grow-1 flex-wrap'>
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
                            <span><i className="bi bi-printer-fill"></i></span>
                        </button>
                        <button className='btn btn-primary ms-2'>
                            <span><i className="bi bi-pencil-square"></i></span> Edit Clinician
                        </button>
                        <button className='btn btn-danger ms-2'>
                            <span><i className="bi bi-x-lg"></i></span>
                        </button>
                        <button className='btn btn-success ms-2'>
                            <span><i className="bi bi-check-lg"></i></span>
                        </button>
                    </div>
                </nav>

                <section className='pt-4'>
                    <div className='row'>

                        {/* Personal Information */}
                        <div className="col-12 col-lg-6">
                            <h5 className='fw-bold'>Personal Information</h5>
                            <div className='mb-3'>
                                <label htmlFor="contact-number" className="form-label">Professional license</label>


                                <div className='position-relative'>
                                    <img src={userInfo.licenseImage} alt="" className='professional-license' />

                                    <div className='upload-image-inner-container d-flex align-items-center justify-content-center'>
                                        <div className='upload-button' title="Upload a new professional license...">

                                            <input className='inputfile' type="file" name="pic" accept="image/*" style={{ cursor: "pointer" }} />
                                            <label><i className="bi bi-camera-fill text-primary" height="30" width="30"></i></label>
                                        </div>
                                    </div>
                                </div>



                            </div>
                            <div className="mb-3">
                                <label htmlFor="license-number" className="form-label">License Number</label>
                                <input type="text" className="form-control" id="license-number" placeholder="License Number" defaultValue={userInfo.licenseNumber} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="first-name" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="first-name" placeholder="First Name" defaultValue={userInfo.firstName} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="last-name" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="last-name" placeholder="Last Name" defaultValue={userInfo.lastName} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email-address" className="form-label">Email Address</label>
                                <input type="email" className="form-control" id="email-address" placeholder="Email Address" defaultValue={userInfo.emailAddress} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contact-number" className="form-label">Contact Number</label>
                                <input type="text" className="form-control" id="contact-number" placeholder="Contact Number" defaultValue={userInfo.contactNumber} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="birthdate" className="form-label">Date of Birth</label>
                                <input type="date" className="form-control" id="birthdate" defaultValue={userInfo.dateOfBirth} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <select name="gender" id="gender" className='form-select' defaultValue={userInfo.gender} disabled>
                                    <option defaultValue="male">Male</option>
                                    <option defaultValue="female">Female</option>
                                </select>
                            </div>
                        </div>



                        {/* Account Information */}
                        <div className="col-12 col-lg-6">
                            <h5 className='fw-bold'>Account Information</h5>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" placeholder="Username" defaultValue={userInfo.userName} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" defaultValue={userInfo.password} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="confirm-password" placeholder="Confirm Password" defaultValue={userInfo.confirmPassword} readOnly />
                            </div>

                            <hr className='my-4' />

                            <h5 className='fw-bold'>Address Information</h5>
                            <div className="mb-3">
                                <label htmlFor="street-address" className="form-label">Street Address</label>
                                <input type="text" className="form-control" id="street-address" placeholder="Street Address" defaultValue={userInfo.streetAddress} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text" className="form-control" id="city" placeholder="City" defaultValue={userInfo.city} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">Country</label>
                                <select name="country" id="country" className='form-select' defaultValue={userInfo.country} disabled>
                                    <option defaultValue="male">Philippines</option>
                                    <option defaultValue="female">South Korea</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="zip-code" className="form-label">Zip Code</label>
                                <input type="text" className="form-control" id="zip-code" placeholder="Zip Code" defaultValue={userInfo.zipCode} readOnly />
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </>

    );
}

export default UserPage;