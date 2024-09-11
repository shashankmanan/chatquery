const carModel = require("../models/carModel")

const addToDatabase = (request,response) => {
    const car = request.body
    const insertedCar = carModel.create(car)
    if(insertedCar)
        response.status(201).json({"message" : "succesfully inserted" , "car" : {car}})
}

const getAllFromDatabase = async (request,response) => {
    console.log("getting data")
    const fields = await carModel.find({})
    response.json(fields)
}

module.exports = {
    getAllFromDatabase,
    addToDatabase
}