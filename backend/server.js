const express = require('express')
const carRouter = require("./routes/carRoutes")
const dotenv = require('dotenv').config()
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 5000
const dbURL = process.env.DBURL

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL)
        console.log("successfully connected to DB")
    }
    catch(error) {
        console.log(error)
    }
}

app.use(express.json())
app.use("/cars/" , carRouter)


app.listen(PORT, () => {
    console.log("listening..." + PORT)
    connectDB()
})