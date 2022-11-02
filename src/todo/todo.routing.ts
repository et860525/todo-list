import express, { Router, Request, Response, NextFunction } from 'express';
import * as repo from '../database/sqlite';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const tasks = await repo.readRow();
  console.log(tasks);
  res.render('index', { title: 'Todo List', message: 'Hello World', tasks: tasks });
});

module.exports = router;
