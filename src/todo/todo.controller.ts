import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import * as repo from '../database/sqlite';

async function getTasks(req: Request, res: Response) {
  const tasks = await repo.readTasks();

  res.render('index', { title: 'Todo List', tasks: tasks });
}

async function createTask(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    const tasks = await repo.readTasks();
    res.render('index', {
      title: 'Todo List',
      tasks: tasks,
      errors: errors.array(),
    });
  } else {
    const name = req.body.task_name;
    const body = req.body.task_body;

    await repo.insertTask(name, body);
    res.redirect('/');
  }
}

async function deleteTask(req: Request, res: Response) {
  const id = req.params.id;

  await repo.deleteTask(id);
  res.redirect('/');
}

async function updateTaskCompleted(req: Request, res: Response) {}

export { getTasks, createTask, deleteTask, updateTaskCompleted };
