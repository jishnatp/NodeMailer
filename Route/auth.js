const express = require('express')
const mongoose=require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../Model/users')


const router = express.Router()
const sendMail = require('../nodeMailer/sendMail')


//User registration
router.post('/register',async(req,res)=>{
    try{
        //console.log(User);
        const {name,pass,mail} = req.body
        // console.log(req.body);
        const hashedPassword = await bcrypt.hash(pass,11)
        const user = new User({userName : name, password : hashedPassword , mailid:mail})
        await user.save()
        res.status(200).json({message:"Registration completed successfully"})    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"Registration failed"})
    }
})

//login
router.post('/login',async (req,res)=>{
    try {
        const {name,pass,mail} = req.body 
        const user = await User.findOne({userName : name})
        if (!user){
            return res.status(401).json({error:"Login failed"})
        }
        const passwordMatch = await bcrypt.compare(pass,user.password)
        if(!passwordMatch){
            return res.status(401).json({error:"Authentication failed"})
        }
        const token = jwt.sign({userId:user._id},"hhuhuu",{expiresIn:'1hr'})
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({error:'login failed'})
        console.log(error)
    }
})

//forgot password
router.post('/forgotpassword', async (req,res)=>{
    try {
        const {name} = req.body  
        const user =await User.findOne({userName:name})
        // console.log(user)
        if (!user){
            return res.status(401).json({error:'user not found'})
        }
        const otp = Math.floor(Math.random() * 100000);
        // console.log(otp);
        const updateOtp =await User.findByIdAndUpdate(user._id,{otp:otp},{new:true})
        if (updateOtp) {
            sendMail(user.mailid, otp);
            // console.log(user.mailid);
            res.status(200).json({ message: "OTP sent to mail" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed" });
    }
})
     

module.exports=router