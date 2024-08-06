const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")

const send = async(req,res)=>{
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'douglas.weimann23@ethereal.email',
        pass: 'rNah4y7PHFzkQPNuDn'
    }
});

let info = await transporter.sendMail({
    
})

}