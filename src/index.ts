import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';

import { dbCreateConnection } from "./typeorm/dbConnection";
import { errorHandler } from './utils/errorHandler';
import routes from './routes';

dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);
app.use(errorHandler);

const port = process.env.APP_SERVER_PORT || 3000;

dbCreateConnection().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
})
