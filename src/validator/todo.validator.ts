import { check } from 'express-validator';

export const createTodo = [
  check('task_name', 'Task name is required').notEmpty().trim().escape(),
  check('task_body').trim().escape(),
];
