const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cookieToken = require("../utils/cookiesToken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    // if (!name || !email || !password || !phoneNumber) {
    //   throw new Error("Please provide all fields");
    // }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        password: hashPassword,
      },
    });

    cookieToken(user, res);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

   
//    if(user.password !== password){
//     throw new Error("password is incorrect")
//    }

    cookieToken(user, res);
    

  } catch (error) {
    console.error("Error during login:", error);
    throw new Error(error)
  }
};
