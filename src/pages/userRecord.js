import "../public/css/pages/PatientRecord/patientRecord.css";
import DataTable from "../components/dataTable";
import Layout from "../components/Layout";
import { useState, useEffect, useMemo } from "react";

import Api from "../services/api";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  IconButton,
  TextField,
  Snackbar,
  Alert,
  Dialog,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CommonModal from "../components/modal/CommonModal";
import CreateUser from "./createUser";
import UserPage from "./userPage";
import {
  createUserSchemaValidation,
  updateAccountSchemaValidation,
  updateClinicianSchemaValidation,
} from "../validation/manageValidation";

// const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const UserRecord = () => {
  const [data, setData] = useState([]);
  const [imagePreview, setImagePreview] = useState({});
  const [loading, setLoading] = useState(false);
  const [userDataForEdit, setUserDataForEdit] = useState({
    id: "",
    uname: "",
    npwd: "",
    cnpwd: "",
  });
  const [userDataForView, setUserDataForView] = useState({
    id: "",
    profile: "",
    img: "",
    license: "",
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    birthday: "",
    gender: "",
    address: "",
    city: "",
    country: "",
    zipcode: "",
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
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState("");
  const { open } = openSnackbar;
  const handleCloseSnackbar = () => {
    setOpenSnackbar({ ...openSnackbar, open: false });
  };
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    control: controlForm1,
    reset: resetForm1,
    setValue: setValueForm1,
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

  const {
    register: registerForm2,
    handleSubmit: handleSubmitForm2,
    reset: resetForm2,
    formState: { errors: errorsForm2 },
  } = useForm({
    resolver: yupResolver(updateClinicianSchemaValidation),
    defaultValues: userDataForView,
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateAccountSchemaValidation),
    defaultValues: userDataForEdit,
  });
  const { inputRefForId, ...inputPropsForId } = register("id");
  const { inputRefForUserName, ...inputPropsForUserName } = register("uname");
  const { inputRefForPassword, ...inputPropsForPassword } = register("npwd");
  const { inputRefForConfirm, ...inputPropsForConFirm } = register("cnpwd");

  const onSubmitUpdateUser = async (data) => {
    if (data.img[0] instanceof File && data.profile[0] instanceof File) {
      console.log("Upload both!");
      let formData = new FormData();
      formData.append("profile", data.profile[0]);
      formData.append("img", data.img[0]);
      for (let key in data) {
        if (key === "birthday") {
          const formatted_date = dayjs(data[key]).format("YYYY-MM-DD");
          formData.append(key, formatted_date);
        } else {
          formData.append(key, data[key]);
        }
      }
      try {
        const response = await Api().put("/update-both-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);

        if (response.ok || response.status === 200) {
          setData(response.data);
          setIsViewModalOpen(false);
          setResponseMessage({
            status: "success",
            message: "Updated Successfully",
          });
          setOpenSnackbar({ open: true });
        }
      } catch (error) {
        setAlertMessage(error.response.data.error);
        setIsAlertOpen(true);
        setTimeout(() => {
          setIsAlertOpen(false);
        }, 2000);
      }
    } else if (data.img[0] instanceof File) {
      console.log("update with image here");
      let formData = new FormData();
      formData.append("img", data.img[0]);
      for (let key in data) {
        if (key === "birthday") {
          const formatted_date = dayjs(data[key]).format("YYYY-MM-DD");
          formData.append(key, formatted_date);
        } else {
          formData.append(key, data[key]);
        }
      }
      try {
        const response = await Api().put("/update-user-and-license", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);

        if (response.ok || response.status === 200) {
          setData(response.data);
          setIsViewModalOpen(false);
          setResponseMessage({
            status: "success",
            message: "Updated Successfully",
          });
          setOpenSnackbar({ open: true });
        }
      } catch (error) {
        setAlertMessage(error.response.data.error);
        setIsAlertOpen(true);
        setTimeout(() => {
          setIsAlertOpen(false);
        }, 2000);
      }
    } else if (data.profile[0] instanceof File) {
      console.log("upload new profile file here");
      let formData = new FormData();
      formData.append("profile", data.profile[0]);
      for (let key in data) {
        if (key === "birthday") {
          const formatted_date = dayjs(data[key]).format("YYYY-MM-DD");
          formData.append(key, formatted_date);
        } else {
          formData.append(key, data[key]);
        }
      }

      try {
        const response = await Api().put("/update-user-and-photo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);

        if (response.ok || response.status === 200) {
          setData(response.data);
          setIsViewModalOpen(false);
          setResponseMessage({
            status: "success",
            message: "Updated Successfully",
          });
          setOpenSnackbar({ open: true });
        }
      } catch (error) {
        setAlertMessage(error.response.data.error);
        setIsAlertOpen(true);
        setTimeout(() => {
          setIsAlertOpen(false);
        }, 2000);
      }
    } else {
      console.log("update bt no new image");
      try {
        const response = await Api().put("/update-user-only", data);
        console.log(response);

        if (response.ok || response.status === 200) {
          setData(response.data);
          setIsViewModalOpen(false);
          setResponseMessage({
            status: "success",
            message: "Updated Successfully",
          });
          setOpenSnackbar({ open: true });
        }
      } catch (error) {
        setAlertMessage(error.response.data.error);
        setIsAlertOpen(true);
        setTimeout(() => {
          setIsAlertOpen(false);
        }, 2000);
      }
    }
  };

  const onSubmitCreateUser = async (data) => {
    let formData = new FormData();
    formData.append("img", data.img[0]);
    formData.append("profile", data.profile[0]);

    for (let key in data) {
      if (key === "birthday") {
        const formatted_date = dayjs(data[key]).format("YYYY-MM-DD");
        formData.append(key, formatted_date);
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      const response = await Api().post("/add-user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok || response.status === 200) {
        resetForm1();
        setData(response.data);
        setIsCreateModalOpen(false);
        setResponseMessage({
          status: "success",
          message: "Created Successfully",
        });
        setOpenSnackbar({ open: true });
      }
    } catch (error) {
      setAlertMessage(error.response.data.error);
      setIsAlertOpen(true);
      setTimeout(() => {
        setIsAlertOpen(false);
      }, 2000);
    }
  };
  const getUserAccountForView = async (id) => {
    const response = await Api().get("/get-user-view", {
      params: { id: id },
    });
    setUserDataForView(response.data);
    // const url = URL.createObjectURL(response.data.img);
    // console.log(dayjs(response.data.birthday).toISOString());
    setImagePreview({ profile: response.data.profile, img: response.data.img });
    resetForm2({
      ...response.data,
      birthday: dayjs(response.data.birthday).format("YYYY-MM-DD"),
    });
  };

  const handleOpenViewModal = (id) => {
    getUserAccountForView(id);
    setIsViewModalOpen(true);
  };

  const handleClickOpen = (id) => {
    getUserAccountById(id);
    setIsEditModalOpen(true);
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
    } catch (error) {
      setAlertMessage(error.response.data.error);
      setIsAlertOpen(true);
      setTimeout(() => {
        setIsAlertOpen(false);
      }, 2000);
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
              <IconButton onClick={() => handleOpenViewModal(cell.getValue())}>
                <VisibilityIcon color="primary" />
              </IconButton>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onSubmitEditUser = async (data) => {
    try {
      const response = await Api().put("/update-user", data);
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
    } catch (error) {
      setAlertMessage(error.response.data.error);
      setIsAlertOpen(true);
      setTimeout(() => {
        setIsAlertOpen(false);
      }, 2000);
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
          btnPrimaryTxt={"Update"}
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
          btnPrimaryTxt={"Confirm"}
        />
        <CommonModal
          width={"lg"}
          dialogTitle={"Create New User"}
          openModal={isCreateModalOpen}
          textAlign={"center"}
          handleClose={() => {
            setIsCreateModalOpen(false);
            resetForm1();
          }}
          handleSubmit={handleSubmitForm1(onSubmitCreateUser)}
          btnPrimaryTxt={"Create"}
        >
          <CreateUser
            register={registerForm1}
            errors={errorsForm1}
            control={controlForm1}
            setValueForm1={setValueForm1}
          />
        </CommonModal>
        <CommonModal
          width={"lg"}
          dialogTitle={"User Details"}
          openModal={isViewModalOpen}
          textAlign={"center"}
          handleClose={() => {
            setImagePreview("");
            setIsViewModalOpen(false);
          }}
          // handleSubmit={setIsViewModalOpen}
          btnPrimaryTxt={"Update"}
        >
          <UserPage
            register={registerForm2}
            reset={() => resetForm2(userDataForView)}
            errors={errorsForm2}
            handleSubmit={handleSubmitForm2(onSubmitUpdateUser)}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
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
        <Dialog
          open={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          sx={{
            "& .MuiDialog-container": {
              justifyContent: "center",
              alignItems: "flex-start",
            },
          }}
          PaperProps={{
            sx: {
              verticalAlign: "top",
            },
          }}
        >
          <Alert severity="error"> {alertMessage}</Alert>
        </Dialog>
      </div>
    </Layout>
  );
};

export default UserRecord;
