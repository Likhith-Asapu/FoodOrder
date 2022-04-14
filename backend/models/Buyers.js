const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	date:{
		type: Date,
		required: false
	},
	password:{
		type: String,
		required: true
	},
	contactnum:{
		type: Number,
		required: true
	},
	age:{
		type: Number,
		required: true
	},
	batch:{
		type: String,
		required: true
	}

});

module.exports = User = mongoose.model("Buyers", UserSchema);
