import axios from "axios";
import { useState, useEffect } from "react";
import React, { Component } from 'react';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const Login = (props) => {
  const [usertype, setUsertype] = useState("Buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwdvisibility, setPwdvisibility] = useState(false);
  const [users, setDetails] = useState([]);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
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
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
    setUsertype("Buyer");
  };

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }


  const onSubmitBtn = (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      password: password
    };

    if (usertype == "Buyer") {
      axios
        .post("http://localhost:4000/user/loginbuyer", newUser)
        .then((response) => {
          sessionStorage.setItem("Buyeremail", email);
          navigate("/buyer/profile");
        }).catch((error) => {
          handleOpen();
          resetInputs();
        });
    }
    else {
      axios
        .post("http://localhost:4000/user/loginvendor", newUser)
        .then((response) => {
          sessionStorage.setItem("Vendoremail", email);
          navigate("/vendor/profile");
        }).catch((error) => {
          handleOpen();
          resetInputs();
        });
    }

    resetInputs();
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
            Details entered are wrong
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Grid item xs={12}>
        <Typography item variant="h3" color={"text.secondary"} fontWeight={"500"} margin={5}>
          Login Page
        </Typography>
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
            id="outlined-adornment-password"
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
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmitBtn}>
          Login
        </Button>
      </Grid>
    </Grid>

  )
};
export default Login;