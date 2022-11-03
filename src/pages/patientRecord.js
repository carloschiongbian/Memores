/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "../components/Layout";
import "../public/css/pages/PatientRecord/patientRecord.scss";
import "../public/css/components/PatientManagementModal/Modal.scss";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import MaterialReactTable from "material-react-table";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import Api from "../services/api";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, IconButton, TextField, Snackbar, Alert } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import CommonModal from "../components/modal/CommonModal";
import CreatePatient from "./createPatient";
import {
  createPatientSchemaValidation,
  updateAccountSchemaValidation,
  updateClinicianSchemaValidation,
} from "../validation/manageValidation";


const recordActions = {
  EDIT: "EDIT",
  DELETE: "DELETE",
};

const PatientRecord = () => {
  const navigate = useNavigate();
  const [getRecord, setGetRecord] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [patientRecords, setPatientRecords] = useState([]);
  const [userDataForEdit, setUserDataForEdit] = useState({
    id: "",
    uname: "",
    npwd: "",
    cnpwd: "",
  });
  const [userDataForView, setUserDataForView] = useState({
    id: "",
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
  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    control: controlForm1,
    reset: resetForm1,
    setValue: setValueForm1,
    formState: { errors: errorsForm1 },
  } = useForm({
    resolver: yupResolver(createPatientSchemaValidation),
    defaultValues: {
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
    control: controlForm2,
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
    console.log(data);
    console.log(data.profile[0] instanceof File);
    console.log(data.img[0] instanceof File);
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
        setResponseMessage({
          status: "error",
          message: "Something went wrong, try again!",
        });
        setOpenSnackbar({ open: true });
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
        setResponseMessage({
          status: "error",
          message: "Something went wrong, try again!",
        });
        setOpenSnackbar({ open: true });
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
        setResponseMessage({
          status: "error",
          message: "Something went wrong, try again!",
        });
        setOpenSnackbar({ open: true });
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
        setResponseMessage({
          status: "error",
          message: "Something went wrong, try again!",
        });
        setOpenSnackbar({ open: true });
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
        setData(response.data);
        setIsCreateModalOpen(false);
        setResponseMessage({
          status: "success",
          message: "Created Successfully",
        });
        setOpenSnackbar({ open: true });
      }
    } catch (error) {
      setResponseMessage({
        status: "error",
        message: "Something went wrong, try again!",
      });
      setOpenSnackbar({ open: true });
    }
  };
  const getUserAccountForView = async (id) => {
    const response = await Api().get("/get-user-view", {
      params: { id: id },
    });
    setUserDataForView(response.data);
    setIsLoaded(true);
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
    setIsLoaded(false);
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
    setIsLoaded(true);
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

  const columns = [
    { accessorKey: "id", header: "Patient ID" },
    {
      accessorKey: "firstName",
      header: "First name",
    },
    {
      accessorKey: "lastName",
      header: "Last name",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "is_screened",
      header: "Screened",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      enableSorting: false,
      enableColumnFilter: false,
      enableColumnActions: false,
      Cell: (cell) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4rem",
            }}
          >
            <FindInPageIcon
              style={{ color: "#8860D0", cursor: "pointer" }}
              onClick={() => handleRecordAction(cell.row, recordActions.EDIT)}
            />
            <DeleteIcon
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleRecordAction(cell.row, recordActions.DELETE)}
            />
          </Box>
        );
      },
    },
  ];

  const updatePatientRecords = (data) => {
    data.patients.forEach((patient) => {
      let patientRecord = {
        id: patient.id,
        firstName: patient.fname,
        lastName: patient.lname,
        age: patient.age,
        is_screened: (data.assessment.find(assessment => assessment.patient_id === patient.id)) ? 'Yes' : 'No',
        action: DeleteIcon,
      };

      setPatientRecords((patientRecords) => [...patientRecords, patientRecord]);
    });
  };

  const retrieveRecords = () => {
    fetch("/patient-records", {
      methods: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => updatePatientRecords(response))
      .catch((error) => console.log(error));
  };

  const handleRecordAction = (data, action) => {
    switch (action) {
      case recordActions.EDIT:
        navigate("/patient-details/id=" + parseInt(data.original.id));
        break;

      case recordActions.DELETE:
        setOpenModal(true);
        setGetRecord(data);
        break;

      default:
        break;
    }
  };

  const handleDelete = () => {
    fetch("/patient-records/delete/id=" + parseInt(getRecord.original.id), {
      method: "DELETE",
    });

    const newArr = patientRecords.filter(
      (record) => record.id !== getRecord.original.id
    );

    setPatientRecords(newArr);
    setOpenModal(false);
  };

  useEffect(() => {
    retrieveRecords();
  }, []);

  return (
    <Layout>
      <div className="patient-records-container">
        <div className="data-table-container">
          <div className="data-table">
            <MaterialReactTable
              columns={columns}
              data={patientRecords}
              enableDensityToggle={false}
              renderTopToolbarCustomActions={() => (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate("/createPatient")}
                >
                  Create New Patient
                </Button>
              )}
            />

            <Modal
              open={openModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="modal-container-delete-modal">
                <div className="modal-header-delete-modal">
                  <h3>Delete Record</h3>
                </div>

                <div className="modal-content-delete-modal">
                  <h4>
                    Once you delete this record, it cannot be recovered. Would
                    you like to proceed?
                  </h4>
                </div>

                <div className="modal-actions">
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="large"
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      handleDelete();
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientRecord;
