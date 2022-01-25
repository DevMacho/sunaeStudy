import express from "express";
import { body } from "express-validator";
import * as postController from '../controller/post.js';
import {validate} from '../middleware/validator.js'
import { isAuth } from "../middleware/auth.js";

const router = express.Router();
const validatePost = [
    body('content').trim().isLength({min: 3, max: 1000})
    .withMessage('내용에는 3자 ~ 1000자만 작성하실 수 있습니다.'),
    validate,
    body('title').trim().isLength({min: 1, max: 40})
    .withMessage('제목에는 1자 ~ 40자만 작성하실 수 있습니다.'),
    validate
]

router.get('/', isAuth, postController.getPosts);

router.post('/', isAuth, validatePost, postController.writePost);

router.post('/:id', isAuth, postController.giveHeartToPost);

router.post('/view/:id', isAuth, postController.viewPost);

router.put('/:id', isAuth, validatePost, postController.editPost);

router.delete('/:id', isAuth, postController.deletePost);


export default router;