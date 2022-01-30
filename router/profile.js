'use strict';

import express from "express";
import { isAuth } from "../middleware/auth";
import * as profileController from '../controller/profile.js'

const router = express.Router();

router.get('/profile', isAuth, profileController);
router.put('/editId', isAuth, profileController);
router.put('/editStudentId', isAuth, profileController);
router.put('/editPassword', isAuth, profileController);
router.put('/editProfileImg', isAuth, profileController);

export default router;