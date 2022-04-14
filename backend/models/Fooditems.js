const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
	itemname: {
		type: String,
		required: true
	},
	vendoremail: {
		type: String,
		required: true,
	},
	type:{
		type: String,
		required: true
	},
	ordertimes:{
		type: Number,
		required: true
	},
	price:{
		type: Number,
		required: true
	},
	totalrating:{
		type: Number,
		required: true
	}
});

module.exports = Fooditems = mongoose.model("Fooditems", ItemSchema);
