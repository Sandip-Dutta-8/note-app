import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { authenticateToken } from './utilities.js'
import User from './models/user.model.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("database connected");
}).catch((err) => {
    console.log(err)
})

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.json({ data: "hello" });
})

//create account
app.post("/create-account", async (req, res) => {
    const {fullName, email, password } = req.body;

    if(!fullName) return res.status(400).json({error: true, message: "Full name is required"})

    if(!email) return res.status(400).json({error: true, message: "Email is required"})

    if(!password) return res.status(400).json({error: true, message: "Password name is required"})

    const isUser = await User.findOne({email: email});

    if(isUser){
        return res.status(400).json({error: true, message:"User is already exists"})
    }

    const user = new User({
        fullName,
        email,
        password
    })

    await user.save();

    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3600m"
    })

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration successful"
    })
})


app.listen(8000, () => {
    console.log('server running on port 8000!');
})

export default app;