import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from "@mui/material/Grid";
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BuyerNavbar from '../templates/BuyerNavbar'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StoreIcon from '@mui/icons-material/Store';
import StyleIcon from '@mui/icons-material/Style';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import SortIcon from '@mui/icons-material/Sort';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import axios from "axios";
import { useState, useEffect } from "react";
import Brightness1Icon from '@mui/icons-material/Brightness1';
import Stack from '@mui/material/Stack';
import { pink, teal } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import Slider from '@mui/material/Slider';
import { set } from 'date-fns';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function valuetext(value) {
    return `Rs.${value}`;
}

const Img = styled('img')({
    maxHeight: '100%',
    display: 'block',
    maxWidth: '100%',
    margin: 'auto',
});

const Tags = [
    "hot",
    "cold",
    "snack",
    "drink",
    "sweet"
];

const iconColor = (clrtype) => {
    if (clrtype == "Veg")
        return <Brightness1Icon color="success" />
    else
        return <Brightness1Icon color="error" />
}

const marks = [
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 5,
        label: '5',
    },
    {
        value: 6,
        label: '6',
    },
    {
        value: 7,
        label: '7',
    },
    {
        value: 8,
        label: '8',
    },
    {
        value: 9,
        label: '9',
    },
    {
        value: 10,
        label: '10',
    },
];


