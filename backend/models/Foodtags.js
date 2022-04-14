const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TagsSchema = new Schema({
	itemname: {
		type: String,
		required: true
	},
	vendoremail: {
		type: String,
		required: true,
	},
	drink:{
		type: Boolean,
		required: true
	},
	hot:{
		type: Boolean,
		required: true
	},
	cold:{
		type: Boolean,
		required: true
	},
	snack:{
		type: Boolean,
		required: true
	},
	sweet:{
		type: Boolean,
		required: true
	}
});

module.exports = Foodtags = mongoose.model("Tags", TagsSchema);
