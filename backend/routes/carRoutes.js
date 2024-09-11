const {Router} = require('express')

const carRouter = Router()
const {getAllFromDatabase,addToDatabase} = require("../controllers/carController")

carRouter.get( "/" , getAllFromDatabase)

carRouter.post("/add" , addToDatabase)

module.exports = carRouter