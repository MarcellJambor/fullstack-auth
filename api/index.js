import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./model/User.js";
import bcrypt from "bcrypt"; 

const app = express();
app.use(express.json());
app.use(cors());

const mongo_api = process.env.MONGO_URL;

mongoose.connect(mongo_api)
.then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
});


app.post("/register", async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ ...rest, password: hashedPassword });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                res.status(200).json({ message: "Success" });
            } else {
                res.status(401).json({ error: "Password Incorrect" });
            }
        } else {
            res.status(404).json({ error: "No User Found!" });
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
