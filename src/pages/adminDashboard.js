import Layout from "../components/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  Grid,
  Typography,
} from "@mui/material";
import "../public/css/pages/AdminDashboard/adminDashboard.css";
import PeopleIcon from "@mui/icons-material/People";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import UpdateIcon from "@mui/icons-material/Update";
import Api from "../services/api";
import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import UserDialog from "../components/modal/UserDialog";
import BlockIcon from "@mui/icons-material/Block";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || "";

const AdminDashboard = () => {
  const [data, setData] = useState({});
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("User List");
  const [dialogData, setDialogData] = useState({});
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  console.log(dialogData);

  const getAllUsers = async () => {
    try {
      const response = await Api().get("/get-general-users");
      if (response.status === 200) {
        setList(response.data);
        setTitle("User List");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getDeletedUsers = async () => {
    try {
      const response = await Api().get("/get-deleted-users");
      if (response.status === 200) {
        setList(response.data);
        setTitle("Deleted User List");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUpdatedUsers = async () => {
    try {
      const response = await Api().get("/get-updated-users");
      console.log(response.data);
      if (response.status === 200) {
        setList(response.data);
        setTitle("Updated User List");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getDistinctRoles = async () => {
    try {
      const response = await Api().get("/get-distinct-roles");
      if (response.status === 200) {
        setList(response.data.roles);
        setTitle("Role List");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getDashboardData = async () => {
    try {
      const response = await Api().get("/get-dashboard-data");
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout>
      <div className="d-flex justify-content-end w-100 mt-5">{title}</div>
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={8}>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item xs={6}>
              <Card className="h-100">
                <CardActionArea className="h-100" onClick={() => getAllUsers()}>
                  <CardHeader
                    avatar={<PeopleIcon />}
                    title="User"
                    subheader="General User"
                  />
                  <CardContent className="d-flex justify-content-end  w-100 h-75">
                    <Typography variant="h1" className="d-flex align-items-end">
                      {data.totalUsers}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className="h-100">
                <CardActionArea
                  className="h-100"
                  onClick={() => getDistinctRoles()}
                >
                  <CardHeader
                    avatar={<Diversity3Icon />}
                    title="Roles"
                    subheader="System Roles"
                  />
                  <CardContent className="d-flex justify-content-end  w-100 h-75">
                    <Typography variant="h1" className="d-flex align-items-end">
                      {data.distinctRoles}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className="h-100">
                <CardActionArea
                  className="h-100"
                  onClick={() => getDeletedUsers()}
                >
                  <CardHeader
                    avatar={<PersonRemoveIcon />}
                    title="Deleted User"
                    subheader="General User"
                  />
                  <CardContent className="d-flex justify-content-end  w-100 h-75">
                    <Typography variant="h1" className="d-flex align-items-end">
                      {data.deletedUsers}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className="h-100">
                <CardActionArea
                  className="h-100"
                  onClick={() => getUpdatedUsers()}
                >
                  <CardHeader
                    avatar={<UpdateIcon />}
                    title="Updated User"
                    subheader="General User"
                  />
                  <CardContent className="d-flex justify-content-end  w-100 h-75">
                    <Typography variant="h1" className="d-flex align-items-end">
                      {data.updatedUsers}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <List
            sx={{
              marginTop: 0,
              overflow: "auto",
              maxHeight: 450,
            }}
            disablePadding
          >
            {list &&
              list.map((d, i) => {
                return title !== "Role List" ? (
                  <ListItem
                    sx={{ width: "100%", bgcolor: "background.paper" }}
                    key={i}
                  >
                    <ListItemButton
                      onClick={() => {
                        setDialogData(d);
                        setIsUserDialogOpen(true);
                      }}
                    >
                      <ListItemAvatar>
                        {title === "Deleted User List" && <BlockIcon />}
                        {d.photo && (
                          <Avatar src={"data:image/png;base64," + d.photo} />
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        primary={d.uname}
                        secondary={`${d.fname} ${d.lname}`}
                      />
                    </ListItemButton>
                  </ListItem>
                ) : (
                  <ListItem
                    sx={{ width: "100%", bgcolor: "background.paper" }}
                    key={i}
                  >
                    <ListItemAvatar>
                      {d === "user" && <AccountBoxIcon />}
                      {d === "admin" && <AdminPanelSettingsIcon />}
                    </ListItemAvatar>
                    <ListItemText primary={capitalize(d)} />
                  </ListItem>
                );
              })}
            {list.length === 0 && <Item>No Data</Item>}
          </List>
        </Grid>
      </Grid>
      <UserDialog
        openModal={isUserDialogOpen}
        handleClose={() => setIsUserDialogOpen(false)}
        dialogData={dialogData}
      />
    </Layout>
  );
};

export default AdminDashboard;