const drawerWidth = 300;
export default function Order() {

    const [tagName, setTagName] = React.useState([]);
    const [shopName, setShopName] = React.useState([]);
    const [veg, setVeg] = React.useState(false);
    const [nonveg, setNonveg] = React.useState(false);
    const [allitems, setAllitems] = React.useState([]);
    const [alltags, setAlltags] = React.useState([]);
    const [alldetails, setAlldetails] = React.useState([]);
    const [allshops, setAllshops] = React.useState([]);
    const [min, setMin] = React.useState("");
    const [max, setMax] = React.useState("");
    const [pricesort, setpriceSort] = React.useState("Ascending");
    const [pricecheck, setpriceCheck] = React.useState(false);
    const [namesort, setnameSort] = React.useState("Ascending");
    const [namecheck, setnameCheck] = React.useState(false);
    const [searchname, setSearchName] = React.useState("");
    const [wallet, setWallet] = React.useState("");
    const buyeremail = sessionStorage.getItem("Buyeremail");
    const [addonprice, setaddonPrice] = React.useState();
    const [addonname, setaddonName] = React.useState("");
    const [addonopen, setaddonOpen] = React.useState(false);
    const [alladdons, setAlladdons] = React.useState([]);
    const [totalcost, settotalCost] = React.useState(0);
    const [ordervend, setorderVend] = React.useState("");
    const [orderitem, setorderItem] = React.useState("");
    const [selectedstates, setSelectedStates] = React.useState([]);
    const [sliderval, setSliderVal] = React.useState(1);
    const [finalcost, setfinalCost] = React.useState(1);
    const [snackval, setSnack] = useState(false);
    const [snackerrval, seterrSnack] = useState(false);
    const [moneyadd, setMoneyAdd] = useState(false);
    const [moneytowallet,setMoneytoWallet] = useState(0);  
    const [type,setType] = useState("Veg");
    useEffect(() => {
        
        axios
            .get("http://localhost:4000/user/findallfooditems")
            .then((response) => {
                const t = response.data;
                setAllitems(t);

            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        axios
            .get("http://localhost:4000/user/findalltags")
            .then((response) => {
                const y = response.data;
                setAlltags(y);

            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        axios
            .get("http://localhost:4000/user/")
            .then((response) => {
                const z = response.data;
                setAlldetails(z);
                setAllshops(z);
                console.log(z);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        const User = {
            buyeremail: buyeremail
        }
        axios
            .post("http://localhost:4000/user/getbuyerwallet", User)
            .then((response) => {
                console.log(response.data)
                setWallet(response.data.money);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

    }, []);
    var added = [];
    console.log(alldetails);
    for (var i = 0; i < allitems.length; i++) {
        for (var j = 0; j < alltags.length; j++) {
            for (var k = 0; k < alldetails.length; k++) {
                if ((allitems[i].vendoremail == alltags[j].vendoremail) && (alltags[j].vendoremail == alldetails[k].email) && (allitems[i].itemname == alltags[j].itemname)) {
                    added.push(Object.assign(Object.assign(allitems[i], alltags[j]), alldetails[k]));
                }
            }
        }
    }
    var Shops = [];
    for (var i = 0; i < allshops.length; i++) {
        Shops.push(allshops[i].shopname);
    }

    console.log(added);
    console.log(Shops);

    const onChangeSliderVal = (event) => {
        setSliderVal(event.target.value);
        setfinalCost(totalcost * event.target.value);
    }

    const handletagChange = (event) => {
        const {
            target: { value },
        } = event;
        setTagName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleshopChange = (event) => {
        const {
            target: { value },
        } = event;
        setShopName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const onChangeMin = (event) => {
        setMin(event.target.value);
    };

    const onChangeMax = (event) => {
        setMax(event.target.value);
    };


    const changeVeg = () => {
        setVeg(!veg);
    }
    const changeNonveg = () => {
        setNonveg(!nonveg);
    }

    const priceSortChange = (event) => {
        setpriceSort(event.target.value);
    }
    const priceCheckChange = () => {
        setpriceCheck(!pricecheck);
    }

    const nameSortChange = (event) => {
        setnameSort(event.target.value);
    }
    const nameCheckChange = () => {
        setnameCheck(!namecheck);
    }

    const onChangeSearchname = (event) => {
        setSearchName(event.target.value);
    }

    const handleAddonOpen = () => {
        setaddonOpen(true);
    };

    const handleAddonClose = () => {
        setaddonName("");
        setaddonPrice();
        setaddonOpen(false);

    };
    const handleMoneyClose = () => {
        setMoneyAdd(false);
    }

    const handleMoneyOpen = () => {
        setMoneyAdd(true);
    }

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

    const filter = (itemname) => {
        var minimum = 0;
        var maximum = Number.MAX_VALUE;

        if (min != "") {
            try {
                minimum = Number(min);
            }
            catch (error) {
                alert("Please enter valid value");
            }
        }
        if (max != "") {
            try {
                maximum = Number(max);
            }
            catch (error) {
                alert("Please enter valid value");
            }
        }


        var type1 = [];
        if (veg) {
            type1.push({ "type": "Veg" });
        }
        if (nonveg) {
            type1.push({ "type": "Non-Veg" });
        }

        if (!(veg || nonveg)) {
            type1.push({ "type": "Veg" });
            type1.push({ "type": "Non-Veg" });
        }

        var sortname = 1;
        var sortitem = 1;

        if (namesort == "Descending") {
            sortname = -1;
        }
        if (pricesort == "Descending") {
            sortitem = -1;
        }

        if (namecheck && pricecheck) {
            const newItems1 = {
                type: type1,
                min: minimum,
                max: maximum,
                sortitem: sortitem,
                sortname: sortname
            }
            axios
                .post("http://localhost:4000/user/finditemscost", newItems1)
                .then((response) => {
                    const y = response.data;
                    setAllitems(y);
                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });
        }
        else if (namecheck) {
            const newItems2 = {
                type: type1,
                min: minimum,
                max: maximum,
                sortname: sortname
            }
            axios
                .post("http://localhost:4000/user/sortname", newItems2)
                .then((response) => {
                    const y = response.data;
                    setAllitems(y);
                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });

        }
        else if (pricecheck) {
            const newItems3 = {
                type: type1,
                min: minimum,
                max: maximum,
                sortitem: sortitem
            }
            axios
                .post("http://localhost:4000/user/sortcost", newItems3)
                .then((response) => {
                    const y = response.data;
                    setAllitems(y);
                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });
        }
        else {
            const newItems4 = {
                type: type1,
                min: minimum,
                max: maximum
            }
            axios
                .post("http://localhost:4000/user/typefiltersort", newItems4)
                .then((response) => {
                    const y = response.data;
                    setAllitems(y);
                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });
        }
        var tagsused;
        var filtertags = [];
        if (tagName.length == 0) {
            tagsused = Tags;
        }
        else {
            tagsused = tagName;
        }

        var n;
        for (var i = 0; i < tagsused.length; i++) {
            n = tagsused[i];
            filtertags.push({ [n]: true });
        }
        if(tagName.length == 0){
            filtertags.push({"hot":false});
        }
        console.log(filtertags);

        var newTags;
        if (itemname == null) {
            newTags = {
                taglist: filtertags
            }
        }
        else {
            newTags = {
                taglist: filtertags,
                itemname: itemname
            }
        }
        axios
            .post("http://localhost:4000/user/filtertags", newTags)
            .then((response) => {
                const filtags = response.data;
                setAlltags(filtags);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });


        if (shopName.length > 0) {
            var filtershops = [];
            var n;
            for (var i = 0; i < shopName.length; i++) {
                n = shopName[i];
                filtershops.push({ "shopname": n });
            }
            const newShops = {
                shoplist: filtershops
            }

            axios
                .post("http://localhost:4000/user/filtershops", newShops)
                .then((response) => {
                    const filshops = response.data;
                    setAlldetails(filshops);
                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });
        }
        else {
            axios
                .get("http://localhost:4000/user/")
                .then((response) => {
                    const filshops = response.data;
                    setAlldetails(filshops);
                    console.log(filshops);
                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });
        }
    }

    const getAddons = (addonitem, vendoremail) => {

        const Addon = {
            vendoremail: vendoremail,
            itemname: addonitem
        }
        axios
            .post("http://localhost:4000/user/findaddons", Addon)
            .then((response) => {
                const adds = response.data;
                setAlladdons(adds);
                console.log(adds.length);
                var allselected = [];
                for (var i = 0; i < adds.length; i++) {
                    allselected.push(false);
                }
                setSelectedStates(allselected);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

    }
    const placeOrder = () => {
        if (finalcost > wallet) {
            snackerrClick();
            return;
        }
        var addonlist = [];
        var addonsused =  Object(alladdons);

        for( var i = 0; i < selectedstates.length; i++){
            if(selectedstates[i]){
                addonlist.push(addonsused[i].addonname);
            }
        }
        const Order = {
            itemname: orderitem,
            vendoremail: ordervend,
            buyeremail: buyeremail,
            time: Date.now(),
            cost: finalcost,
            rating: null,
            status: "PLACED",
            quantity: sliderval,
            addons: addonlist,
            type: type
        }
        axios
            .post("http://localhost:4000/user/placeorder", Order)
            .then((response) => {
                console.log(response.data);
                snackClick();
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        const finalwallet = wallet - finalcost;
        const WalletDetails = {
            buyeremail: buyeremail,
            money: finalwallet
        }
        setWallet(finalwallet);

        axios
            .post("http://localhost:4000/user/updatewallet", WalletDetails)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });


    }


    const hottag = (hot) => {
        if (hot) {
            return <Chip label="hot" color='warning' size='small' />
        }
    }
    const coldtag = (cold) => {
        if (cold) {
            return <Chip label="cold" color="info" size='small' />
        }
    }
    const drinktag = (drink) => {
        if (drink) {
            return <Chip label="drink" color="secondary" size='small' />
        }
    }
    const snacktag = (snack) => {
        if (snack) {
            return <Chip label="snack" sx={{ color: "whitesmoke", bgcolor: pink[300] }} size='small' />
        }
    }
    const sweettag = (sweet) => {
        if (sweet) {
            return <Chip label="sweet" sx={{ color: "whitesmoke", bgcolor: teal[400] }} size='small' />
        }
    }


    const setSelected = (index) => {
        var newlist = selectedstates;
        newlist[index] = !newlist[index];
        setSelectedStates(newlist);
    }

    const setallSelectedfalse = () => {
        var newlist = selectedstates;
        for (var i = 0; i < newlist.length; i++) {
            newlist[i] = false;
        }
        setSelectedStates(newlist);
    }

    const addWalletMoney = (walletadd) => {
        if(walletadd == "" || walletadd < 0)
            return
        
        const finalwallet = wallet + Number(walletadd);
        const WalletDetails = {
            buyeremail: buyeremail,
            money: finalwallet
        }
        setWallet(finalwallet);

        axios
            .post("http://localhost:4000/user/updatewallet", WalletDetails)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        setMoneytoWallet(0);
    }



    return (

        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <BuyerNavbar />
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar sx={{ m: 1 }} />
                <Box sx={{ overflow: 'auto' }}>

                    <FormControl sx={{ m: 3, width: '25ch' }} variant="outlined">
                        <InputLabel>Search</InputLabel>
                        <OutlinedInput
                            label="TextField"
                            value={searchname}
                            onChange={onChangeSearchname}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={() => { filter(searchname); }}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            variant="outlined"
                            sx={{ width: drawerWidth - 50 }}
                        />

                    </FormControl>


                    <Divider />
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}

                        >
                            <ListItem>
                                <ListItemIcon>
                                    {<RestaurantMenuIcon />}
                                </ListItemIcon>
                                <ListItemText primary={"Veg/Non-Veg"} primaryTypographyProps={{
                                    fontWeight: '500',
                                    variant: 'h6'
                                }} />
                            </ListItem>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid sx={{ marginLeft: 6 }}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox checked={veg} onChange={changeVeg} color='success' />} label="Veg" />
                                    <FormControlLabel control={<Checkbox checked={nonveg} onChange={changeNonveg} color='error' />} label="Non-Veg" />
                                </FormGroup>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Divider />
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}

                        >
                            <ListItem>
                                <ListItemIcon>
                                    {<StoreIcon />}
                                </ListItemIcon>
                                <ListItemText primary={"Shops"} primaryTypographyProps={{
                                    fontWeight: '500',
                                    variant: 'h6'
                                }} />
                            </ListItem>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl sx={{ m: 1, width: drawerWidth - 50 }}>
                                <InputLabel >Shops</InputLabel>
                                <Select
                                    multiple
                                    value={shopName}
                                    onChange={handleshopChange}
                                    input={<OutlinedInput label="Tags" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} color="error" />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {Shops.map((shop) => (
                                        <MenuItem
                                            key={shop}
                                            value={shop}

                                        >
                                            {shop}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>


                    <Divider />

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}

                        >
                            <ListItem>
                                <ListItemIcon>
                                    {<StyleIcon />}
                                </ListItemIcon>
                                <ListItemText primary={"Food Tags"} primaryTypographyProps={{
                                    fontWeight: '500',
                                    variant: 'h6'
                                }} />
                            </ListItem>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl sx={{ m: 1, width: drawerWidth - 50 }}>
                                <InputLabel >Tags</InputLabel>
                                <Select
                                    multiple
                                    value={tagName}
                                    onChange={handletagChange}
                                    input={<OutlinedInput label="Tags" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} color="primary" />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {Tags.map((tag) => (
                                        <MenuItem
                                            key={tag}
                                            value={tag}

                                        >
                                            {tag}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                    <Divider />

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}

                        >
                            <ListItem>
                                <ListItemIcon>
                                    {<PriceChangeIcon />}
                                </ListItemIcon>
                                <ListItemText primary={"Cost Filter"} primaryTypographyProps={{
                                    fontWeight: '500',
                                    variant: 'h6'
                                }} />
                            </ListItem>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container xs={12} spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Min"
                                        defaultValue={""}
                                        variant="outlined"
                                        value={min}
                                        onChange={onChangeMin}
                                        type={"number"}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Max"
                                        defaultValue={""}
                                        variant="outlined"
                                        value={max}
                                        onChange={onChangeMax}
                                        type={"number"}
                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    <Divider />
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}

                        >
                            <ListItem>
                                <ListItemIcon>
                                    {<SortIcon />}
                                </ListItemIcon>
                                <ListItemText primary={"Sort"} primaryTypographyProps={{
                                    fontWeight: '500',
                                    variant: 'h6'
                                }} />
                            </ListItem>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl>
                                <FormControlLabel
                                    label="Price"
                                    control={<Checkbox onChange={priceCheckChange} checked={pricecheck} />}
                                />
                                <RadioGroup
                                    row
                                    value={pricesort}
                                    onChange={priceSortChange}
                                >
                                    <FormControlLabel value="Ascending" control={<Radio disabled={!pricecheck} />} label="Ascending" />
                                    <FormControlLabel value="Descending" control={<Radio disabled={!pricecheck} />} label="Descending" />
                                </RadioGroup>
                                <Divider />
                                <FormControlLabel
                                    label="ItemName"
                                    control={<Checkbox onChange={nameCheckChange} checked={namecheck} />}
                                />

                                <RadioGroup
                                    row
                                    value={namesort}
                                    onChange={nameSortChange}
                                >
                                    <FormControlLabel value="Ascending" control={<Radio disabled={!namecheck} />} label="Ascending" />
                                    <FormControlLabel value="Descending" control={<Radio disabled={!namecheck} />} label="Descending" />
                                </RadioGroup>

                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                    <Divider />

                </Box>


            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
            >
                <Grid container item xs={12} align={"center"} paddingBottom={4}>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" size="large" color='warning' endIcon={<FilterAltIcon />} onClick={() => { filter(null); }}>
                            Apply Filters
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h4" color="text.secondary">
                            {wallet}

                            <IconButton color={"secondary"} size='large' onClick={handleMoneyOpen}>
                                <AddCardOutlinedIcon fontSize='inherit' />
                            </IconButton>
                        </Typography>
                    </Grid>

                </Grid>

                <Dialog open={addonopen} onClose={handleAddonClose} fullWidth>
                    <DialogTitle>Addons</DialogTitle>
                    <DialogContent>
                        {alladdons.map((addon, ind) => (
                            <Grid container spacing={2} paddingTop={2} sm>
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
                                    <ToggleButton
                                        selected={selectedstates[ind]}
                                        color='success'
                                        size='small'
                                        onChange={() => {
                                            if (!selectedstates[ind]) {
                                                setfinalCost((totalcost + addon.price) * sliderval);
                                                settotalCost(totalcost + addon.price);
                                            }
                                            else {
                                                setfinalCost((totalcost - addon.price) * sliderval);
                                                settotalCost(totalcost - addon.price);
                                            }
                                            setSelected(ind);
                                        }}
                                    >
                                        <CheckIcon />
                                    </ToggleButton>
                                </Grid>


                            </Grid>
                        ))}
                        <Box marginTop={3} padding={2}>
                            <Typography variant='subtitle1'>
                                Quantity
                            </Typography>
                            <Slider
                                defaultValue={1}
                                getAriaValueText={valuetext}
                                step={1}
                                valueLabelDisplay="auto"
                                marks={marks}
                                min={1}
                                max={10}
                                value={sliderval}
                                onChange={onChangeSliderVal}
                            />
                        </Box>
                        <Typography align='center' marginTop={3} variant='h6'>
                            Total Cost - {finalcost}
                        </Typography>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { placeOrder(); setallSelectedfalse(); handleAddonClose(); }} autoFocus> Order</Button>
                        <Button onClick={handleAddonClose}>
                            Exit
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar open={snackval} autoHideDuration={2000} onClose={snackClose}>
                    <Alert onClose={snackClose} severity="success" sx={{ width: "100%" }}>
                        Order Placed
                    </Alert>
                </Snackbar>

                <Snackbar open={snackerrval} autoHideDuration={2000} onClose={snackerrClose}>
                    <Alert onClose={snackerrClose} severity="error" sx={{ width: "100%" }}>
                        Insufficient Money
                    </Alert>
                </Snackbar>

                <Dialog open={moneyadd} onClose={handleMoneyClose}>
                    <DialogTitle>Add money</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Money"
                            variant="standard"
                            value={moneytowallet}
                            size='large'
                            fullWidth
                            type={"number"}
                            onChange={(event) => {setMoneytoWallet(event.target.value);console.log(moneytowallet)}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { addWalletMoney(moneytowallet); handleMoneyClose(); }} autoFocus> Add </Button>
                        <Button onClick={handleMoneyClose}>
                            Exit
                        </Button>
                    </DialogActions>
                </Dialog>


                <Grid xs={12} container>
                    {added.map((item, ind) => (
                        <Grid container item xs={6} spacing={2} padding={2}>
                            <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1 }} elevation={5}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <ButtonBase sx={{ width: 128, height: 128 }}>
                                            <Img alt="complex" src={require('./Food.png')} />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="h4" component="div">
                                                    {item.itemname}{iconColor(item.type)}
                                                </Typography>
                                                <Stack direction="row">
                                                    {hottag(item.hot)}
                                                    {coldtag(item.cold)}
                                                    {sweettag(item.sweet)}
                                                    {drinktag(item.drink)}
                                                    {snacktag(item.snack)}
                                                </Stack>
                                                <Typography variant="body2" color="text.secondary" marginTop={1}>
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
                                        <Grid xs={12} container item>
                                            <Grid item xs={6}>
                                                <Typography variant="body2" color="text.secondary" >
                                                    Vendor - {item.name}
                                                </Typography>
                                                <Typography variant="h6" >
                                                    {item.shopname}
                                                </Typography>

                                            </Grid>
                                            <Grid container xs={6} spacing={1} marginTop={2} justifyContent="flex-end" >
                                                <Button color='info' variant='contained' disableElevation onClick={() => { setorderVend(item.vendoremail); setType(item.type); setorderItem(item.itemname); getAddons(item.itemname, item.vendoremail); handleAddonOpen(); settotalCost(item.price); setfinalCost(sliderval * item.price) }}> Order item</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                    ))}
                </Grid>

            </Box>
        </Box>
    );
}