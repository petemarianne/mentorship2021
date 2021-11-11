import express from 'express';
import config from 'config';
import adsRouter from './backend/routes/ads.routes.js';
import usersRouter from './backend/routes/users.routes.js';
import authRouter from './backend/routes/auth.routes.js';

const app = express();

app.use(express.json({ extended: true }));

const API = '/api';

app.use(API, adsRouter);
app.use(API, usersRouter);
app.use(API + '/auth', authRouter);

const PORT = config.get('port') || 3000;

const start = () => {
    try {
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Server Error ', e.message());
        process.exit(1);
    }
};

start();
