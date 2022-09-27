import UserNavigationMenu from '../components/userNavigationMenu';
import '../public/css/pages/UserPage/index.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Footer from '../components/footer';

const UserPage = () => {

    // better to use useReducer() hook for userInfo state
    const [userInfo, setUserInfo] = useState({})
    const [isEdittable, setIsEdittable] = useState(false)
    const passwordInput = useRef()
    const confirmPasswordInput = useRef()
    const [shouldShowConfirmPassword, setShouldShowConfirmPassword] = useState(false)
    const [shouldShowPassword, setShouldShowPassword] = useState(false)

    useEffect(() => {

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
            country: "Philippines",
            zipCode: "6014"
        }

        try {
            userInfo.licenseImage = require('../public/images/license.jpg')
        } catch {
            userInfo.licenseImage = require('../public/images/default-license-if-none-exists.jpg')
        }

        setUserInfo(userInfo)
    }, [])

    const handleShowPassword = (e, isReset = false) => {

        // if the function is called via handleDiscardChanges or
        // handleSaveChanges then, we reset its state back to
        // 'password' and not perform any toggle
        if (isReset) {
            passwordInput.current.type = 'password'
            confirmPasswordInput.current.type = 'password'
            setShouldShowPassword(false)
            setShouldShowConfirmPassword(false)
            return
        }

        // Toggle event

        if (!isEdittable) return

        let ref
        if (e === 'password') {
            ref = passwordInput
            setShouldShowPassword(!shouldShowPassword)
        } else {
            ref = confirmPasswordInput
            setShouldShowConfirmPassword(!shouldShowConfirmPassword)
        }

        ref.current.type = ref.current.type === 'text' ? 'password' : 'text'
    }

    const handleDiscardChanges = () => {

        // reset userInfo object
        // ...

        setIsEdittable(false)
        handleShowPassword('password', true)
        handleShowPassword('confirm-password', true)
    }

    const hnadleSaveChanges = () => {

        // do a post request
        // update userInfo object
        // ...

        setIsEdittable(false)
        handleShowPassword('password', true)
        handleShowPassword('confirm-password', true)

    }

    return (
        <>
            <UserNavigationMenu></UserNavigationMenu>
            <div className="container">

                {/* Breadcrumbs */}
                <nav aria-label="breadcrumb" className='py-4 border-bottom d-flex justify-content-between flex-grow-1 flex-wrap'>
                    <ol className="breadcrumb mb-0 align-items-center py-lg-0 py-2">
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

                    <div className='d-flex'>
                        <button className='btn btn-outline-primary me-2'>
                            <span><i className="bi bi-printer-fill"></i></span>
                        </button>

                        {
                            !isEdittable &&
                            <button className='btn btn-primary ms-2' onClick={() => setIsEdittable(true)}>
                                <span><i className="bi bi-pencil-square"></i></span> Edit Clinician
                            </button>
                        }

                        {
                            isEdittable &&
                            <div>
                                <button className='btn btn-danger ms-2' onClick={handleDiscardChanges}>
                                    <span><i className="bi bi-x-lg"></i></span>
                                </button>
                                <button className='btn btn-success ms-2' onClick={hnadleSaveChanges}>
                                    <span><i className="bi bi-check-lg"></i></span>
                                </button>
                            </div>
                        }
                    </div>
                </nav>

                <section className='py-4 mb-4'>
                    <div className='row'>

                        {/* Personal Information */}
                        <div className="col-12 col-lg-6">
                            <h5 className='fw-bold'>Personal Information</h5>
                            <div className='mb-3'>
                                <label htmlFor="contact-number" className="form-label">Professional license</label>


                                <div className='position-relative'>
                                    <img src={userInfo.licenseImage} alt="" className='professional-license' />

                                    <div className={`d-flex align-items-center justify-content-center ${isEdittable ? 'upload-image-inner-container' : ''}`}>
                                        <div className='upload-button' title="Upload a new professional license...">
                                            <input className='inputfile' type="file" name="professional-license" accept="image/*" />
                                            <label><i className="bi bi-camera-fill text-primary" height="30" width="30"></i></label>
                                        </div>
                                    </div>
                                </div>



                            </div>
                            <div className="mb-3">
                                <label htmlFor="license-number" className="form-label">License Number</label>
                                <input type="text" className="form-control" id="license-number" placeholder="License Number" defaultValue={userInfo.licenseNumber} readOnly={!isEdittable} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="first-name" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="first-name" placeholder="First Name" defaultValue={userInfo.firstName} readOnly={!isEdittable} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="last-name" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="last-name" placeholder="Last Name" defaultValue={userInfo.lastName} readOnly={!isEdittable} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email-address" className="form-label">Email Address</label>
                                <input type="email" className="form-control" id="email-address" placeholder="Email Address" defaultValue={userInfo.emailAddress} readOnly={!isEdittable} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contact-number" className="form-label">Contact Number</label>
                                <input type="text" className="form-control" id="contact-number" placeholder="Contact Number" defaultValue={userInfo.contactNumber} readOnly={!isEdittable} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="birthdate" className="form-label">Date of Birth</label>
                                <input type="date" className="form-control" id="birthdate" defaultValue={userInfo.dateOfBirth} readOnly={!isEdittable} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <select name="gender" id="gender" className='form-select' defaultValue={userInfo.gender} disabled={!isEdittable}>
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
                                <input type="text" className="form-control" id="username" placeholder="Username" defaultValue={userInfo.userName} readOnly={!isEdittable} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-group">
                                    <input ref={passwordInput} type="password" className="form-control" id="password" placeholder="Password" data-toggle="password" defaultValue={userInfo.password} readOnly={!isEdittable} />
                                    <div className="input-group-append" onClick={() => { handleShowPassword('password') }}>
                                        <span className="input-group-text" id="basic-addon2">
                                            <i className={`bi ${shouldShowPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                                <div className="input-group">
                                    <input ref={confirmPasswordInput} type="password" className="form-control" id="confirm-password" placeholder="Confirm Password" defaultValue={userInfo.confirmPassword} readOnly={!isEdittable} />
                                    <div className="input-group-append" onClick={() => { handleShowPassword('confirm-password') }}>
                                        <span className="input-group-text" id="basic-addon2">
                                            <i className={`bi ${shouldShowConfirmPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <hr className='my-4' />

                            <h5 className='fw-bold'>Address Information</h5>
                            <div className="mb-3">
                                <label htmlFor="street-address" className="form-label">Street Address</label>
                                <input type="text" className="form-control" id="street-address" placeholder="Street Address" defaultValue={userInfo.streetAddress} readOnly={!isEdittable} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text" className="form-control" id="city" placeholder="City" defaultValue={userInfo.city} readOnly={!isEdittable} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">Country</label>
                                <select name="country" id="country" className='form-select' defaultValue={userInfo.country} disabled={!isEdittable}>
                                    <option defaultValue="male">Philippines</option>
                                    <option defaultValue="female">South Korea</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="zip-code" className="form-label">Zip Code</label>
                                <input type="text" className="form-control" id="zip-code" placeholder="Zip Code" defaultValue={userInfo.zipCode} readOnly={!isEdittable} />
                            </div>
                        </div>

                    </div>
                </section>


            </div>
            
        </>

    );
}

export default UserPage;