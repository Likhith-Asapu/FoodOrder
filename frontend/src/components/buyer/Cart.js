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
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
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
    var buyeremail = sessionStorage.getItem("Buyeremail");
    const [placeditems, setPlaceditems] = React.useState([]);
    const [readyitems, setReadyitems] = React.useState([]);
    const [completeditems, setCompleteditems] = React.useState([]);
    const [rejecteditems, setRejecteditems] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [starvalue, setStarValue] = React.useState(2);
    const [time, setTime] = React.useState();
    const [vendoremail, setVendoremail] = React.useState("");
    const [itemname, setItemname] = React.useState("");
    const getOrder = (status) => {
        var statuslist = [];
        if (status == "PLACED" || status == "ACCEPTED" || status == "COOKING") {
            statuslist = [{ "status": "PLACED" }, { "status": "ACCEPTED" }, { "status": "COOKING" }];
        }
        else {
            statuslist = [{ "status": status }];
        }

        const newItems = {
            buyeremail: buyeremail,
            statuslist: statuslist
        }
        axios
            .post("http://localhost:4000/user/findordersbuyers", newItems)
            .then((response) => {
                const t = response.data;
                if (status == "PLACED" || status == "ACCEPTED" || status == "COOKING")
                    setPlaceditems(t);
                if (status == "READY")
                    setReadyitems(t);
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

    const moveNext = (time, vendoremail, status) => {

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
    const addRating = (time, vendoremail, rating, itemname) => {
        const newItems = {
            vendoremail: vendoremail,
            buyeremail: buyeremail,
            time: time,
            rating: rating
        }
        axios
            .post("http://localhost:4000/user/ratebuyerorder", newItems)
            .then((response) => {
                const t = response.data;
                console.log(t);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });


        const newItems1 = {
            vendoremail: vendoremail,
            itemname: itemname,
            rating: rating
        }
        axios
            .post("http://localhost:4000/user/finditemdetails", newItems1)
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
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setStarValue(2);
    }


    return (
        <Grid container spacing={2} padding={4} xs={12}>



            <Grid item xs={12} align={"center"} padding={4}>
                <Typography variant='h4' marginTop={3}>
                    MY ORDERS
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
                                            Vendoremail - {item.vendoremail}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            Date - {item.time.substr(0, 10)},
                                            Time - {item.time.substr(11, 5)}

                                        </Typography>


                                        <Typography variant="body2" color="text.secondary">
                                            Addons - {item.addons.map((add, ind) => (add + ","))}
                                        </Typography>

                                        <Typography variant="h6" color="info.main" fontWeight={"bold"}>
                                            {item.status}
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
                                            Vendoremail - {item.vendoremail}
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
                                <Grid xs={12} container item>
                                    <Grid item xs={6}>
                                        <Typography variant="h6" color="warning.main" fontWeight={"bold"}>
                                            {item.status}
                                        </Typography>
                                    </Grid>
                                    <Grid container xs={6} spacing={1} justifyContent="flex-end" >
                                        <Button color='info' variant='contained' onClick={() => { moveNext(item.time, item.vendoremail, "COMPLETED"); }}> Picked up</Button>
                                    </Grid>
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

                                        <Typography variant="body2" color="text.secondary">
                                            Rating Given
                                        </Typography>
                                        <Rating value={item.rating} precision={0.5} readOnly />

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
                                <Grid xs={12} container item>
                                    <Grid item xs={6}>
                                        <Typography variant="h6" color="success.main" fontWeight={"bold"}>
                                            {item.status}
                                        </Typography>
                                    </Grid>
                                    <Grid container xs={6} spacing={1} justifyContent="flex-end" >
                                        <Button color='warning' variant='contained' disabled={(item.rating == null) ? false : true} onClick={() => { setTime(item.time); setVendoremail(item.vendoremail); setItemname(item.itemname); handleOpen() }}> Rate Order</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>

                </Grid>

            ))}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Rate Order</DialogTitle>
                <DialogContent>
                    <Rating value={starvalue} defaultValue={2} size="large" onChange={(event) => { setStarValue(event.target.value); console.log(starvalue); }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { addRating(time, vendoremail, starvalue, itemname); handleClose(); }} autoFocus> RATE </Button>
                    <Button onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </Dialog>



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

                                        <Typography variant="h6" color="error" fontWeight={'bold'}>
                                            {item.status}
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
