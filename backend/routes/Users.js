var express = require("express");
var router = express.Router();

// Load User model
const Buyer = require("../models/Buyers");
const Vendor = require("../models/Vendors");
const Fooditem = require("../models/Fooditems");
const Foodtag = require("../models/Foodtags");
const Addon = require("../models/Addons");
const Foodtags = require("../models/Foodtags");
const BuyerWallet = require("../models/Buyerwallet");
const BuyerOrders = require("../models/Orders");
// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Vendor.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/filtershops", function (req, res) {
    const shoplist = req.body.shoplist;

    Vendor.find({ $or: shoplist }).then(shops => {
        // Check if user email exists
        res.status(200).json(shops);
        return shops;

    });
});


router.post("/findfooditems", function (req, res) {
    const vendoremail = req.body.vendoremail;

    Fooditem.find({ "vendoremail": vendoremail }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200).json(user);
            return user;
        }
    });
});

router.post("/getbuyerwallet", function (req, res) {
    const buyeremail = req.body.buyeremail;

    BuyerWallet.findOne({ "buyeremail": buyeremail }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200).json(user);
            return user;
        }
    });
});


router.post("/findtags", function (req, res) {
    const vendoremail = req.body.vendoremail;
    const itemname = req.body.itemname;

    Foodtag.findOne({ "vendoremail": vendoremail, "itemname": itemname }).then(tag => {
        // Check if user email exists
        if (!tag) {
            return res.status(404).json({
                error: "Tags not found",
            });
        }
        else {
            res.status(200).json(tag);
            return tag;
        }
    });
});


// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/registerbuyer", (req, res) => {
    const newUser = new Buyer({
        name: req.body.name,
        email: req.body.email,
        date: req.body.date,
        password: req.body.password,
        contactnum: req.body.contactnum,
        age: req.body.age,
        batch: req.body.batch

    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/buyerwallet", (req, res) => {
    const newUser = new BuyerWallet({
        buyeremail: req.body.buyeremail,
        money: 1000
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
            return user;
        })
        .catch(err => {
            res.status(400).send(err);
        });
});


router.post("/registervendor", (req, res) => {
    const newUser = new Vendor({
        name: req.body.name,
        email: req.body.email,
        date: req.body.date,
        password: req.body.password,
        contactnum: req.body.contactnum,
        shopname: req.body.shopname,
        opentime: req.body.opentime,
        endtime: req.body.endtime,

    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});


router.post("/placeorder", (req, res) => {
    const newUser = new BuyerOrders({
        itemname: req.body.itemname,
        vendoremail: req.body.vendoremail,
        buyeremail: req.body.buyeremail,
        time: req.body.time,
        cost: req.body.cost,
        rating: req.body.rating,
        status: req.body.status,
        quantity: req.body.quantity,
        addons: req.body.addons,
        type: req.body.type
    });
    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login

router.post("/loginvendor", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Vendor.findOne({ "email": email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            if (password == user.password) {
                res.status(200).json(user);
            }
            else {
                return res.status(404).json({
                    error: "Email not found",
                });
            }
            return user;
        }
    });
});


router.post("/loginbuyer", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Buyer.findOne({ "email": email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            if (password == user.password) {
                res.status(200).json(user);
            } else {
                return res.status(404).json({
                    error: "Email not found",
                });
            }
            return user;
        }
    });
});

router.post("/findvendor", (req, res) => {
    const email = req.body.email;

    Vendor.findOne({ "email": email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200).json(user);
            return user;
        }
    });
});

router.post("/findbuyer", (req, res) => {
    const email = req.body.email;

    Buyer.findOne({ "email": email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200).json(user);
            return user;
        }
    });
});

router.post("/updatevendorname", (req, res) => {
    const email = req.body.email;
    const name = req.body.name;

    Vendor.findOneAndUpdate({ "email": email }, { $set: { "name": name } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200);
        }
    });
});

router.post("/updatewallet", (req, res) => {
    const buyeremail = req.body.buyeremail;
    const money = req.body.money;

    BuyerWallet.findOneAndUpdate({ "buyeremail": buyeremail }, { $set: { "money": money } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200);
        }
    });
});


router.post("/updatebuyername", (req, res) => {
    const email = req.body.email;
    const name = req.body.name;

    Buyer.findOneAndUpdate({ "email": email }, { $set: { "name": name } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200);
        }
    });
});


router.post("/updatevendorshopname", (req, res) => {
    const email = req.body.email;
    const shopname = req.body.shopname;

    Vendor.findOneAndUpdate({ "email": email }, { $set: { "shopname": shopname } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200);
        }
    });
});

router.post("/updatevendorcontact", (req, res) => {
    const email = req.body.email;
    const contactnum = req.body.contactnum;

    Vendor.findOneAndUpdate({ "email": email }, { $set: { "contactnum": contactnum } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200);
        }
    });
});

router.post("/updatevendorendtime", (req, res) => {
    const email = req.body.email;
    const endtime = req.body.endtime;

    Vendor.findOneAndUpdate({ "email": email }, { $set: { "endtime": endtime } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200);
        }
    });
});

