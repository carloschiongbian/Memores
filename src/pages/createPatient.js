import "../public/css/pages/PatientRecord/patientRecord.css";
import { Controller } from "react-hook-form";
import SelectCountries from "../components/countriesSelect";
// const FILE_SIZE = 720 * 720;
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

const CreatePatient = ({ register, errors, control }) => {
  const { inputRefForFname, ...inputPropsForFname } = register("fname");
  const { inputRefForLname, ...inputPropsForLname } = register("lname");
  const { inputRefForEmail, ...inputPropsForEmail } = register("email");
  const { inputRefForPhone, ...inputPropsForPhone } = register("phone");
  const { inputRefForAge, ...inputPropsForAge } = register("phone");
  const { inputRefForBday, ...inputPropsForBday } = register("bday");
  const { inputRefForGender, ...inputPropsForGender } = register("gender");
  const { inputRefForStreet, ...inputPropsForStreet } = register("street");
  const { inputRefForCity, ...inputPropsForCity } = register("city");
  const { inputRefForCountry, ...inputPropsForCountry } = register("country");
  const { inputRefForZip, ...inputPropsForZip } = register("zip");

  const getAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString)
    let age = today.getMonth() - birthDate.getFullYear();
    var month = today.getMonth
  }

  return (
    <form>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Card variant="outlined">
            <Divider>Personal Information</Divider>
            <CardContent>
              <Grid item>
                <Controller
                  name={"fname"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForFname}
                      {...inputPropsForFname}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"First Name"}
                      type="input"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.fname}
                      helperText={errors?.fname?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name={"lname"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForLname}
                      {...inputPropsForLname}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"Last name"}
                      type="input"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.lname}
                      helperText={errors?.lname?.message}
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
                  name={"phone"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputPropsForPhone}
                      {...inputRefForPhone}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"Contact"}
                      type="input"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.phone}
                      helperText={errors?.phone?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name={"age"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForAge}
                      {...inputPropsForAge}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"Age"}
                      type="number"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.age}
                      helperText={errors?.age?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name={"bday"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForBday}
                      {...inputPropsForBday}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"Birthday"}
                      type="date"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.bday}
                      helperText={errors?.bday?.message}
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
            <Divider>Address Information</Divider>
            <CardContent>
              <Grid item>
                <Controller
                  name={"street"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForStreet}
                      {...inputPropsForStreet}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"Street Address"}
                      type="input"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.street}
                      helperText={errors?.street?.message}
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
                  name={"zip"}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      inputRef={inputRefForZip}
                      {...inputPropsForZip}
                      {...field}
                      autoFocus
                      margin="dense"
                      label={"Zip Code"}
                      type="input"
                      fullWidth
                      variant="standard"
                      autoComplete="off"
                      error={!!errors.zip}
                      helperText={errors?.zip?.message}
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
export default CreatePatient;
