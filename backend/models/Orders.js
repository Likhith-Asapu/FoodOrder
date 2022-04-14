const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
	itemname: {
		type: String,
		required: true
	},
	vendoremail: {
		type: String,
		required: true,
	},
    buyeremail: {
		type: String,
		required: true,
	},
	time:{
		type: Date,
		required: true
	},
	cost:{
		type: Number,
		required: true
	},
	rating:{
		type: Number,
        required: false
	},
	status:{
		type: String,
		required: true
	},
    quantity:{
		type: Number,
        required: true
	},
	addons: {
		type: Array,
		required: false
	},
	type: {
		type: String,
		required: true,
	}

});

module.exports = Orders = mongoose.model("Orders", OrderSchema);
