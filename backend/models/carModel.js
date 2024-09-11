const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true,
        maxlength: 50
    },
    model: {
        type: String,
        required: true,
        maxlength: 50
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,  
        required: true
    },
    fuel_type: {
        type: String,
        required: true,
        maxlength: 20
    },
    transmission: {
        type: String,
        required: true,
        maxlength: 20
    },
    mileage: {
        type: Number,  
        required: true
    }
}, { timestamps: true }); 

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
