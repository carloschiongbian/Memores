import "../public/css/pages/PatientRecord/patientRecord.css";
import { Controller } from "react-hook-form";
// import Select from "react-select";
import SelectCountries from "../components/countriesSelect";
import {
  TextField,
  Grid,
  Divider,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";

const options = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const CreateUser = ({
  register,
  handleSubmit,
  reset,
  errors,
  control,
  setValueForm1,
}) => {
  const { inputRefForLicenseNum, ...inputPropsForLicenseNum } =
    register("license");
  const { inputRefForFirstname, ...inputPropsForFirstname } =
    register("firstname");
  const { inputRefForLastname, ...inputPropsForLastname } =
    register("lastname");
  const { inputRefForEmail, ...inputPropsForEmail } = register("email");
  const { inputRefForContact, ...inputPropsForContact } = register("contact");
  const { inputRefForBirthday, ...inputPropsForBirthday } =
    register("birthday");
  const { inputRefForGender, ...inputPropsForGender } = register("gender");
  const { inputRefForUsername, ...inputPropsForUsername } =
    register("username");
  const { inputRefForPassword, ...inputPropsForPassword } =
    register("password");
  const { inputRefForConfirm, ...inputPropsForConfirm } = register("confirm");
  const { inputRefForAddress, ...inputPropsForAddress } = register("address");
  const { inputRefForCity, ...inputPropsForCity } = register("city");
  const { inputRefForCountry, ...inputPropsForCountry } = register("country");
  const { inputRefForZipCode, ...inputPropsForZipCode } = register("zipcode");

  return (
    <form
      // method="post"
      // // onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Card variant="outlined">
            <Divider>Personal Information</Divider>
            <CardContent>
              <div className="form-group">
                <label htmlFor="profile" className="form-label">
                  Profile Photo
                </label>
                <input
                  id="profile"
                  className="form-control"
                  {...register("profile")}
                  accept="image/*"
                  type="file"
                />
                {errors.profile && (
                  <span
                    className="text-danger"
                    style={{ fontSize: "12px", marginBottom: "0px" }}
                  >
                    {errors.profile.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="img" className="form-label">
                  License Photo
                </label>
                <input
                  id="img"
                  className="form-control"
                  {...register("img")}
                  accept="image/*"
                  type="file"
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
              <Grid item>
                <Controller
                  name={"license"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForLicenseNum}
                      {...inputPropsForLicenseNum}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"License Number/ID Number"}
                      type="input"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.license}
                      helperText={errors?.license?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name={"firstname"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForFirstname}
                      {...inputPropsForFirstname}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"First name"}
                      type="input"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.firstname}
                      helperText={errors?.firstname?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name={"lastname"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForLastname}
                      {...inputPropsForLastname}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"Last name"}
                      type="input"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.lastname}
                      helperText={errors?.lastname?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name={"email"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForEmail}
                      {...inputPropsForEmail}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"Email"}
                      type="email"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name={"contact"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForContact}
                      {...inputPropsForContact}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"Contact"}
                      type="input"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.contact}
                      helperText={errors?.contact?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name={"birthday"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForBirthday}
                      {...inputPropsForBirthday}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"Birthday"}
                      type="date"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.birthday}
                      helperText={errors?.birthday?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name={"gender"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="standard"
                      inputRef={inputRefForGender}
                      {...inputPropsForGender}
                      {...field}
                      select
                      fullWidth
                      margin="dense"
                      label="Gender"
                      defaultValue=""
                      error={!!errors.gender}
                      helperText={errors?.gender?.message}
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card variant="outlined">
            <Divider>Account Information</Divider>
            <CardContent>
              <Grid item>
                <Controller
                  name={"username"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForUsername}
                      {...inputPropsForUsername}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"Username"}
                      type="input"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.username}
                      helperText={errors?.username?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name={"password"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForPassword}
                      {...inputPropsForPassword}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"Password"}
                      type="password"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.password}
                      helperText={errors?.password?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name={"confirm"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForConfirm}
                      {...inputPropsForConfirm}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"Confirm Password"}
                      type="password"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.confirm}
                      helperText={errors?.confirm?.message}
                    />
                  )}
                />
              </Grid>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ marginTop: "37px" }}>
            <Divider>Address Information</Divider>
            <CardContent>
              <Grid item>
                <Controller
                  name={"address"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForAddress}
                      {...inputPropsForAddress}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"Street Address"}
                      type="input"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.address}
                      helperText={errors?.address?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name={"city"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForCity}
                      {...inputPropsForCity}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"City"}
                      type="input"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.city}
                      helperText={errors?.city?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name={"country"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="standard"
                      inputRef={inputRefForCountry}
                      {...inputPropsForCountry}
                      {...field}
                      select
                      margin="dense"
                      fullWidth
                      label="Country"
                      defaultValue=""
                      error={!!errors.country}
                      helperText={errors?.country?.message}
                    >
                      {SelectCountries.map((option) => (
                        <MenuItem key={option.value} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name={"zipcode"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForZipCode}
                      {...inputPropsForZipCode}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"Zip Code"}
                      type="input"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.zipcode}
                      helperText={errors?.zipcode?.message}
                    />
                  )}
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateUser;
