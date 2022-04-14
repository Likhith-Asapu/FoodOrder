import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import { typography } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from "axios";
import { useState, useEffect } from "react";
import Brightness1Icon from '@mui/icons-material/Brightness1';
import Rating from '@mui/material/Rating';
import { grey,pink,teal } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

const Img = styled('img')({
    maxHeight: '100%',
    display: 'block',
    maxWidth: '100%',
    margin: 'auto',
});

export default function ComplexGrid() {
    var a = sessionStorage.getItem("Vendoremail");
    const [open, setOpen] = React.useState(false);
    const [delopen, setDelOpen] = React.useState(false);
    const [itemname, setItemname] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [type, setType] = React.useState("Veg");
    const [allitems, setAllitems] = React.useState([]);
    const [alladdons, setAlladdons] = React.useState([]);
    const [dum, setDum] = React.useState(false)
    const [addonopen, setaddonOpen] = React.useState(false);
    const [newpriceopen, setnewpriceOpen] = React.useState(false);
    const [addonprice, setaddonPrice] = React.useState();
    const [addonname, setaddonName] = React.useState("");
    const [addaddonopen, setaddaddonOpen] = React.useState(false);
    const [newprice, setNewprice] = React.useState();
    const [drink, setDrink] = React.useState(false);
    const [hot, setHot] = React.useState(false);
    const [cold, setCold] = React.useState(false);
    const [sweet, setSweet] = React.useState(false);
    const [snack, setSnack] = React.useState(false);
    const [tagopen, settagOpen] = React.useState(false);
    useEffect(() => {
        const newItems = {
            vendoremail: a
        }
        axios
            .post("http://localhost:4000/user/findfooditems", newItems)
            .then((response) => {
                const t = response.data;
                setAllitems(t);
                console.log(t);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

    }, []);

    const onChangeItemname = (event) => {
        setItemname(event.target.value);
    };

    const onChangeDum = (event) => {
        setDum(!dum);
    };


    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };

    const onChangeAddonPrice = (event) => {
        setaddonPrice(event.target.value);
    };

    const onChangeAddonName = (event) => {
        setaddonName(event.target.value);
    }

    const onChangeNewprice = (event) => {
        setNewprice(event.target.value);
    }
    const onChangeType = (event) => {
        setType(event.target.value);
    };

    const handleaddAddonClose = () => {
        setaddaddonOpen(false);
    }
    const handleNewpriceClose = () => {
        setnewpriceOpen(false);
    }

    const handleNewpriceOpen = () => {
        setnewpriceOpen(true);
    }

    const handleaddAddonOpen = () => {
        setaddaddonOpen(true);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleAddonOpen = () => {
        setaddonOpen(true);
    };

    const handleAddonClose = () => {
        setaddonName("");
        setaddonPrice();
        setaddonOpen(false);

    };

    const handleTagClose = () => {
        settagOpen(false);
    };

    const handleTagOpen = () => {
        settagOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
        setItemname("");
        setPrice(0);
    };

    const handleDelOpen = () => {
        setDelOpen(true);
    };

    const handleDelClose = () => {
        setDelOpen(false);
    };

    const drinkChange = (event) => {
        setDrink(event.target.checked);
    };

    const coldChange = (event) => {
        setCold(event.target.checked);
    };

    const hotChange = (event) => {
        setHot(event.target.checked);
    };

    const sweetChange = (event) => {
        setSweet(event.target.checked);
    };

    const snackChange = (event) => {
        setSnack(event.target.checked);
    };


    const findItems = () => {
        const newItems = {
            vendoremail: a
        }
        axios
            .post("http://localhost:4000/user/findfooditems", newItems)
            .then((response) => {
                const y = response.data;
                setAllitems(y);
                console.log(y);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }

    const addNewTags = () => {
        const newItem = {
            vendoremail: a,
            itemname: itemname,
            drink: drink,
            hot: hot,
            cold: cold,
            snack: snack,
            sweet: sweet
        }

        axios
            .post("http://localhost:4000/user/addtag", newItem)
            .then((response) => {
                console.log("Added");
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }

    const addNewItem = (event) => {
        try {
            if (Number(price) <= 0) {
                throw "Wrong price";
            }
            const newItem = {
                vendoremail: a,
                price: price,
                type: type,
                itemname: itemname,
                ordertimes: 0,
                totalrating: 0
            }
            axios
                .post("http://localhost:4000/user/additem", newItem)
                .then((response) => {
                    addNewTags();
                    findItems();
                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });


            setPrice(0);
            setType("Veg");
            setItemname("");
            handleClose();
        }
        catch (error) {
            alert("Wrong Price");
            setPrice(0);
        }

    }

    const iconColor = (clrtype) => {
        if (clrtype == "Veg")
            return <Brightness1Icon color="success" />
        else
            return <Brightness1Icon color="error" />
    }

    const displayitem = (id) => {
        const element = document.getElementById(id);
        element.style.visibility = "hidden";
    }

    const delFoodItem = () => {

        const delItem = {
            vendoremail: a,
            itemname: itemname
        }
        axios
            .post("http://localhost:4000/user/deleteitems", delItem)
            .then((response) => {
                alert("done");
                findItems();
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        window.location.reload();

    }

    const getAddons = (addonitem) => {

        const Addon = {
            vendoremail: a,
            itemname: addonitem
        }
        axios
            .post("http://localhost:4000/user/findaddons", Addon)
            .then((response) => {
                const adds = response.data;
                setAlladdons(adds);
                console.log(adds);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

    }

    const addAddons = () => {

        const Addon = {
            vendoremail: a,
            itemname: itemname,
            price: addonprice,
            addonname: addonname
        }
        axios
            .post("http://localhost:4000/user/addaddon", Addon)
            .then((response) => {
                getAddons(itemname);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }

    const deleteaddon = (addonname1) => {
        const Addon = {
            vendoremail: a,
            itemname: itemname,
            addonname: addonname1
        }
        console.log(Addon);
        axios
            .post("http://localhost:4000/user/deleteaddon", Addon)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

    }

    const newPriceUpdate = (updatedprice) => {
        try {
            if (updatedprice <= 0) {
                throw "Wrong price";
            }
            const updateItem = {
                vendoremail: a,
                price: updatedprice,
                itemname: itemname
            }
            axios
                .post("http://localhost:4000/user/updateitemprice", updateItem)
                .then((response) => {
                    findItems();
                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });
            handleNewpriceClose();
            window.location.reload();
        }
        catch (error) {
            alert("Wrong Price");
            setNewprice(0);
        }
    }

    const getTags = (tagitemname) => {
        const tagItems = {
            vendoremail: a,
            itemname: tagitemname
        }
        axios
            .post("http://localhost:4000/user/findtags", tagItems)
            .then((response) => {
                const itemtags = response.data;
                setHot(itemtags.hot);
                setCold(itemtags.cold);
                setDrink(itemtags.drink);
                setSweet(itemtags.sweet);
                setSnack(itemtags.snack);

            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }


    return (
        <Grid container spacing={2} padding={4} xs={12}>

            <Dialog open={open} onClose={handleClose} fullWidth={"md"} maxWidth={"md"}>
                <DialogTitle>Food Item Details</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Item Name"
                        fullWidth
                        variant="standard"
                        value={itemname}
                        onChange={onChangeItemname}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        fullWidth
                        variant="standard"
                        value={price}
                        onChange={onChangePrice}
                    />
                    <FormControl>
                        <RadioGroup
                            row
                            value={type}
                            onChange={onChangeType}
                        >
                            <FormControlLabel value={"Veg"} control={<Radio color="success" />} label="Veg" />
                            <FormControlLabel value={"Non-Veg"} control={<Radio color="error" />} label="Non-Veg" />
                        </RadioGroup>
                    </FormControl>
                    <Typography variant="body2" color="text.secondary">
                        Tags
                    </Typography>
                    <FormGroup row label="Tags">
                        <FormControlLabel control={<Checkbox checked={snack} onChange={snackChange} sx={{
                            '&.Mui-checked': {
                                color: pink[300]
                            }
                        }} />} label="Snack" />
                        <FormControlLabel control={<Checkbox color='secondary' checked={drink} onChange={drinkChange} />} label="Drinks" />
                        <FormControlLabel control={<Checkbox color='info' checked={cold} onChange={coldChange} />} label="Cold" />
                        <FormControlLabel control={<Checkbox color='warning' checked={hot} onChange={hotChange} />} label="Hot" />
                        <FormControlLabel control={<Checkbox checked={sweet} onChange={sweetChange} sx={{
                            '&.Mui-checked': {
                                color: teal[400]
                            }
                        }} />} label="Sweet" />
                    </FormGroup>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}> Cancel</Button>
                    <Button onClick={() => {
                        addNewItem();
                    }} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={delopen}
                onClose={handleDelClose}
            >
                <DialogTitle variant="h6">
                    Confirm Deletion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText variant='body1'>
                        Confirm deletion by clicking on Agree option
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelClose}>Disagree</Button>
                    <Button onClick={() => { delFoodItem(); handleDelClose(); }} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog open={addonopen} onClose={handleAddonClose}>
                <DialogTitle>Addons</DialogTitle>
                <DialogContent>
                    {alladdons.map((addon, ind) => (
                        <Grid container spacing={2} paddingTop={2}>
                            <Grid item>
                                <TextField
                                    autoFocus
                                    label="Addon"
                                    variant="outlined"
                                    value={addon.addonname}
                                    disabled={true}
                                    size='small'
                                />
                            </Grid>
                            <Grid item>

                                <TextField
                                    label="Price"
                                    variant="outlined"
                                    value={addon.price}
                                    disabled={true}
                                    size='small'
                                />
                            </Grid>

                            <Grid item>
                                <IconButton color={"error"} padding={2} onClick={() => { deleteaddon(addon.addonname); handleAddonClose(); }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleAddonClose(); handleaddAddonOpen(); }} autoFocus> Add Item</Button>
                    <Button onClick={handleAddonClose}>
                        Exit
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={addaddonopen} onClose={handleaddAddonClose}>
                <DialogTitle>Addon Details</DialogTitle>
                <DialogContent>

                    <Grid container spacing={4}>
                        <Grid item>
                            <TextField
                                autoFocus
                                label="Addon"
                                variant="standard"
                                value={addonname}
                                onChange={onChangeAddonName}
                            />
                        </Grid>
                        <Grid item>

                            <TextField
                                label="Price"
                                variant="standard"
                                value={addonprice}
                                onChange={onChangeAddonPrice}
                            />
                        </Grid>

                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { addAddons(); handleaddAddonClose(); }} autoFocus> Add Addon</Button>
                    <Button onClick={handleaddAddonClose}>
                        Exit
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={newpriceopen} onClose={handleNewpriceClose}>
                <DialogTitle>Enter New Price</DialogTitle>
                <DialogContent>

                    <Grid container spacing={4}>
                        <Grid item>

                            <TextField
                                label="New Price"
                                variant="standard"
                                value={newprice}
                                onChange={onChangeNewprice}
                            />
                        </Grid>

                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { newPriceUpdate(newprice); handleNewpriceClose(); }}> Confirm </Button>
                    <Button onClick={handleNewpriceClose}>
                        Exit
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={tagopen}
                onClose={handleTagClose}
            >
                <DialogTitle variant="h6">
                    Tags Choosen
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary">
                        Tags
                    </Typography>
                    <FormGroup row label="Tags">
                        <FormControlLabel control={<Checkbox color='warning' checked={snack} disabled={!snack} sx={{
                            '&.Mui-checked': {
                                color: pink[300]
                            }
                        }} />} label="Snack" />
                        <FormControlLabel control={<Checkbox color='secondary' checked={drink} disabled={!drink}/>} label="Drinks" />
                        <FormControlLabel control={<Checkbox color='info' checked={cold} disabled={!cold}/>} label="Cold" />
                        <FormControlLabel control={<Checkbox color='error' checked={hot} disabled={!hot}/>} label="Hot" />
                        <FormControlLabel control={<Checkbox checked={sweet} disabled={!sweet} sx={{
                            '&.Mui-checked': {
                                color: teal[400]
                            }
                        }} />} label="Sweet" />
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleTagClose}>Exit</Button>
                </DialogActions>
            </Dialog>




            <Grid item xs={12} align={"center"} padding={4}>
                <Button variant="contained" startIcon={<AddIcon />} size="large" color='primary' onClick={handleOpen}>
                    Add Item
                </Button>
            </Grid>
            {allitems.map((item, ind) => (
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
                                            Average Rating
                                        </Typography>
                                        <Rating value={item.totalrating / item.ordertimes} precision={0.5} readOnly />
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4" component="div">
                                        ₹{item.price}
                                    </Typography>
                                </Grid>
                                <Grid item container spacing={1} marginTop={2}>
                                    <Grid item><Button color='secondary' variant='contained' disableElevation onClick={() => { getTags(item.itemname); handleTagOpen(); }}> Tags</Button></Grid>
                                    <Grid item><Button color='info' variant='contained' disableElevation onClick={() => { getAddons(item.itemname); setItemname(item.itemname); handleAddonOpen(); }}> Addons</Button></Grid>
                                    <Grid item><Button color='warning' variant='contained' disableElevation onClick={() => { setItemname(item.itemname); handleNewpriceOpen(); }}> Edit price</Button></Grid>
                                    <Grid item><Button color='error' variant='contained' disableElevation onClick={() => { handleDelOpen(); setItemname(item.itemname); }}> Remove item</Button></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            ))}

        </Grid>
    );
}
