import axios from "axios";
import { useState, useEffect } from "react";
import React, { Component } from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { red } from '@mui/material/colors';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = (props) => {
  const [users, setUsers] = useState([]);
  var a = sessionStorage.getItem("Vendoremail");
  const newUser = {
    email: a
  };

  useEffect(() => {
    axios
      .post("http://localhost:4000/user/findvendor", newUser)
      .then((response) => {
        const b = response.data;
        setUsers(b);
      })
      .catch((error) => {
        console.log(error);
      });

  });

  var foo = Object(users);

  var [name, setName] = useState("");
  name = foo.name;
  const [email, setEmail] = useState("");
  var [password, setPassword] = React.useState("");
  password = foo.password;
  const [pwdvisibility, setPwdvisibility] = useState(false);
  var [shopname, setShopname] = useState("");
  shopname = foo.shopname;
  var [opentime, setTimeopen] = useState();
  var [endtime, setTimeend] = useState();
  var [contactnum, setContact] = useState("");
  contactnum = foo.contactnum;
  var dateopen = new Date(foo.opentime);
  opentime = ("" + foo.opentime).substr(11, 5);
  endtime = ("" + foo.endtime).substr(11, 5);
  const [selected, setSelected] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [newname, setNewName] = useState("");
  const [newcontact, setNewContact] = useState("");
  const [newshopname, setNewShopname] = useState("");
  const [enterpwd, setEnterpwd] = useState("");
  const [snackval, setSnack] = useState(false);
  const [snackerrval, seterrSnack] = useState(false);
  const [shopnameopen, setshopnameOpen] = React.useState(false);
  const [contactopen, setcontactOpen] = React.useState(false);
  const [opentimeopen, setopentimeOpen] = React.useState(false);
  const [endtimeopen, setendtimeOpen] = React.useState(false);
  const [newopentime, setNewOpentime] = useState();
  const [newendtime, setNewEndtime] = useState();

  const handleshopnameOpen = () => {
    setshopnameOpen(true);
  };

  const handleopentimeOpen = () => {
    setopentimeOpen(true);
  };
  const handleendtimeOpen = () => {
    setendtimeOpen(true);
  };

  const handlecontactOpen = () => {
    setcontactOpen(true);
  };


  const handleOpen = () => {
    setOpen(true);
  };

  const snackClick = () => {
    setSnack(true);
  };

  const snackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnack(false);
  };

  const snackerrClick = () => {
    seterrSnack(true);
  };

  const snackerrClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    seterrSnack(false);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleshopnameClose = () => {
    setshopnameOpen(false);
  };

  const handlecontactClose = () => {
    setcontactOpen(false);
  };

  const handleopentimeClose = () => {
    setopentimeOpen(false);
  };

  const handleendtimeClose = () => {
    setendtimeOpen(false);
  };

  const onChangeNewName = (event) => {
    setNewName(event.target.value);
  };

  const onChangeNewContact = (event) => {
    setNewContact(event.target.value);
  };

  const onChangeNewShopname = (event) => {
    setNewShopname(event.target.value);
  };

  const onChangeNewOpentime = (event) => {
    setNewOpentime(event.target.value);
  };

  const onChangeNewEndtime = (event) => {
    setNewEndtime(event.target.value);
  };

  const onChangeEnterpwd = (event) => {
    setEnterpwd(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChange = (event) => {
    setPassword(event.target.value);
  }

  const handleClickShowPassword = () => {
    setPwdvisibility(!pwdvisibility);
  };

  const onChangeShopname = (event) => {
    setShopname(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangeOpentime = (event) => {
    setTimeopen(event.target.value);
  };

  const onChangeEndtime = (event) => {
    setTimeend(event.target.value);
  };


  const btnSetNewName = (event) => {
    const newUserName = {
      email: a,
      name: newname
    };

    axios
      .post("http://localhost:4000/user/updatevendorname", newUserName)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const btnSetNewShopname = (event) => {
    const newUserShopname = {
      email: a,
      shopname: newshopname
    };

    axios
      .post("http://localhost:4000/user/updatevendorshopname", newUserShopname)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const btnSetNewContact = (event) => {
    const newUserContact = {
      email: a,
      contactnum: newcontact
    };

    axios
      .post("http://localhost:4000/user/updatevendorcontact", newUserContact)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const btnSetNewOpentime = (event) => {
   
    const setopentime =  new Date(Date.UTC(0,0,0,Number(newopentime.substr(0, 2)), Number(newopentime.substr(3, 5)),0,0));
    const oldendtime = new Date(Date.UTC(0,0,0,Number(endtime.substr(0, 2)), Number(endtime.substr(3, 5)),0,0));

    if(setopentime >= oldendtime){
      setNewOpentime("");
      setEnterpwd("");
      snackerrClick();
      return;
    }
    console.log(setopentime);

    const newUserOpentime = {
      email: a,
      opentime: setopentime
    };

    axios
      .post("http://localhost:4000/user/updatevendoropentime", newUserOpentime)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

      handleopentimeClose();
      snackClick();
    
    
  };

  const btnSetNewEndtime = (event) => {

    const setendtime =  new Date(Date.UTC(0,0,0,Number(newendtime.substr(0, 2)), Number(newendtime.substr(3, 5)),0,0));
    const oldstarttime = new Date(Date.UTC(0,0,0,Number(opentime.substr(0, 2)), Number(opentime.substr(3, 5)),0,0));
    if(setendtime <= oldstarttime){
      setNewEndtime("");
      setEnterpwd("");
      snackerrClick();
      return;
    }

    const newUserEndtime = {
      email: a,
      endtime: setendtime
    };

    axios
      .post("http://localhost:4000/user/updatevendorendtime", newUserEndtime)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

      handleendtimeClose();
      snackClick();
  };

  return (

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

        <Grid item xs={0} md={3}>
        </Grid>

        <Snackbar open={snackval} autoHideDuration={2000} onClose={snackClose}>
          <Alert onClose={snackClose} severity="success" sx={{ width: "100%" }}>
            Changes Applied
          </Alert>
        </Snackbar>

        <Snackbar open={snackerrval} autoHideDuration={2000} onClose={snackerrClose}>
          <Alert onClose={snackerrClose} severity="error" sx={{ width: "100%" }}>
            Wrong Details
          </Alert>
        </Snackbar>

        <Grid container item xs={12} md={7} spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h5" component="div" gutterBottom padding={2}>
              Name
            </Typography>
          </Grid>
          <Grid container item xs={8} spacing={2}>
            <Grid item>
              <TextField
                disabled={true}
                label="Name"
                variant="outlined"
                value={name}
                onChange={onChangeName}
              />
            </Grid>
            <Grid item marginTop={1}>
              <IconButton color={"primary"} onClick={handleOpen}>
                <EditIcon />
              </IconButton>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Set name</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="New Name"
                    fullWidth
                    variant="standard"
                    value={newname}
                    onChange={onChangeNewName}
                  />
                  <TextField
                    margin="dense"
                    label="Confirm Password"
                    fullWidth
                    variant="standard"
                    onChange={onChangeEnterpwd}
                    value={enterpwd}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {
                    handleClose();
                    setEnterpwd("");
                    setNewName("");
                  }}>Cancel</Button>
                  <Button onClick={() => {
                    if (password == enterpwd) {
                      btnSetNewName();
                      handleClose();
                      snackClick();
                    }
                    else {
                      setEnterpwd("");
                      snackerrClick();
                    }
                    setEnterpwd("");
                    setNewName("");
                  }}
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" component="div" gutterBottom padding={2}>
              Shopname
            </Typography>
          </Grid>
          <Grid item container xs={8} spacing={2}>
            <Grid item >
              <TextField
                disabled={true}
                label="Shop Name"
                variant="outlined"
                value={shopname}
                onChange={onChangeShopname}
              />
            </Grid>
            <Grid item marginTop={1}>
              <IconButton color={"primary"} onClick={handleshopnameOpen}>
                <EditIcon />
              </IconButton>
              <Dialog open={shopnameopen} onClose={handleshopnameClose}>
                <DialogTitle>Set Shopname</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="New Shopname"
                    fullWidth
                    variant="standard"
                    value={newshopname}
                    onChange={onChangeNewShopname}
                  />
                  <TextField
                    margin="dense"
                    label="Confirm Password"
                    fullWidth
                    variant="standard"
                    onChange={onChangeEnterpwd}
                    value={enterpwd}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {
                    handleshopnameClose();
                    setEnterpwd("");
                    setNewShopname("");
                  }}>Cancel</Button>
                  <Button onClick={() => {
                    if (password == enterpwd) {
                      btnSetNewShopname();
                      handleshopnameClose();
                      snackClick();
                    }
                    else {
                      setEnterpwd("");
                      snackerrClick();
                    }
                    setEnterpwd("");
                    setNewShopname("");
                  }}
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>

          </Grid>

          <Grid item xs={4}>
            <Typography variant="h5" component="div" gutterBottom padding={2}>
              Contactnum
            </Typography>
          </Grid>
          <Grid container item xs={8} spacing={2}>
            <Grid item>
              <TextField
                disabled={true}
                label="Contactnum"
                variant="outlined"
                value={contactnum}
                onChange={onChangeContact}
              />
            </Grid>
            <Grid item marginTop={1}>
              <IconButton color={"primary"} onClick={handlecontactOpen}>
                <EditIcon />
              </IconButton>
              <Dialog open={contactopen} onClose={handlecontactClose}>
                <DialogTitle>Set Contact Number</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="New Contactnum"
                    fullWidth
                    variant="standard"
                    value={newcontact}
                    onChange={onChangeNewContact}
                  />
                  <TextField
                    margin="dense"
                    label="Confirm Password"
                    fullWidth
                    variant="standard"
                    onChange={onChangeEnterpwd}
                    value={enterpwd}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {
                    handlecontactClose();
                    setEnterpwd("");
                    setNewContact("");

                  }}>Cancel</Button>
                  <Button onClick={() => {
                    if (password == enterpwd) {
                      btnSetNewContact();
                      handlecontactClose();
                      snackClick();
                    }
                    else {
                      setEnterpwd("");
                      snackerrClick();
                    }
                    setEnterpwd("");
                    setNewContact("");
                  }}
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>

          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" component="div" gutterBottom padding={2}>
              Start time
            </Typography>
          </Grid>
          <Grid container item xs={8} spacing={2}>
            <Grid item>
              <OutlinedInput
                disabled={true}
                value={opentime}
                onChange={onChangeOpentime}
                type={"time"}
              />
            </Grid>
            <Grid item marginTop={1}>
              <IconButton color={"primary"} onClick={handleopentimeOpen}>
                <EditIcon />
              </IconButton>
              <Dialog open={opentimeopen} onClose={handleopentimeClose}>
                <DialogTitle>Set Shop Open Time</DialogTitle>
                <DialogContent>


                  <TextField
                    autoFocus
                    margin="dense"
                    label="Hours"
                    variant="standard"
                    value={newopentime}
                    onChange={onChangeNewOpentime}
                    type={"time"}
                    fullWidth
                  />



                  <TextField
                    margin="dense"
                    label="Confirm Password"
                    fullWidth
                    variant="standard"
                    onChange={onChangeEnterpwd}
                    value={enterpwd}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {
                    handleopentimeClose();
                    setEnterpwd("");
                    setNewOpentime("");

                  }}>Cancel</Button>
                  <Button onClick={() => {
                    if (password == enterpwd) {
                      btnSetNewOpentime();
                    }
                    else {
                      setEnterpwd("");
                      snackerrClick();
                    }
                    setEnterpwd("");
                    setNewOpentime("");
                  }}
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>

          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" component="div" gutterBottom padding={2}>
              End time
            </Typography>
          </Grid>
          <Grid container item xs={8} spacing={2}>
            <Grid item>
              <OutlinedInput
                disabled={true}
                value={endtime}
                onChange={onChangeEndtime}
                type={"time"}
              />
            </Grid>
            <Grid item marginTop={1}>
              <IconButton color={"primary"} onClick={handleendtimeOpen}>
                <EditIcon />
              </IconButton>
              <Dialog open={endtimeopen} onClose={handleendtimeClose}>
                <DialogTitle>Set Shop End Time</DialogTitle>
                <DialogContent>
                  <Grid>

                    <TextField
                      autoFocus
                      margin="dense"
                      label="Hours"
                      variant="standard"
                      value={newendtime}
                      onChange={onChangeNewEndtime}
                      type={"time"}
                      fullWidth
                    />

                    <TextField
                      margin="dense"
                      label="Confirm Password"
                      fullWidth
                      variant="standard"
                      onChange={onChangeEnterpwd}
                      value={enterpwd}
                    />
                  </Grid>

                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {
                    handleendtimeClose();
                    setEnterpwd("");
                    setNewEndtime("");


                  }}>Cancel</Button>
                  <Button onClick={() => {
                    if (password == enterpwd) {
                      btnSetNewEndtime("");
                    }
                    else {
                      setEnterpwd("");
                      snackerrClick();
                    }
                    setEnterpwd("");
                    setNewEndtime("");
                  }}
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>

          </Grid>

        </Grid>

        <Grid item xs={0} md={2}>
        </Grid>

      </Grid>
    </Box>

  )
};

export default Profile;