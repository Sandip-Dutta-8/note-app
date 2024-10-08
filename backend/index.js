import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { authenticateToken } from './utilities.js'
import User from './models/user.model.js';
import Note from './models/note.model.js';

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

//create account
app.post("/create-account", async (req, res) => {
    const {fullName, email, password } = req.body;

    if(!fullName) return res.status(400).json({error: true, message: "Full name is required"})

    if(!email) return res.status(400).json({error: true, message: "Email is required"})

    if(!password) return res.status(400).json({error: true, message: "Password is required"})

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

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3600m"
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration successful"
    })
})

//login
app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    if(!email) return res.status(400).json({error: true, message: "Email is required"})

    if(!password) return res.status(400).json({error: true, message: "Password is required"})

    const userInfo = await User.findOne({email: email});

    if(!userInfo){
        return res.status(400).json({error: true, message:"User is not exists"})
    }

    if(userInfo.email == email && userInfo.password == password ){
        const user = { user: userInfo };
        
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "3600m"
        });


        return res.json({
            error: false,
            accessToken,
            message: "login successful"
        })
    }else{
        return res.status(403).json({
            error: true,
            message: "Invalid Credentials"
        })
    }
})

//add note
app.post("/add-note", authenticateToken, async (req, res) => {
    // Check if req.user is set
    if (!req.user) {
        return res.status(401).json({ error: true, message: "Unauthorized, user not found" });
    }

    const { title, content, tags } = req.body;
    const { user } = req.user;  // Directly assign req.user to user

    if (!user._id) {
        return res.status(400).json({ error: true, message: "User ID not found in token" });
    }

    if (!title) return res.status(400).json({ error: true, message: "Title required" });
    if (!content) return res.status(400).json({ error: true, message: "Content required" });

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id  // Now user._id should be accessible
        });

        await note.save();
        return res.json({ error: false, note, message: "Note added successfully" });

    } catch (error) {
        console.error("Error saving note:", error); // Log the error for debugging
        return res.status(401).json({ error: true, message: "Internal server error" });
    }
});

//edit note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteID = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if(!title && !content && !tags){
        return res.status(400).json({error: true, message: "no changes provided"});
    }

    try {
        const note = await Note.findOne({_id: noteID, userId: user._id})

        if(!note) return res.status(404).json({error: true, message: "Note not found"})

        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;

        await note.save();

        return res.status(200).json({
            error: false,
            note,
            message: "Note edited successfully"
        })
        
    } catch (error) {
        return res.status(400).json({error: true, message: "Internal server error"})
    }

})

//get all note
app.get("/get-all-notes", authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        const allNote = await Note.find({userId: user._id}).sort({isPinned: -1})

        return res.status(200).json({ error: false, allNote, message: "Note fetch successfully"})
    } catch (error) {
        return res.status(400).json({error: true, message: "internal server error"})
    }
})

//delete note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteID = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({_id: noteID, userId: user._id});

        if(!note) return res.status(404).json({error: true, message: "Note not found"});

        await Note.deleteOne({_id: noteID, userId: user._id });

        return res.status(200).json({error: false, message: "note delete successfully"})

    } catch (error) {
        return res.status(400).json({error: true, message: "Internal server error"})
    }
})

//update isPinned value
app.put("/update-note-pinned/:noteId", authenticateToken, async(req, res) => {
    const noteID = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({_id: noteID, userId: user._id})

        if(!note) return res.status(404).json({error: true, message: "Note not found"})

        note.isPinned = isPinned;

        await note.save();

        return res.status(200).json({
            error: false,
            note,
            message: "Note edited successfully"
        })
        
    } catch (error) {
        return res.status(400).json({error: true, message: "Internal server error"})
    }
})

//get user
app.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user;

    const userInfo = await User.findOne({_id: user._id});

    if(!userInfo) return res.sendStatus(401);

    return res.status(200).json({
        error: false,
        user: {
            fullName: userInfo.fullName,
            email: userInfo.email,
            _id: userInfo._id,
            createdOn: userInfo.createdOn
        },
        message: "user fetch successfully"
    })
})

//Search Notes
app.get("/search-notes/", authenticateToken, async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;

    if(!query) return res.status(400).json({error: true, message: "Search query is empty"})
    
    try {
        const matchingNote = await Note.find({
            userId: user._id,
            $or: [
                { title: {$regex: new RegExp(query, "i")}},
                { content: {$regex: new RegExp(query, "i")}}
            ]
        })

        return res.status(200).json({error: false, matchingNote, message: "Search successful"})

    } catch (error) {
        return res.status(400).json({error: true, message: "internal server error"})
    }
})

app.listen(8000, () => {
    console.log('server running on port 8000!');
})

export default app;