import dotenv from 'dotenv';
dotenv.config();

const securedKeys = process.env;

export const config = {
    jwt : {
        jwtSecretKey : securedKeys.JWT_SECRET,
        jwtExpires : Number(securedKeys.JWT_EXPIRES),
        bcryptSaltRounds : Number(securedKeys.BCRYPT_SALT_ROUNDS)
    },
    db : {
        dbPassword : securedKeys.DB_PASSWORD
    }
};