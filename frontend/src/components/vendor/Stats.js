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



  return (
    <Grid container spacing={2} padding={4} xs={12}>



      <Grid item xs={12} align={"center"} padding={4}>
        <Typography variant='h4' marginTop={3}>
          PLACED ORDERS - {placeditems.length + accepteditems.length + readyitems.length + cookingitems.length + completeditems.length + rejecteditems.length}
        </Typography>

        <Typography variant='h4' marginTop={6}>
          PENDING ORDERS - {placeditems.length + accepteditems.length + readyitems.length + cookingitems.length}
        </Typography>

        <Typography variant='h4' marginTop={6}>
          COMPLETED ORDERS - {completeditems.length}
        </Typography>
      </Grid>

    </Grid>
  );
}
