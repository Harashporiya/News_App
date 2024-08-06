const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
const verifyRouter = require("./routes/verify")
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use(cookieParser());

// Routes
app.use('/user', userRouter);
app.use("/", verifyRouter)

app.get('/', (req, res) => {
    res.send("Harash");
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


app.listen(PORT, () => {
    console.log(`Server Started At PORT: ${PORT}`);
});
