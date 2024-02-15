const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodName: String,
    age: Number
});


module.exports = mongoose.model('Food', foodSchema);