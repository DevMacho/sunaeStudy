import jwt from 'jsonwebtoken';
import * as userRepository from '../controller/auth.js';
import { config } from '../config.js';


const AUTH_ERROR = {message : "유저가 로그인 되지 않거나 인증 과정에서 오류가 발생했습니다."};
const jwtSecretKey = config.jwt.jwtSecretKey;

export async function isAuth(req, res, next){
    const authHeader = req.get('Authorization');
    if(!(authHeader && authHeader.startsWith('Bearer '))){
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        jwtSecretKey,
        async (error, decoded) => {
            if(error){
                return res.status(401).json(AUTH_ERROR);
            };
            const user = await userRepository.findUserById(decoded.id);
            if(!user){
                return res.status(401).json(AUTH_ERROR);
            }
            req.id = user.id;
            next();
        }
    )
}