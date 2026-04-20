const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(() => console.log("DBCON")).catch(err => console.log(err))

const productRoutes = require("./routes/productRoutes")
app.use("/products", productRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server on ${PORT}`))