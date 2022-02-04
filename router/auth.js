'use strict';

import express from "express";
import { body } from "express-validator";
import * as authController from '../controller/auth.js';
import {isAuth} from '../middleware/auth.js';
import {validate} from '../middleware/validator.js';

const router = express.Router();
const validateLogIn = [
    body('id').trim().isLength({ min: 4, max: 16}).withMessage('아이디는 4글자 ~ 16글자여야 합니다.'),
    body('password').trim().isLength({ min: 8, max: 24 }).withMessage('비밀번호는 8글자 ~ 24글자여야 합니다.'),
    body('studentId').trim().notEmpty().withMessage('학번을 작성해야 합니다.'),
    validate
]

const validateSignUp = [
    ...validateLogIn,
    body('schoolCard').trim().notEmpty().withMessage('학생증을 첨부해야 합니다.'),
    body('name').trim().notEmpty().withMessage('이름을 작성해야 합니다.'),
    body('profileIMG').isURL().withMessage('유효하지 않은 이미지입니다.').optional({ nullable : true, checkFalsy : true}),
    validate
]

router.post('/signup', validateSignUp, authController.signUp);
router.post('/login', validateLogIn, authController.logIn);
router.post('/me', isAuth, authController.me);

export default router;