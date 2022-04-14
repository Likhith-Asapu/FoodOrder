import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import axios from "axios";
import { useState, useEffect } from "react";
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { Divider } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const Img = styled('img')({
  maxHeight: '100%',
  display: 'block',
  maxWidth: '100%',
  margin: 'auto',
});

export default function ComplexGrid() {
  var vendoremail = sessionStorage.getItem("Vendoremail");
  const [placeditems, setPlaceditems] = React.useState([]);
  const [accepteditems, setAccepteditems] = React.useState([]);
  const [readyitems, setReadyitems] = React.useState([]);
  const [cookingitems, setCookingitems] = React.useState([]);
  const [completeditems, setCompleteditems] = React.useState([]);
  const [rejecteditems, setRejecteditems] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const getOrder = (status) => {
    const newItems = {
      vendoremail: vendoremail,
      status: status
    }
    axios
      .post("http://localhost:4000/user/findorders", newItems)
      .then((response) => {
        const t = response.data;
        if (status == "PLACED")
          setPlaceditems(t);
        if (status == "ACCEPTED")
          setAccepteditems(t);
        if (status == "READY")
          setReadyitems(t);
        if (status == "COOKING")
          setCookingitems(t);
        if (status == "COMPLETED")
          setCompleteditems(t);
        if (status == "REJECTED")
          setRejecteditems(t);

        console.log(t);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  useEffect(() => {
    getOrder("PLACED");
    getOrder("ACCEPTED");
    getOrder("COOKING");
    getOrder("READY");
    getOrder("COMPLETED");
    getOrder("REJECTED");

  }, []);

  const iconColor = (clrtype) => {
    if (clrtype == "Veg")
      return <Brightness1Icon color="success" />
    else
      return <Brightness1Icon color="error" />
  }

  const moveNext = (time, buyeremail, status) => {

    if ((accepteditems.length + cookingitems.length >= 10) && (status == "ACCEPTED")) {
      handleClickOpen();
      return;
    }

    const newItems = {
      vendoremail: vendoremail,
      status: status,
      buyeremail: buyeremail,
      time: time
    }

    axios
      .post("http://localhost:4000/user/findbuyerorder", newItems)
      .then((response) => {
        const t = response.data;
        console.log(t);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    getOrder("PLACED");
    getOrder("ACCEPTED");
    getOrder("COOKING");
    getOrder("READY");
    getOrder("COMPLETED");
    getOrder("REJECTED");

    window.location.reload();
  }

  return (
    <Grid container spacing={2} padding={4} xs={12}>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Warning!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Failed to push item to next stage. Can't have more than 5 items in ACCEPTED + COOKING stage.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Grid item xs={12} align={"center"} padding={4}>
        <Typography variant='h4' marginTop={3}>
          PLACED ORDERS
        </Typography>
      </Grid>
      {placeditems.map((item, ind) => (
        <Grid container item xs={6} spacing={2} padding={2}>
          <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1 }} elevation={5}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="complex" src={require('../buyer/Food.png')} />
                </ButtonBase>
              </Grid>
              <Grid item sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="h4" component="div">
                      {item.itemname}{iconColor(item.type)}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Buyeremail - {item.buyeremail}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Date - {item.time.substr(0, 10)},
                      Time - {item.time.substr(11, 5)}

                    </Typography>


                    <Typography variant="body1" color="text">
                      Addons - {item.addons.map((add, ind) => (add + ","))}
                    </Typography>

                  </Grid>
                </Grid>
                <Grid item justifyContent="flex-end">
                  <Typography variant="h4" component="div">
                    {item.quantity}
                  </Typography>
                  <Typography variant="body1" component="div" color="text.secondary" >
                    ₹{item.cost}
                  </Typography>
                </Grid>

                <Grid item container spacing={1} marginTop={2} justifyContent="flex-end">

                  <Grid item><Button color='info' variant='contained' disableElevation onClick={() => { moveNext(item.time, item.buyeremail, "ACCEPTED"); }}> Move to next stage</Button></Grid>
                  <Grid item><Button color='error' variant='contained' disableElevation onClick={() => { moveNext(item.time, item.buyeremail, "REJECTED"); }}> Reject</Button></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}


      <Grid item xs={12} align={"center"} padding={4}>
        <Divider />
        <Typography variant='h4' marginTop={3}>
          ACCEPTED
        </Typography>
      </Grid>
      {accepteditems.map((item, ind) => (
        <Grid container item xs={6} spacing={2} padding={2}>
          <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1 }} elevation={5}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="complex" src={require('../buyer/Food.png')} />
                </ButtonBase>
              </Grid>
              <Grid item sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="h4" component="div">
                      {item.itemname}{iconColor(item.type)}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Buyeremail - {item.buyeremail}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Date - {item.time.substr(0, 10)},
                      Time - {item.time.substr(11, 5)}

                    </Typography>


                    <Typography variant="body1" color="text">
                      Addons - {item.addons.map((add, ind) => (add + ","))}
                    </Typography>

                  </Grid>
                </Grid>
                <Grid item justifyContent="flex-end">
                  <Typography variant="h4" component="div">
                    {item.quantity}
                  </Typography>
                  <Typography variant="body1" component="div" color="text.secondary" >
                    ₹{item.cost}
                  </Typography>
                </Grid>

                <Grid item container spacing={1} marginTop={2} justifyContent="flex-end">

                  <Grid item><Button color='info' variant='contained' disableElevation onClick={() => { moveNext(item.time, item.buyeremail, "COOKING"); }}> Move to next stage</Button></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}


      <Grid item xs={12} align={"center"} padding={4}>
        <Divider />
        <Typography variant='h4' marginTop={3}>
          COOKING
        </Typography>
      </Grid>
      {cookingitems.map((item, ind) => (
        <Grid container item xs={6} spacing={2} padding={2}>
          <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1 }} elevation={5}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="complex" src={require('../buyer/Food.png')} />
                </ButtonBase>
              </Grid>
              <Grid item sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="h4" component="div">
                      {item.itemname}{iconColor(item.type)}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Buyeremail - {item.buyeremail}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Date - {item.time.substr(0, 10)},
                      Time - {item.time.substr(11, 5)}

                    </Typography>


                    <Typography variant="body1" color="text">
                      Addons - {item.addons.map((add, ind) => (add + ","))}
                    </Typography>

                  </Grid>
                </Grid>
                <Grid item justifyContent="flex-end">
                  <Typography variant="h4" component="div">
                    {item.quantity}
                  </Typography>
                  <Typography variant="body1" component="div" color="text.secondary" >
                    ₹{item.cost}
                  </Typography>
                </Grid>

                <Grid item container spacing={1} marginTop={2} justifyContent="flex-end">

                  <Grid item><Button color='info' variant='contained' disableElevation onClick={() => { moveNext(item.time, item.buyeremail, "READY"); }}> Move to next stage</Button></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}



      <Grid item xs={12} align={"center"} padding={4}>
        <Divider />
        <Typography variant='h4' marginTop={3}>
          READY FOR PICKUP
        </Typography>
      </Grid>
      {readyitems.map((item, ind) => (
        <Grid container item xs={6} spacing={2} padding={2}>
          <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1 }} elevation={5}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="complex" src={require('../buyer/Food.png')} />
                </ButtonBase>
              </Grid>
              <Grid item sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="h4" component="div">
                      {item.itemname}{iconColor(item.type)}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Buyeremail - {item.buyeremail}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Date - {item.time.substr(0, 10)},
                      Time - {item.time.substr(11, 5)}

                    </Typography>


                    <Typography variant="body1" color="text">
                      Addons - {item.addons.map((add, ind) => (add + ","))}
                    </Typography>

                  </Grid>
                </Grid>
                <Grid item justifyContent="flex-end">
                  <Typography variant="h4" component="div">
                    {item.quantity}
                  </Typography>
                  <Typography variant="body1" component="div" color="text.secondary" >
                    ₹{item.cost}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}




      <Grid item xs={12} align={"center"} padding={4}>
        <Divider />
        <Typography variant='h4' marginTop={3}>
          COMPLETED
        </Typography>
      </Grid>
      {completeditems.map((item, ind) => (
        <Grid container item xs={6} spacing={2} padding={2}>
          <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1 }} elevation={5}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="complex" src={require('../buyer/Food.png')} />
                </ButtonBase>
              </Grid>
              <Grid item sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="h4" component="div">
                      {item.itemname}{iconColor(item.type)}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Buyeremail - {item.buyeremail}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Date - {item.time.substr(0, 10)},
                      Time - {item.time.substr(11, 5)}

                    </Typography>


                    <Typography variant="body1" color="text">
                      Addons - {item.addons.map((add, ind) => (add + ","))}
                    </Typography>

                  </Grid>
                </Grid>
                <Grid item justifyContent="flex-end">
                  <Typography variant="h4" component="div">
                    {item.quantity}
                  </Typography>
                  <Typography variant="body1" component="div" color="text.secondary" >
                    ₹{item.cost}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}




      <Grid item xs={12} align={"center"} padding={4}>
        <Divider />
        <Typography variant='h4' marginTop={3}>
          REJECTED
        </Typography>
      </Grid>
      {rejecteditems.map((item, ind) => (
        <Grid container item xs={6} spacing={2} padding={2}>
          <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1 }} elevation={5} variant='outlined'>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="complex" src={require('../buyer/Food.png')} />
                </ButtonBase>
              </Grid>
              <Grid item sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="h4" component="div">
                      {item.itemname}{iconColor(item.type)}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Buyeremail - {item.buyeremail}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Date - {item.time.substr(0, 10)},
                      Time - {item.time.substr(11, 5)}

                    </Typography>


                    <Typography variant="body1" color="text">
                      Addons - {item.addons.map((add, ind) => (add + ","))}
                    </Typography>

                  </Grid>
                </Grid>
                <Grid item justifyContent="flex-end">
                  <Typography variant="h4" component="div">
                    {item.quantity}
                  </Typography>
                  <Typography variant="body1" component="div" color="text.secondary" >
                    ₹{item.cost}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}

      <Grid item xs={12} align={"center"} padding={4}>
        <Divider />
      </Grid>

    </Grid>
  );
}
