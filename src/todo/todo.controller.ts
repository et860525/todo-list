import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import * as repo from '../database/sqlite';

export async function getTasks(req: Request, res: Response) {
  const tasks = await repo.readRow();
  console.log(tasks);
  res.render('index', { title: 'Todo List', tasks: tasks });
}

export async function createTask(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    const tasks = await repo.readRow();
    res.render('index', { title: 'Todo List', tasks: tasks, errors: errors.array() });
  } else {
    const name = req.body.task_name;
    const body = req.body.task_body;
    console.log(name, body);

    const task = await repo.insertRow(name, body);
    console.log(task);
    res.redirect('/');
  }
}
