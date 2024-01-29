const express=require('express')
const app=express()
const dotenv=require("dotenv").config()


const port=process.env.PORT||3000
const mongoose=require("mongoose")


const registerRoute=require("./Route/auth")

//db conn
mongoose.connect(process.env.CONNECTION_STRING,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("db connected")
})
.catch((error)=>{
    console.log(error)
})

app.use(express.json())

app.use("/auth",registerRoute)
app.listen(port,()=>{
    console.log("server is running ")
})