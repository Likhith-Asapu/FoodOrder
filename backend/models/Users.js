const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: Number,
		required: true
	},
	date:{
		type: Date,
		required: false
	},
	password:{
		type: String,
		required: true
	},
	usertype:{
		type: String,
		required: true
	}

});

module.exports = User = mongoose.model("Users11", UserSchema);
