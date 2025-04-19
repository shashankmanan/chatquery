const {Router} = require('express')

const carRouter = Router()
const {
    getAllFromDatabase,
    addToDatabase, 
    getDataBasedOnConstraints,
    deleteFromDatabase,
    updateFromDatabase
} = require("../controllers/carController")

carRouter.get("/check", getDataBasedOnConstraints)

carRouter.get("/", getAllFromDatabase)

carRouter.post("/add", addToDatabase)

carRouter.delete("/delete/:_id", deleteFromDatabase)

carRouter.put("/update/:_id", updateFromDatabase)

module.exports = carRouter