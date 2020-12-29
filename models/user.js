const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var entrySchema = require('./entry').schema;

var userSchema = new Schema({
    username: {type: String, required: true, unique: true, minlength: 5, maxlength: 15, trim: true, lowercase: true},
    password: {type: String, required: true, minlength: 8},
    firstname: {type: String, required: true, minlength: 1},
    entries:[entrySchema],
    requirements: [],
    gender: {type: String, enum: ["male", "female"], required: true},
    age: {type: String, enum: ["11-14", "15-18", "19-24", "25-50", "51+"], required: true}
});

module.exports=mongoose.model('User', userSchema, 'users'); 