router.post("/updatevendoropentime", (req, res) => {
    const email = req.body.email;
    const opentime = req.body.opentime;

    Vendor.findOneAndUpdate({ "email": email }, { $set: { "opentime": opentime } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200);
        }
    });
});


router.post("/updatebuyercontact", (req, res) => {
    const email = req.body.email;
    const contactnum = req.body.contactnum;

    Buyer.findOneAndUpdate({ "email": email }, { $set: { "contactnum": contactnum } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200);
        }
    });
});

router.post("/updatebuyerage", (req, res) => {
    const email = req.body.email;
    const age = req.body.age;

    Buyer.findOneAndUpdate({ "email": email }, { $set: { "age": age } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200);
        }
    });
});

router.post("/updatebuyerbatch", (req, res) => {
    const email = req.body.email;
    const batch = req.body.batch;

    Buyer.findOneAndUpdate({ "email": email }, { $set: { "batch": batch } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200);
        }
    });
});




router.post("/additem", (req, res) => {
    const newItem = new Fooditem({
        itemname: req.body.itemname,
        vendoremail: req.body.vendoremail,
        type: req.body.type,
        ordertimes: req.body.ordertimes,
        price: req.body.price,
        totalrating: req.body.totalrating,
    });

    newItem.save()
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/addaddon", (req, res) => {
    const newAddon = new Addon({
        itemname: req.body.itemname,
        vendoremail: req.body.vendoremail,
        addonname: req.body.addonname,
        price: req.body.price,
    });

    newAddon.save()
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/addtag", (req, res) => {
    const newTag = new Foodtag({
        itemname: req.body.itemname,
        vendoremail: req.body.vendoremail,
        drink: req.body.drink,
        hot: req.body.hot,
        cold: req.body.cold,
        snack: req.body.snack,
        sweet: req.body.sweet
    });

    newTag.save()
        .then(tag => {
            res.status(200).json(tag);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/deleteitems", (req, res) => {

    itemname = req.body.itemname;
    vendoremail = req.body.vendoremail;

    Foodtag.findOneAndDelete({ "itemname": itemname, "vendoremail": vendoremail }, (err, doc) => {
        if (err) {
            console.log(err);
            return res.status(404).json({
                error: "Tag deletion unsuccessful",
            });
        }
        else {
            res.status(200);
            console.log("done2")
        }
    });


    Addon.deleteMany({ "itemname": itemname, "vendoremail": vendoremail }, (err, doc) => {
        if (err) {
            console.log(err);
            return res.status(404).json({
                error: "Addon deletion unsuccessful",
            });
        }
        else {
            res.status(200);
            console.log("done1")
        }
    });

    Fooditem.findOneAndDelete({ "itemname": itemname, "vendoremail": vendoremail }, (err, doc) => {
        if (err) {
            console.log(err);
            return res.status(404).json({
                error: "Item deletion unsuccessful",
            });
        }
        else {
            res.status(200);
            console.log("done2")
        }
    });
});


router.post("/deleteaddon", (req, res) => {

    itemname = req.body.itemname;
    vendoremail = req.body.vendoremail;
    addonname = req.body.addonname,

        Addon.findOneAndDelete({ "itemname": itemname, "vendoremail": vendoremail, "addonname": addonname }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(404).json({
                    error: "Email not found",
                });
            }
            else {
                res.status(200);
            }
        });
});


router.post("/findaddons", function (req, res) {
    const vendoremail = req.body.vendoremail;
    const itemname = req.body.itemname;

    Addon.find({ "vendoremail": vendoremail, "itemname": itemname }).then(addon => {
        // Check if user email exists
        res.status(200).json(addon);
        return addon;

    });
});

router.post("/updateitemprice", (req, res) => {
    const vendoremail = req.body.vendoremail;
    const itemname = req.body.itemname;
    const price = req.body.price;
    Fooditem.findOneAndUpdate({ "vendoremail": vendoremail, "itemname": itemname }, { $set: { "price": price } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.status(200);
        }
    });
});


router.get("/findallfooditems", function (req, res) {

    Fooditem.find().then(item => {
        // Check if user email exists
        res.status(200).json(item);
        return item;

    });
});

router.post("/findallitems", function (req, res) {

    const time = req.body.time;

    Fooditem.find({ "starttime": { $lte: time}, "endtime": {$gte: time }} ).then(item => {
        // Check if user email exists
        res.status(200).json(item);
        return item;

    });
});


router.get("/findalltags", function (req, res) {

    Foodtag.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});


router.post("/finditemstype", function (req, res) {
    const type = req.body.type;

    Fooditem.find({ "type": type }).then(item => {
        // Check if user email exists
        res.status(200).json(item);
        return item;

    });
});

