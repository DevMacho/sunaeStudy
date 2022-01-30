'use strict';

import express from "express";
import { isAuth } from "../middleware/auth";
import * as profileController from '../controller/profile.js'

const router = express.Router();

router.get('/profile', isAuth, profileController.viewProfile);
router.put('/editId', isAuth, profileController.editId);
router.put('/editStudentId', isAuth, profileController.editStudentId);
router.put('/editPassword', isAuth, profileController.editPassword);
router.put('/editProfileImg', isAuth, profileController.editProfileImg);

export default router;