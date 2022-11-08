import express, { Router } from 'express';
import * as validator from '../validator/todo.validator';
import * as controller from './todo.controller';

const router: Router = express.Router();

router.route('/').get(controller.getTasks).post(validator.createTodo, controller.createTask);
router.route('/delete/:id').get(controller.deleteTask);

module.exports = router;
