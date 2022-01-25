import mongoose from 'mongoose';
import {config} from '../config.js';

const userConnection= mongoose.createConnection(`mongodb+srv://leesngjoo:${config.db.dbPassword}@cluster0.lpsei.mongodb.net/cluster0?retryWrites=true&w=majority`);

const userSchema = new mongoose.Schema({
    id: String,
    password: String,
    studentId: Number,
    name: String,
    email: String,
    schoolCard: String,
    profileIMG: String,
})

export const User = userConnection.model("User", userSchema);



const postConnection= mongoose.createConnection(`mongodb+srv://leesngjoo:${config.db.dbPassword}@cluster0.oeaqx.mongodb.net/cluster0?retryWrites=true&w=majority`);

const postSchema = new mongoose.Schema({
    id: Number,
    title: String,
    content: String,
    imageUrl: String,
    createdAt: Date,
    author: String,
    view: Number,
    heart: Number,
    heartedUser: Array
})

export const Post = postConnection.model("Post", postSchema);