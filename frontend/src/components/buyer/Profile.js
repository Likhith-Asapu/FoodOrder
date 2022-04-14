import axios from "axios";
import { useState, useEffect } from "react";
import React, { Component } from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = (props) => {
  const [users, setUsers] = useState([]);
  var a = sessionStorage.getItem("Buyeremail");
  const newUser = {
    email: a
  };

  useEffect(() => {
    axios
      .post("http://localhost:4000/user/findbuyer", newUser)
      .then((response) => {
        const b = response.data;
        console.log(response.data)
        setUsers(b);
      })
      .catch((error) => {
        console.log(error);
      });

  });

  var foo = Object(users);
  console.log(foo.age);

  var [name, setName] = useState("");
  name = foo.name;
  const [email, setEmail] = useState("");
  var [password, setPassword] = React.useState("");
  password = foo.password;
  const [pwdvisibility, setPwdvisibility] = useState(false);

  var [contactnum, setContact] = useState("");
  contactnum = foo.contactnum;

  var [age, setage] = useState(0);
  age = foo.age;

  var [batch, setBatch] = React.useState("");
  batch = foo.batch;

  const [selected, setSelected] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [newname, setNewName] = useState("");
  const [newcontact, setNewContact] = useState("");
  const [newbatch, setNewBatch] = useState("");
  const [newage, setNewage] = useState("");
  const [enterpwd, setEnterpwd] = useState("");
  const [snackval, setSnack] = useState(false);
  const [snackerrval, seterrSnack] = useState(false);
  const [ageopen, setageOpen] = React.useState(false);
  const [contactopen, setcontactOpen] = React.useState(false);
  const [batchopen, setbatchOpen] = React.useState(false);

  const handleageOpen = () => {
    setageOpen(true);
  };

  const handlecontactOpen = () => {
    setcontactOpen(true);
  };
  const handlebatchOpen = () => {
    setbatchOpen(true);
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

  const handleageClose = () => {
    setageOpen(false);
  };

  const handlecontactClose = () => {
    setcontactOpen(false);
  };

  const handlebatchClose = () => {
    setbatchOpen(false);
  };

  const onChangeNewName = (event) => {
    setNewName(event.target.value);
  };

  const onChangeNewContact = (event) => {
    setNewContact(event.target.value);
  };

  const onChangeNewBatch = (event) => {
    setNewBatch(event.target.value);
  };


  const onChangeNewage = (event) => {
    setNewage(event.target.value);
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

  const onChangeage = (event) => {
    setage(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const btnSetNewName = (event) => {
    const newUserName = {
      email: a,
      name: newname
    };

    axios
      .post("http://localhost:4000/user/updatebuyername", newUserName)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const btnSetNewage = (event) => {
    const newUserAge = {
      email: a,
      age: newage
    };

    axios
      .post("http://localhost:4000/user/updatebuyerage", newUserAge)
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
      .post("http://localhost:4000/user/updatebuyercontact", newUserContact)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const btnSetNewBatch = (event) => {
    const newUserBatch = {
      email: a,
      batch: newbatch
    };

    axios
      .post("http://localhost:4000/user/updatebuyerbatch", newUserBatch)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
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
            Wrong password
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
                    type={"password"}
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
              Age
            </Typography>
          </Grid>
          <Grid item container xs={8} spacing={2}>
            <Grid item >
              <TextField
                disabled={true}
                label="Shop Name"
                variant="outlined"
                value={age}
                onChange={onChangeage}
              />
            </Grid>
            <Grid item marginTop={1}>
              <IconButton color={"primary"} onClick={handleageOpen}>
                <EditIcon />
              </IconButton>
              <Dialog open={ageopen} onClose={handleageClose}>
                <DialogTitle>Set age</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="New age"
                    fullWidth
                    variant="standard"
                    value={newage}
                    onChange={onChangeNewage}
                  />
                  <TextField
                    margin="dense"
                    label="Confirm Password"
                    fullWidth
                    variant="standard"
                    onChange={onChangeEnterpwd}
                    value={enterpwd}
                    type={"password"}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {
                    handleageClose();
                    setEnterpwd("");
                    setNewage("");
                  }}>Cancel</Button>
                  <Button onClick={() => {
                    if (password == enterpwd) {
                      btnSetNewage();
                      handleageClose();
                      snackClick();
                    }
                    else {
                      setEnterpwd("");
                      snackerrClick();
                    }
                    setEnterpwd("");
                    setNewage("");
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
                    type={"password"}
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
              Batch
            </Typography>
          </Grid>
          <Grid container item xs={8} spacing={2}>
            <Grid item>
              <TextField
                disabled={true}
                label="Batch"
                variant="outlined"
                value={batch}
                onChange={onChangeBatch}
              />
            </Grid>
            <Grid item marginTop={1}>
              <IconButton color={"primary"} onClick={handlebatchOpen}>
                <EditIcon />
              </IconButton>
              <Dialog open={batchopen} onClose={handlebatchClose}>
                <DialogTitle>Set Batch</DialogTitle>
                <DialogContent>
                  <FormControl sx={{width:200}}>
                    <InputLabel variant="standard">
                      Batch
                    </InputLabel>
                    <NativeSelect
                      defaultValue={""}
                      inputProps={{
                        name: 'Type',
                        id: 'uncontrolled-native',
                      }}
                      value={newbatch}
                      onChange={onChangeNewBatch}
                      fullWidth={true}
                      autoFocus
                      label="New Batch"
                    >
                      <option value={"UG1"}>UG1</option>
                      <option value={"UG2"}>UG2</option>
                      <option value={"UG3"}>UG3</option>
                      <option value={"UG4"}>UG4</option>
                      <option value={"UG5"}>UG5</option>
                    </NativeSelect>
                  </FormControl>
                  <TextField
                    margin="dense"
                    label="Confirm Password"
                    fullWidth
                    variant="standard"
                    onChange={onChangeEnterpwd}
                    value={enterpwd}
                    type={"password"}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {
                    handlebatchClose();
                    setEnterpwd("");
                    setNewBatch("");

                  }}>Cancel</Button>
                  <Button onClick={() => {
                    if (password == enterpwd) {
                      btnSetNewBatch();
                      handlebatchClose();
                      snackClick();
                    }
                    else {
                      setEnterpwd("");
                      snackerrClick();
                    }
                    setEnterpwd("");
                    setNewBatch("");
                  }}
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>

          </Grid>

        </Grid>
      </Grid>
    </Box>

  )
};

export default Profile;