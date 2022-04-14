const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AddonSchema = new Schema({
	itemname: {
		type: String,
		required: true
	},
	vendoremail: {
		type: String,
		required: true,
	},
	addonname:{
		type: String,
		required: true
	},
	price:{
		type: Number,
		required: true
	}
});

module.exports = Addons = mongoose.model("Addons", AddonSchema);
