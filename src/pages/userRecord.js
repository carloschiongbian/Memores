import "../public/css/pages/PatientRecord/patientRecord.css";
import DataTable from "../components/DataTable";
import Layout from "../components/Layout";
import { useState, useEffect, useMemo } from "react";
import Api from "../services/api";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, TextField, Snackbar, Alert } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CommonModal from "../components/modal/CommonModal";
import CreateUser from "./createUser";

const schema = yup.object({
  id: yup.number().required(),
  uname: yup.string().required(),
  npwd: yup.string(),
  cnpwd: yup.string().oneOf([yup.ref("npwd")], "Passwords do not match"),
});

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const createUserSchemaValidation = yup
  .object({
    profile: yup
      .mixed()
      .test("required", "Profile photo is required", (file) =>
        file.length ? true : false
      )
      .test("fileSize", "The file is too large", (file) => {
        if (file.length) {
          return file[0].size > 2000000 ? false : true;
        }
      })
      .test("fileFormat", "Unsupported Format", (file) => {
        if (file.length) {
          return SUPPORTED_FORMATS.includes(file[0].type);
        }
      })
      .nullable(),
    img: yup
      .mixed()
      .test("required", "License photo is required", (file) =>
        file.length ? true : false
      )
      .test("fileSize", "The file is too large", (file) => {
        if (file.length) {
          return file[0].size > 2000000 ? false : true;
        }
      })
      .test("fileFormat", "Unsupported Format", (file) => {
        if (file.length) {
          return SUPPORTED_FORMATS.includes(file[0].type);
        }
      })
      .nullable(),
    license: yup.string().required(),
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
        message: "number, dash and spaces only",
        excludeEmptyString: true,
      })
      .required(),
    birthday: yup.date().required(),
    gender: yup
      .object()
      .shape({
        label: yup.string().required("gender is required"),
        value: yup.string().required("gender is required"),
      })
      .nullable()
      .required("gender is required"),
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
        label: yup.string().required("country is required"),
        value: yup.string().required("country is required"),
      })
      .nullable()
      .required("country is required"),
    zipcode: yup.string().required(),
  })
  .required();

