require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const { default: mongoose } = require("mongoose")
const PORT = process.env.PORT || 6002
const app = express()
connectDB()

app.use(cors(corsOptions))
app.use(express.static("public"))
app.use(express.json())

////
app.get("/", (req,res)=>{
    res.send("home")
})

app.use("/api/prod", require("./routes/prodRoute"))
app.use("/api/user", require("./routes/userRoute"))
app.use("/api/bag", require("./routes/BagRoute"))
////

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB 🍺🥤');
app.listen(PORT,()=>{console.log(`server run on ${PORT}`);})
})

mongoose.connection.on('error',err =>{console.log(err);})


// npm i bcrypt
// npm i jsonwebtoken

