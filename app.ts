import express from 'express';
import config from 'config';
import adsRouter from './backend/routes/ads.routes';
import usersRouter from './backend/routes/users.routes';
import authRouter from './backend/routes/auth.routes';
import { JwtPayload } from 'jsonwebtoken';
import { MyOptionsJson } from "body-parser";
import path from 'path';

const app = express();

declare module 'jsonwebtoken' {
    export interface UserIDJwtPayload extends JwtPayload {
        userID: string
    }
}

declare module 'body-parser' {
    export interface MyOptionsJson extends OptionsJson {
        extended: boolean
    }
}

const options: MyOptionsJson = {
    extended: true
}

app.use(express.json(options));

const API = '/api';

app.use(API, adsRouter);
app.use(API, usersRouter);
app.use(API + '/auth', authRouter);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    });
}

const PORT = config.get('port') || 3000;

const start = () => {
    try {
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Server Error');
        process.exit(1);
    }
};

start();
