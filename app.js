import express from 'express';
import config from 'config';
import testRouter from './backend/routes/test.routes.js';
import adsRouter from './backend/routes/ads.routes.js';

const app = express();

app.use(express.json({ extended: true }));

const API = '/api';

app.use(API, testRouter);
app.use(API, adsRouter);

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
