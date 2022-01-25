import express from "express";
import postRoute from './router/board.js';
import authRoute from './router/auth.js';
import { config } from "./config.js";

const app = express();
app.use(express.json());

app.use('/posts', postRoute);
app.use('/auth', authRoute);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});

app.listen(config.host.host);