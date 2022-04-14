const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
	buyeremail: {
		type: String,
		required: true,
	},
	money:{
		type: Number,
		required: true
	}
	
});

module.exports = Wallet = mongoose.model("Buyerwallet", ItemSchema);
