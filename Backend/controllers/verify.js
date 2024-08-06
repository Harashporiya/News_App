const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');
require('dotenv').config();

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
};

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

const sendVerificationEmail = (email, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is ${code}`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject(error);
      } else {
        console.log('Email sent:', info.response);
        resolve(info);
      }
    });
  });
};

const sendCode = async (req, res) => {
  const { email } = req.body;

  const verificationCode = generateVerificationCode();

  try {
    const user = await prisma.verify.upsert({
      where: { email },
      update: { sendVerifyCode: verificationCode },
      create: { email, sendVerifyCode: verificationCode },
    });

    await sendVerificationEmail(email, verificationCode);

    res.status(200).json({ message: 'Verification code sent successfully', user });
  } catch (error) {
    console.error('Error sending verification code:', error);
    res.status(500).json({ error: 'An error occurred while sending the verification code' });
  }
};

const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await prisma.verify.findUnique({
      where: { email },
    });

    if (user && user.sendVerifyCode === code) {
      res.status(200).json({ message: 'Verification successful', user });
    } else {
      res.status(400).json({ message: 'Invalid verification code' });
    }
  } catch (error) {
    console.error('Error during verification:', error);
    res.status(500).json({ error: 'An error occurred during verification' });
  }
};

const getUser = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await prisma.verify.findUnique({
      where: { email },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error); 
    res.status(500).json({ error: 'An error occurred while fetching the user details' });
  }
};

module.exports = {
  sendCode,
  verifyCode,
  getUser,
};
