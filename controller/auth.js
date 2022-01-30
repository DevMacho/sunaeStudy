'use strict';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config.js';
import { User } from '../db/model.js';


const jwtSecretKey = config.jwt.jwtSecretKey;
const jwtExpiresInDays = config.jwt.jwtExpires;
const bcryptSaltRounds = config.jwt.bcryptSaltRounds;

function generateJwtToken(newUser){
    const id = newUser.id;
    return jwt.sign({id}, jwtSecretKey, {expiresIn: jwtExpiresInDays});
};

export async function findUserById(id){
    return User.findOne({id}).then((user) => {
        return user;
    });
}

export async function signUp(req, res){
    const { id, password, studentId, name, email, schoolCard, profileIMG } = req.body;
    const foundUser = await findUserById(id);
    if(foundUser){
        res.status(409).json({message : '이미 가입된 사용자입니다.'});
        return;
    }
    const hashedPassword = await bcrypt.hash(password, bcryptSaltRounds);
    const newUser = {
        id,
        password : hashedPassword,
        studentId,
        name,
        email,
        schoolCard,
        profileIMG
    }
    const newUserModel = new User(newUser)
    newUserModel.save();
    const token = generateJwtToken(newUser);
    res.status(201).json({token, id})
}

export async function logIn(req, res){
    const {id, password, studentId} = req.body;
    const user = await findUserById(id);
    if(!user){
        res.status(401).json({message : '유효하지 않은 아이디, 비밀번호 혹은 학번입니다.'});
        return;
    }
    if(user.studentId != studentId){
        res.status(401).json({message : '유효하지 않은 아이디, 비밀번호 혹은 학번입니다.'});
        return;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword){
        res.status(401).json({message : '유효하지 않은 아이디, 비밀번호 혹은 학번입니다.'});
        return;
    }
    const token = generateJwtToken(user);
    res.status(200).json({token, id});
}

export async function me(req, res){
    const user = await findUserById(req.id);
    if(!user){
        res.status(401).json({message : '토큰이 만료되었습니다.'});
    }
    res.status(200).json({token : req.token, id: user.id})
}