router.post("/filtertags", function (req, res) {
    const taglist = req.body.taglist;
    const itemname = req.body.itemname;

    if (itemname != null) {
        Foodtags.find({ "itemname": itemname, $or: taglist }).collation({ locale: 'en', strength: 2 }).then(items => {
            // Check if user email exists
            res.status(200).json(items);
            return items;

        });
    }
    else {
        Foodtags.find({ $or: taglist }).then(items => {
            // Check if user email exists
            res.status(200).json(items);
            return items;
        });
    }


});

router.post("/finditemscost", function (req, res) {
    const type = req.body.type;
    const min = req.body.min;
    const max = req.body.max;
    const sortitem = req.body.sortitem;
    const sortname = req.body.sortname;
    Fooditem.find({ $or: type, "price": { $gte: min, $lte: max } }).sort({ "price": sortitem, "itemname": sortname }).then(item => {
        // Check if user email exists
        res.status(200).json(item);
        return item;

    });
});

router.post("/sortname", function (req, res) {
    const type = req.body.type;
    const min = req.body.min;
    const max = req.body.max;
    const sortname = req.body.sortname;
    Fooditem.find({ $or: type, "price": { $gte: min, $lte: max } }).sort({ "itemname": sortname }).then(item => {
        // Check if user email exists
        res.status(200).json(item);
        return item;

    });
});

router.post("/sortcost", function (req, res) {
    const type = req.body.type;
    const min = req.body.min;
    const max = req.body.max;
    const sortitem = req.body.sortitem;
    Fooditem.find({ $or: type, "price": { $gte: min, $lte: max } }).sort({ "price": sortitem }).then(item => {
        // Check if user email exists
        res.status(200).json(item);
        return item;

    });
});

router.post("/typefiltersort", function (req, res) {
    const type = req.body.type;
    const min = req.body.min;
    const max = req.body.max;
    Fooditem.find({ $or: type, "price": { $gte: min, $lte: max } }).then(item => {
        // Check if user email exists
        res.status(200).json(item);
        return item;

    });
});


/*
router.post("/pricefilter", function (req, res) {
    const min = req.body.min;
    const max = req.body.max;
    Fooditem.find({ "price":{ $gte:min , $lte:max } }).sort( { "price" : 1}).then(item => {
        // Check if user email exists
        res.status(200).json(item);
        return item;

    });
});
*/

router.post("/findbyname", function (req, res) {
    const itemname = req.body.itemname;

    Fooditem.find({ "itemname": itemname }).then(item => {
        // Check if user email exists
        res.status(200).json(item);
        return item;

    });
});


router.post("/findorders", function (req, res) {
    const vendoremail = req.body.vendoremail;
    const status = req.body.status;

    BuyerOrders.find({ "vendoremail": vendoremail, "status": status }).then(item => {
        // Check if user email exists
        res.status(200).json(item);
        return item;

    });
});

router.post("/findordersbuyers", function (req, res) {
    const buyeremail = req.body.buyeremail;
    const statuslist = req.body.statuslist;

    BuyerOrders.find({ "buyeremail": buyeremail, $or: statuslist }).then(item => {

        res.status(200).json(item);
        return item;

    });
});


router.post("/findbuyerorder", function (req, res) {
    const vendoremail = req.body.vendoremail;
    const status = req.body.status;
    const buyeremail = req.body.buyeremail;
    const time = req.body.time;

    BuyerOrders.findOneAndUpdate({ "vendoremail": vendoremail, "buyeremail": buyeremail, "time": time }, { $set: { "status": status } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
            return res.status(404).json({
                error: "Updating error",
            });
        }
        else {
            res.status(200);
        }
    });
});

router.post("/ratebuyerorder", function (req, res) {
    const vendoremail = req.body.vendoremail;
    const rating = req.body.rating;
    const buyeremail = req.body.buyeremail;
    const time = req.body.time;

    BuyerOrders.findOneAndUpdate({ "vendoremail": vendoremail, "buyeremail": buyeremail, "time": time }, { $set: { "rating": rating } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
            return res.status(404).json({
                error: "Updating error",
            });
        }
        else {
            res.status(200);
        }
    });
});


router.post("/finditemdetails", function (req, res) {
    const vendoremail = req.body.vendoremail;
    const itemname = req.body.itemname;
    const rating = req.body.rating;

    Fooditem.findOneAndUpdate({ "vendoremail": vendoremail, "itemname": itemname }, { $inc: { "ordertimes": 1, "totalrating": rating } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
            return res.status(404).json({
                error: "Updating error",
            });
        }
        else {
            res.status(200);
        }
    });

});

router.post("/updaterating", function (req, res) {
    const vendoremail = req.body.vendoremail;
    const itemname = req.body.itemname;
    const ordertimes = req.body.ordertimes;
    const totalrating = req.body.totalrating;

    Fooditem.findOneAndUpdate({ "vendoremail": vendoremail, "itemname": itemname }, { $set: { "ordertimes": ordertimes, "totalrating": totalrating } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
            return res.status(404).json({
                error: "Updating error",
            });
        }
        else {
            res.status(200);
        }
    });
});


module.exports = router;

