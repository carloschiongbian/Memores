import UserNavigationMenu from "../components/userNavigationMenu";
import "../public/css/pages/PatientRecord/patientRecord.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import SelectCountries from "../components/countriesSelect";
// const FILE_SIZE = 720 * 720;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "other" },
];
const schema = yup
    .object({
      img: yup.mixed(),
      firstname: yup
        .string()
        .min(2)
        .max(25)
        .matches("^[A-Za-z ]*$", {
          message: "Special characters is not allowed",
          excludeEmptyString: true,
        })
        .required(),
      lastname: yup
        .string()
        .min(2)
        .max(25)
        .matches("^[A-Za-z ]*$", {
          message: "Special characters is not allowed",
          excludeEmptyString: true,
        })
        .required(),
      email: yup.string().email().required(),
      contact: yup
        .string()
        .matches("^[0-9 -]*$", {
          message: "Number, dash and spaces only",
          excludeEmptyString: true,
        })
        .required(),
      birthday: yup.date().required(),
      gender: yup
        .object()
        .shape({
          label: yup.string().required("Gender is required"),
          value: yup.string().required("Gender is required"),
        })
        .nullable()
        .required("Gender is required"),
      username: yup.string().required(),
      password: yup.string().min(4).max(12).required(),
      confirm: yup
        .string()
        .min(4)
        .max(12)
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required(),
      address: yup.string().required(),
      city: yup.string().required(),
      country: yup
        .object()
        .shape({
          label: yup.string().required("Country is required"),
          value: yup.string().required("Country is required"),
        })
        .nullable()
        .required("country is required"),
      zipcode: yup.string().required(),
    })
    .required();
  
  const CreatePatient = () => {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
  
    const onSubmit = async (data) => {
      let formData = new FormData();
      formData.append("img", data.img[0]);
      for (let key in data) {
        if (key === "gender") {
          formData.append(key, data[key].label);
        } else if (key === "country") {
          formData.append(key, data[key].label);
        } else if (key === "img") {
        } else {
          formData.append(key, data[key]);
        }
      }
  
      const response = await fetch("/register", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        console.log("Registered Successfully!");
      }
    };
  
    return (
      <div className="patient-records-container">
        <UserNavigationMenu />
        <form
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          enctype="multipart/form-data"
        >
          <div className="container">
            <div className="row">
              <div className="col">
                <h3>Setup Personal Information</h3>
                <hr />
                <div className="form-group">
                  <label htmlFor="img" className="form-label">
                    Please upload a clear image of the Patient.
                  </label>
                  <input
                    {...register("img")}
                    type="file"
                    name="img"
                    id="img"
                    className="form-control"
                    onChange={(e) => console.log(e.target.files[0])}
                  />
                  {errors.img && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "12px", marginBottom: "0px" }}
                    >
                      {errors.img.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="firstname" className="form-label">
                    Firstname
                  </label>
                  <input
                    {...register("firstname")}
                    type="text"
                    name="firstname"
                    placeholder="Enter Firstname"
                    className="form-control"
                    autoComplete="off"
                  />
                  {errors.firstname && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "12px", marginBottom: "0px" }}
                    >
                      {errors.firstname.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="lastname" className="form-label">
                    Lastname
                  </label>
                  <input
                    {...register("lastname")}
                    type="text"
                    id="lastname"
                    placeholder="Enter Lastname"
                    className="form-control"
                  />
                  {errors.lastname && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "12px", marginBottom: "0px" }}
                    >
                      {errors.lastname.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    placeholder="Enter Email Address"
                    className="form-control"
                  />
                  {errors.email && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "12px", marginBottom: "0px" }}
                    >
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="contact" className="form-label">
                    Contact Number
                  </label>
                  <input
                    {...register("contact")}
                    type="text"
                    id="contact"
                    placeholder="Enter Contact Number"
                    className="form-control"
                  />
                  {errors.contact && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "12px", marginBottom: "0px" }}
                    >
                      {errors.contact.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="birthday" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    {...register("birthday")}
                    type="date"
                    id="birthday"
                    placeholder="Enter Birthday"
                    className="form-control"
                  />
                  {errors.birthday && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "12px", marginBottom: "0px" }}
                    >
                      {errors.birthday.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isClearable
                        isSearchable={false}
                        className="form-control"
                        options={options}
                      />
                    )}
                  />
                  <span
                    className="text-danger"
                    style={{ fontSize: "12px", marginBottom: "0px" }}
                  >
                    {errors.gender?.message || errors.gender?.label.message}
                  </span>
                </div>
              </div>
              <div className="col">
                <h3>Setup Account Information</h3>
                <hr />
                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    {...register("username")}
                    type="text"
                    id="username"
                    placeholder="Enter Username"
                    className="form-control"
                  />
                  {errors.username && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "12px", marginBottom: "0px" }}
                    >
                      {errors.username.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    className="form-control"
                  />
                  {errors.password && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "12px", marginBottom: "0px" }}
                    >
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="confirm" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    {...register("confirm")}
                    type="password"
                    id="confirm"
                    placeholder="Re-Enter Confirm Password"
                    className="form-control"
                  />
                  {errors.confirm && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "12px", marginBottom: "0px" }}
                    >
                      {errors.confirm.message}
                    </span>
                  )}
                </div>
                <h3>Setup Address Information</h3>
                <hr />
                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    Street Address
                  </label>
                  <input
                    {...register("address")}
                    type="text"
                    id="address"
                    placeholder="Enter Street Address"
                    className="form-control"
                  />
                  {errors.address && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "12px", marginBottom: "0px" }}
                    >
                      {errors.address.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    {...register("city")}
                    type="text"
                    id="city"
                    placeholder="Enter City"
                    className="form-control"
                  />
                  {errors.city && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "12px", marginBottom: "0px" }}
                    >
                      {errors.city.message}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isClearable
                        className="form-control"
                        options={SelectCountries}
                      />
                    )}
                  />
                  <span
                    className="text-danger"
                    style={{ fontSize: "12px", marginBottom: "0px" }}
                  >
                    {errors.country?.message || errors.country?.label.message}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="zipcode" className="form-label">
                    ZIP Code
                  </label>
                  <input
                    {...register("zipcode")}
                    type="text"
                    id="zipcode"
                    placeholder="Enter ZIP Code"
                    className="form-control"
                  />
                  {errors.zipcode && (
                    <span
                      className="text-danger"
                      style={{ fontSize: "12px", marginBottom: "0px" }}
                    >
                      {errors.zipcode.message}
                    </span>
                  )}
                </div>
                <hr />
                <button type="submit" className="btn btn-primary form-control">
                  Create Patient
                </button>
                <hr />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };
  export default CreatePatient;
  