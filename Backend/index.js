const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
const verifyRouter = require("./routes/verify")
require('dotenv').config();
const cors = require("cors")
const dataRouter = require("./routes/decoded")

const app = express();
const PORT = process.env.PORT || 7002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/user', userRouter);
app.use("/", verifyRouter)
app.use("/", dataRouter)
// app.get('/harash', isLogged, (req, res) => {
//     res.json(`Harash", ${req.user.id}`);
// });



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


app.listen(PORT, () => {
    console.log(`Server Started At PORT: ${PORT}`);
});
