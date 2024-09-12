const {Router} = require('express')

const carRouter = Router()
const {getAllFromDatabase,addToDatabase, getDataBasedOnConstraints,deleteFromDatabase} = require("../controllers/carController")

carRouter.get("/check",getDataBasedOnConstraints)

carRouter.get( "/" , getAllFromDatabase)

carRouter.post("/add" , addToDatabase)

carRouter.delete("/delete/:_id" , deleteFromDatabase)

module.exports = carRouter