const UserRecord = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userDataForEdit, setUserDataForEdit] = useState({
    id: "",
    uname: "",
    npwd: "",
    cnpwd: "",
  });
  const [responseMessage, setResponseMessage] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "left",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState("");
  const { open } = openSnackbar;
  const handleCloseSnackbar = () => {
    setOpenSnackbar({ ...openSnackbar, open: false });
  };

  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    control: controlForm1,
    reset: resetForm1,
    formState: { errors: errorsForm1 },
  } = useForm({
    resolver: yupResolver(createUserSchemaValidation),
    defaultValues: {
      profile: "",
      img: "",
      license: "",
      firstname: "",
      lastname: "",
      email: "",
      contact: "",
      birthday: "",
      gender: "",
      username: "",
      password: "",
      confirm: "",
      address: "",
      city: "",
      country: "",
      zipcode: "",
    },
  });

  const onSubmitCreateUser = async (data) => {
    console.log(data);
    // let formData = new FormData();
    // formData.append("img", data.img[0]);
    // formData.append("profile", data.profile[0]);

    // for (let key in data) {
    //   if (key === "gender") {
    //     formData.append(key, data[key].label);
    //   } else if (key === "country") {
    //     formData.append(key, data[key].label);
    //   } else if (key === "birthday") {
    //     const formatted_date = dayjs(data[key]).format("YYYY-MM-DD")
    //     formData.append(key, formatted_date);
    //   } else {
    //     formData.append(key, data[key]);
    //   }

    // }

    // try {
    //   const response = await fetch("/api/add-user", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   const data = await response.json()

    //   if (response.ok) {
    //     alert(`Success: ${response.status}, ${data.success}`);
    //   }

    //   if (response.status === 409 || response.status === 400) {
    //     alert(`Error: ${response.status}, ${data.error}`)
    //   }

    // } catch (error) {
    //   alert(error)
    // }
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: userDataForEdit,
  });
  const { inputRefForId, ...inputPropsForId } = register("id");
  const { inputRefForUserName, ...inputPropsForUserName } = register("uname");
  const { inputRefForPassword, ...inputPropsForPassword } = register("npwd");
  const { inputRefForConfirm, ...inputPropsForConFirm } = register("cnpwd");

  const handleClickOpen = (id) => {
    getUserAccountById(id);
    setTimeout(() => {
      setIsEditModalOpen(true);
    }, 500);
  };

  const handleClose = () => {
    setIsEditModalOpen(false);
  };

  const handleClickOpenDeleteModal = (id) => {
    setUserToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const getUserAccountById = async (id) => {
    const emptyField = { npwd: "", cnpwd: "" };
    const response = await Api().get("/get-user-account", {
      params: { id: id },
    });
    setUserDataForEdit({ ...response.data[0], ...emptyField });
    reset({ ...response.data[0], ...emptyField });
  };

  const deleteUserById = async (id) => {
    try {
      const response = await Api().put("/delete-user", { id: id });
      if (response.status === 200) {
        setData(data.filter((data) => data.id !== id));
        setIsDeleteModalOpen(false);
        setResponseMessage({
          status: "success",
          message: response.data.success,
        });
        setOpenSnackbar({ open: true });
      }
    } catch (err) {
      setResponseMessage({
        status: "error",
        message: "Something went wrong, try again!",
      });
      setIsDeleteModalOpen(false);
      setOpenSnackbar({ open: true });
    }
  };

  const getUserData = async () => {
    const response = await Api().get("/get-users");
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getUserData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "uname",
        header: "Username",
      },
      {
        accessorKey: "fname",
        header: "First name",
      },
      {
        accessorKey: "lname",
        header: "Last name",
      },
      {
        accessorKey: "role",
        header: "Role",
        Cell: ({ cell }) => {
          return <span className="badge bg-primary">{cell.getValue()}</span>;
        },
      },
      {
        accessorKey: "email",
        header: "Email Address",
      },
      {
        accessorKey: "created_at",
        header: "Created on",
        Cell: ({ cell }) => {
          return (
            <span className="badge bg-success">
              {dayjs(cell.getValue()).format("MMM DD,YYYY")}
            </span>
          );
        },
      },
      {
        accessorKey: "id",
        header: "Options",
        enableColumnActions: false,
        Cell: ({ cell }) => {
          return (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <IconButton onClick={() => handleClickOpen(cell.getValue())}>
                <EditIcon color="warning" />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleClickOpenDeleteModal(cell.getValue());
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          );
        },
      },
    ],
    []
  );

  const onSubmitEditUser = async (data) => {
    try {
      const response = await Api().put("/update-user", data);
      console.log(response.data[0]);
      if (response.status === 200) {
        reset();
        // setData(data.map(d =>d.id !== response.data[0].id ? d: response.data[0]))
        handleClose();
        setResponseMessage({
          status: "success",
          message: "Updated Successfully",
        });
        setOpenSnackbar({ open: true });
      }
    } catch (err) {
      setResponseMessage({
        status: "error",
        message: "Something went wrong, try again!",
      });
      setOpenSnackbar({ open: true });
    }
  };

  return (
    <Layout>
      <div>
        <div className="d-flex align-items-center justify-content-end mb-2 mt-5">
          <button
            className="btn btn-success"
            onClick={() => setIsCreateModalOpen(true)}
          >
            + New User
          </button>
        </div>
        <DataTable data={data} columns={columns} loading={loading} />
        <CommonModal
          openModal={isEditModalOpen}
          textAlign={"center"}
          dialogTitle={"Update Account"}
          handleClose={() => setIsEditModalOpen(false)}
          handleSubmit={handleSubmit(onSubmitEditUser)}
        >
          <form>
            <Controller
              name={"id"}
              control={control}
              render={({ field }) => (
                <TextField
                  hidden
                  inputRef={inputRefForId}
                  {...inputPropsForId}
                  {...field}
                  autoFocus
                  margin="dense"
                  label={"Id"}
                  type="number"
                  fullWidth
                  variant="standard"
                  autoComplete="off"
                  error={!!errors.id}
                  helperText={errors?.id?.message}
                />
              )}
            />
            <Controller
              name={"uname"}
              control={control}
              render={({ field }) => (
                <TextField
                  inputRef={inputRefForUserName}
                  {...inputPropsForUserName}
                  {...field}
                  autoFocus
                  margin="dense"
                  label={"Username"}
                  type="input"
                  fullWidth
                  variant="standard"
                  autoComplete="off"
                  error={!!errors.uname}
                  helperText={errors?.uname?.message}
                />
              )}
            />
            <Controller
              name={"npwd"}
              control={control}
              render={({ field }) => (
                <TextField
                  inputRef={inputRefForPassword}
                  {...inputPropsForPassword}
                  {...field}
                  autoFocus
                  margin="dense"
                  label={"New Password"}
                  type="password"
                  fullWidth
                  variant="standard"
                  error={!!errors.npwd}
                  helperText={errors?.npwd?.message}
                  autoComplete="new-password"
                  inputProps={{
                    autoComplete: `${dayjs().toISOString}`,
                  }}
                />
              )}
            />
            <Controller
              name={"cnpwd"}
              control={control}
              render={({ field }) => (
                <TextField
                  inputRef={inputRefForConfirm}
                  {...inputPropsForConFirm}
                  {...field}
                  autoFocus
                  margin="dense"
                  label={"Confirm New Password"}
                  type="password"
                  fullWidth
                  variant="standard"
                  error={!!errors.cnpwd}
                  helperText={errors?.cnpwd?.message}
                  autoComplete="new-password"
                  inputProps={{
                    autoComplete: `${dayjs().toISOString}`,
                  }}
                />
              )}
            />
          </form>
        </CommonModal>
        <CommonModal
          dialogTitle={"Are you sure to delete this user?"}
          ariaLabel={"alert-dialog-title"}
          openModal={isDeleteModalOpen}
          handleSubmit={() => deleteUserById(userToDelete)}
          handleClose={() => setIsDeleteModalOpen(false)}
        />
        <CommonModal
          width={"lg"}
          dialogTitle={"Create New User"}
          openModal={isCreateModalOpen}
          textAlign={"center"}
          handleClose={() => setIsCreateModalOpen(false)}
          handleSubmit={handleSubmitForm1(onSubmitCreateUser)}
          btnPrimaryTxt={"Create"}
        >
          <CreateUser
            register={registerForm1}
            errors={errorsForm1}
            control={controlForm1}
          />
        </CommonModal>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={responseMessage.status}
            sx={{ width: "100%" }}
          >
            {responseMessage.message}
          </Alert>
        </Snackbar>
      </div>
    </Layout>
  );
};

export default UserRecord;
