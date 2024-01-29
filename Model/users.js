const mongoose=require("mongoose")
const userSchema=mongoose.Schema(
    {
        userName:{type:String,required:true,unique:true},
        password:{type:String,required:true},

        
        mailid:{type:String,required:true},
        otp:{type:Number}
    }
)

module.exports=mongoose.model('USER',userSchema)