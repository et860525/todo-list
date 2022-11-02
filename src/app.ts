import express, { Express } from 'express';
import dotenv from 'dotenv';
import { createTable } from './database/sqlite';

const cookieParser = require('cookie-parser');
const logger = require('morgan');

dotenv.config();

const app: Express = express();
const env = process.env.NODE_ENV;
const port = process.env.PORT;

createTable();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.set('view engine', 'pug');

const todoRouter = require('./todo/todo.routing');
app.use('/', todoRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port} in ${env}`);
});
