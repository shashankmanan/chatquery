const carModel = require("../models/carModel")

const addToDatabase = async (request,response,next) => {
    const car = request.body
    try {
        const insertedCar = await carModel.create(car)
        response.status(201).json({"message" : "succesfully inserted" , "car" : {car}})
    } catch(error) {
        next({status : error.status, message : error.message})
    }
}

const getAllFromDatabase = async (request,response,next) => {
    try {
        const fields = await carModel.find({})
        response.status(200).json(fields)
    } catch(error) {
        next({status : error.status , message : error.message})
    } 
}

const getDataBasedOnConstraints = async (request,response,next) => {
    try {
        const fields = await carModel.find(request.query)
        console.log(fields)
        response.status(200).json(fields)
    } catch(error) {
        next({status : error.status , message : error.message})
    } 
}

const deleteFromDatabase = async (request,response,next) => {
    try {
        console.log(request.params)
        const {_id} = request.params
        const deleteRecord = await carModel.deleteOne({_id})
        if (deleteRecord.deletedCount === 0) {
            return response.status(404).json({ message: "Record not found" });
        }
        response.status(200).json({"message" : "succesfully deleted"})
    } catch(error) {
        next({status : error.status , message : error.message})
    } 
}

module.exports = {
    getAllFromDatabase,
    addToDatabase , 
    getDataBasedOnConstraints,
    deleteFromDatabase
}