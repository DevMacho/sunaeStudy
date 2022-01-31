'use strict';

import bcrypt from 'bcrypt';
import { config } from '../config.js';
import { findUserById } from './auth.js';
import { User } from '../db/model.js';

export async function viewProfile(req, res){
    const { id } = req.body;
    const user = await findUserById(id);
    if(!user){
        return res.status(404).json({message : "유저를 찾을 수 없습니다."})
    }
    const returningProfile = {
        id : user.id,
        studentId : user.studentId,
        name : user.name,
        email : user.email,
        profileImg : user.profileIMG
    }
    res.status(200).json(returningProfile)
}

export async function editId(req, res){
    const { id, newId } = req.body;
    User.findOne({id})
    .then((user) => {
        user.id = newId;
        user.save();
        res.status(200).json({message : "성공적으로 아이디를 교체했습니다!"});
    })
}

export async function editStudentId(req, res){
    const { id, newStudentId } = req.body;
    User.findOne({id})
    .then((user) => {
        user.studentId = newStudentId;
        user.save();
        res.status(200).json({message : "성공적으로 학번을 교체했습니다!"});
    })
}

export async function editProfileImg(req, res){
    const { id, newProfileImg } = req.body;
    User.findOne({id})
    .then((user) => {
        user.profileIMG = newProfileImg;
        user.save();
        res.status(200).json({message : "성공적으로 학번을 교체했습니다!"});
    })
}