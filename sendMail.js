const nodeMailer=require('nodemailer')
const emails=['jishnatp@gmail.com']
const dotenv=require("dotenv").config()
const pass=process.env.PASS


 const sendMail=async (emails,otp)=>{
  const transporter=  nodeMailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:'jishnatp@gmail.com',
            pass:`${pass}`
        }
    });
   const info= await transporter.sendMail({
    from:'"Nodemailer"<jishnatp@gmail.com>',
    to:emails,
    subject:'testingg',
    html:`<h2>${otp}</h2>`,

   })
  
}
module.exports=sendMail