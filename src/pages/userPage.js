import "../public/css/pages/UserPage/index.css";
import { useState } from "react";
import countriesSelect from "../components/countriesSelect";

const UserPage = ({ register, handleSubmit, reset, errors, imagePreview }) => {
  const [isEdittable, setIsEdittable] = useState(false);

  const handleDiscardChanges = () => {
    reset();
    setIsEdittable(false);
  };

  const handleSaveChanges = () => {
    // do a post request
    // update userInfo object
    // ...

    setIsEdittable(false);
  };

  return (
    <div className="container">
      <nav
        aria-label="breadcrumb"
        className="py-4 border-bottom d-flex justify-content-end flex-grow-1 flex-wrap"
      >
        <div className="d-flex">
          {/* <button className="btn btn-outline-primary me-2">
            <span>
              <i className="bi bi-printer-fill"></i>
            </span>
          </button> */}

          {!isEdittable && (
            <button
              className="btn btn-primary ms-2"
              onClick={() => setIsEdittable(true)}
            >
              <span>
                <i className="bi bi-pencil-square"></i>
              </span>
              Edit Clinician
            </button>
          )}

          {isEdittable && (
            <div>
              <button
                className="btn btn-danger ms-2"
                onClick={handleDiscardChanges}
              >
                <span>
                  <i className="bi bi-x-lg"></i>
                </span>
              </button>
              <button className="btn btn-success ms-2" onClick={handleSubmit}>
                <span>
                  <i className="bi bi-check-lg"></i>
                </span>
              </button>
            </div>
          )}
        </div>
      </nav>
      <section className="py-4 mb-4">
        <form>
          <div className="row">
            {/* Personal Information */}
            <div className="col-12 col-lg-6">
              <h5 className="fw-bold">Personal Information</h5>
              <div className="mb-3">
                <label htmlFor="contact-number" className="form-label">
                  Profile Photo
                </label>

                <div className="position-relative">
                  <img
                    style={{ objectFit: "scale-down" }}
                    src={"data:image/png;base64," + imagePreview.profile}
                    alt=""
                    className="professional-license"
                  />

                  <div
                    className={`d-flex align-items-center justify-content-center ${
                      isEdittable ? "upload-image-inner-container" : ""
                    }`}
                  >
                    <div
                      className="upload-button"
                      title="Upload a new professional license..."
                    >
                      <input
                        {...register("profile")}
                        className="inputfile"
                        type="file"
                        name="profile"
                        accept="image/*"
                      />
                      <label>
                        <i
                          className="bi bi-camera-fill text-primary"
                          height="30"
                          width="30"
                        ></i>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="contact-number" className="form-label">
                  Professional license
                </label>

                <div className="position-relative">
                  <img
                    style={{ objectFit: "scale-down" }}
                    src={"data:image/png;base64," + imagePreview.img}
                    alt=""
                    className="professional-license"
                  />

                  <div
                    className={`d-flex align-items-center justify-content-center ${
                      isEdittable ? "upload-image-inner-container" : ""
                    }`}
                  >
                    <div
                      className="upload-button"
                      title="Upload a new professional license..."
                    >
                      <input
                        {...register("img")}
                        className="inputfile"
                        type="file"
                        name="img"
                        accept="image/*"
                      />
                      <label>
                        <i
                          className="bi bi-camera-fill text-primary"
                          height="30"
                          width="30"
                        ></i>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="license-number" className="form-label">
                  License Number
                </label>
                <input
                  {...register("license")}
                  name="license"
                  type="text"
                  className="form-control"
                  id="license-number"
                  placeholder="License Number"
                  readOnly={!isEdittable}
                />
                {errors.license && (
                  <span className="text-danger">{errors.license.message}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="first-name" className="form-label">
                  First Name
                </label>
                <input
                  {...register("firstname")}
                  name="firstname"
                  type="text"
                  className="form-control"
                  id="first-name"
                  placeholder="First Name"
                  readOnly={!isEdittable}
                />
                {errors.firstname && (
                  <span className="text-danger">
                    {errors.firstname.message}
                  </span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="last-name" className="form-label">
                  Last Name
                </label>
                <input
                  {...register("lastname")}
                  type="text"
                  className="form-control"
                  id="last-name"
                  placeholder="Last Name"
                  readOnly={!isEdittable}
                />
                {errors.lastname && (
                  <span className="text-danger">{errors.lastname.message}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email-address" className="form-label">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="form-control"
                  id="email-address"
                  name="email"
                  placeholder="Email Address"
                  readOnly={!isEdittable}
                />
                {errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="contact-number" className="form-label">
                  Contact Number
                </label>
                <input
                  {...register("contact")}
                  type="text"
                  className="form-control"
                  id="contact-number"
                  name="contact"
                  placeholder="Contact Number"
                  readOnly={!isEdittable}
                />
                {errors.contact && (
                  <span className="text-danger">{errors.contact.message}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="birthdate" className="form-label">
                  Date of Birth
                </label>
                <input
                  {...register("birthday", { valueAsDate: true })}
                  type="date"
                  className="form-control"
                  id="birthdate"
                  name="birthday"
                  readOnly={!isEdittable}
                />
                {errors.birthday && (
                  <span className="text-danger">{errors.birthday.message}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  {...register("gender")}
                  name="gender"
                  id="gender"
                  className="form-select"
                  disabled={!isEdittable}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <span className="text-danger">{errors.gender.message}</span>
                )}
              </div>
            </div>

            {/* Account Information */}
            <div className="col-12 col-lg-6">
              <h5 className="fw-bold">Address Information</h5>
              <div className="mb-3">
                <label htmlFor="street-address" className="form-label">
                  Street Address
                </label>
                <input
                  {...register("address")}
                  type="text"
                  className="form-control"
                  id="street-address"
                  name="address"
                  placeholder="Street Address"
                  readOnly={!isEdittable}
                />
                {errors.address && (
                  <span className="text-danger">{errors.address.message}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  {...register("city")}
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  placeholder="City"
                  readOnly={!isEdittable}
                />
                {errors.city && (
                  <span className="text-danger">{errors.city.message}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select
                  {...register("country")}
                  name="country"
                  id="country"
                  className="form-select"
                  disabled={!isEdittable}
                >
                  {countriesSelect.map((d) => (
                    <option key={d.label} value={d.label}>
                      {d.label}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <span className="text-danger">{errors.country.message}</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="zip-code" className="form-label">
                  Zip Code
                </label>
                <input
                  {...register("zipcode")}
                  type="text"
                  className="form-control"
                  id="zip-code"
                  name="zipcode"
                  placeholder="Zip Code"
                  readOnly={!isEdittable}
                />
                {errors.zipcode && (
                  <span className="text-danger">{errors.zipcode.message}</span>
                )}
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UserPage;
