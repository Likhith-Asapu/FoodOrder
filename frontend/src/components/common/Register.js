import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NativeSelect from '@mui/material/NativeSelect';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { integerPropType } from "@mui/utils";
import FormHelperText from '@mui/material/FormHelperText';
import React, { Component } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(null);
  const [password, setPassword] = useState("");
  const [pwdvisibility, setPwdvisibility] = useState(false);
  const [usertype, setUsertype] = useState("Buyer");
  const [vsb, setVsb] = useState(false);
  const [contactnum, setContact] = useState("");
  const [age, setAge] = useState("18");
  const [batch, setBatch] = useState("UG1");
  const [shopname, setShopname] = useState("");
  const [opentime, setTimeopen] = useState();
  const [endtime, setTimeend] = useState();
  const [value, setValue] = React.useState(null);
  const [open, setOpen] = React.useState(null);

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const handleChange = (event) => {
    setPassword(event.target.value);
  }

  const handleClickShowPassword = () => {
    setPwdvisibility(!pwdvisibility);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeUsertype = (event) => {
    setUsertype(event.target.value);
    setVsb(!vsb);
  };
  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const onChangeShopname = (event) => {
    setShopname(event.target.value);
  };

  const onChangeOpentime = (event) => {
    setTimeopen(event.target.value);
    console.log(event.target.value.substr(0, 2));
    console.log(event.target.value.substr(3, 5));
  };
  const onChangeEndtime = (event) => {
    setTimeend(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setDate(null);
    setPassword("");
    setAge(18);
    setContact("")
    setBatch("UG1");
    setShopname("");
    setTimeopen("");
    setTimeend("");
  };


  const onSubmitBtn1 = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      date: Date.now(),
      password: password,
      contactnum: contactnum,
      age: age,
      batch: batch
    };

    try {
      Number(age);
      Number(contactnum);

      if (age <= 0 || contactnum <= 0) {
        throw "Error"
      }
    }
    catch (error) {
      handleClickOpen();
      resetInputs();
      return;
    }

    axios
      .post("http://localhost:4000/user/registerbuyer", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      }).catch((error) => {
        handleClickOpen();
        resetInputs();
      });

    const newBuyerWallet = {
      buyeremail: email
    }
    axios
      .post("http://localhost:4000/user/buyerwallet", newBuyerWallet)
      .then((response) => {
        console.log(response.data);
      }).catch((error) => {
        handleClickOpen();
        resetInputs();
      });


    resetInputs();
  };

  const onSubmitBtn2 = (event) => {
    event.preventDefault();
    const setendtime =  new Date(Date.UTC(0,0,0,Number(endtime.substr(0, 2)) , Number(endtime.substr(3, 5)),0,0));
    const setopentime =  new Date(Date.UTC(0,0,0,Number(opentime.substr(0, 2)) , Number(opentime.substr(3, 5)),0,0));
    console.log(setopentime);
    console.log(setendtime);
    if(setendtime <=  setopentime){
      handleClickOpen();
      resetInputs();
      return;
    }
    const newUser = {
      name: name,
      email: email,
      date: Date.now(),
      password: password,
      contactnum: contactnum,
      shopname: shopname,
      opentime: setopentime,
      endtime: setendtime
    };

    try {
      Number(contactnum);

      if (contactnum <= 0) {
        throw "Error"
      }
    }
    catch (error) {
      handleClickOpen();
      resetInputs();
      return;
    }

    axios
      .post("http://localhost:4000/user/registervendor", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      }).catch((error) => {
        handleClickOpen();
        resetInputs();
      });

    resetInputs();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <Grid container align={"center"} spacing={2}>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Warning!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            INVALID DETAILS ENTERED
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Grid item xs={12}>
        <FormControl sx={{ m: 1, width: '25ch' }}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Type
          </InputLabel>
          <NativeSelect
            defaultValue={""}
            inputProps={{
              name: 'Type',
              id: 'uncontrolled-native',
            }}
            value={usertype}
            onChange={onChangeUsertype}
          >
            <option value={"Buyer"}>Buyer</option>
            <option value={"Vendor"}>Vendor</option>
          </NativeSelect>
        </FormControl>
      </Grid>

      <Grid item xs={12} align={"center"} spacing={2}>
        <Grid id="grid1" container align={"center"} spacing={2} xs={12} visibility={vsb ? "hidden" : "visible"} position={"absolute"}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={onChangeUsername}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={onChangeEmail}
              type={"email"}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '20ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput

                type={pwdvisibility ? 'text' : 'password'}
                value={password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {pwdvisibility ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Age"
              variant="outlined"
              value={age}
              onChange={onChangeAge}
              type={"number"}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contact"
              variant="outlined"
              value={contactnum}
              onChange={onChangeContact}
              type={"tel"}
              pattern={"\d{10}"}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Batch
              </InputLabel>
              <NativeSelect
                defaultValue={""}
                inputProps={{
                  name: 'Type',
                  id: 'uncontrolled-native',
                }}
                value={batch}
                onChange={onChangeBatch}
              >
                <option value={"UG1"}>UG1</option>
                <option value={"UG2"}>UG2</option>
                <option value={"UG3"}>UG3</option>
                <option value={"UG4"}>UG4</option>
                <option value={"UG5"}>UG5</option>
              </NativeSelect>
            </FormControl>
          </Grid>


          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmitBtn1}>
              Register
            </Button>
          </Grid>

        </Grid>

        <Grid container align={"center"} spacing={2} xs={12} visibility={vsb ? "visible" : "hidden"} position={"absolute"}>
          <Grid item xs={12}>
            <TextField
              label="Manager Name"
              variant="outlined"
              value={name}
              onChange={onChangeUsername}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={onChangeEmail}
              type={"email"}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '20ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput

                type={pwdvisibility ? 'text' : 'password'}
                value={password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {pwdvisibility ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Shop Name"
              variant="outlined"
              value={shopname}
              onChange={onChangeShopname}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contact"
              variant="outlined"
              value={contactnum}
              onChange={onChangeContact}

            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '20ch' }} variant="outlined">
              <OutlinedInput

                value={opentime}
                onChange={onChangeOpentime}
                type={"time"}
              />
              <FormHelperText >Shop Open Time</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '20ch' }} variant="outlined">
              <OutlinedInput

                value={endtime}
                onChange={onChangeEndtime}
                type={"time"}
              />
              <FormHelperText>Shop Close time</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmitBtn2}>
              Register
            </Button>
          </Grid>

        </Grid>
      </Grid>
    </Grid >
  );
};

export default Register;
