import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Grid,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

const UserDialog = ({ openModal, handleClose, dialogData, title }) => {
  return (
    <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm">
      {dialogData && (
        <>
          <DialogTitle className="d-flex justify-content-center text-align-right">
            <Avatar src={"http://localhost:5000/" + dialogData.photo}></Avatar>
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Typography sx={{ fontWeight: "bold" }}>User name:</Typography>
                <Typography>{dialogData.uname} </Typography>
              </Grid>
              <Grid item xs={6}>
                {title === "Updated User List" && (
                  <>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Updated at:
                    </Typography>
                    <Typography>
                      {dayjs(dialogData.updated_at).format(
                        "MMM-DD-YYYY, hh:mm:ss a"
                      )}
                    </Typography>
                  </>
                )}
                {title === "User List" && (
                  <>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Created at:
                    </Typography>
                    <Typography>
                      {dayjs(dialogData.created_at).format(
                        "MMM-DD-YYYY, hh:mm:ss a"
                      )}
                    </Typography>
                  </>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontWeight: "bold" }}>First name:</Typography>
                <Typography>{dialogData.fname} </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontWeight: "bold" }}>Last name: </Typography>
                <Typography>{dialogData.lname} </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontWeight: "bold" }}>Email: </Typography>
                <Typography>{dialogData.email} </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontWeight: "bold" }}>Role: </Typography>
                <Typography>{dialogData.role} </Typography>
              </Grid>
            </Grid>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default UserDialog;
