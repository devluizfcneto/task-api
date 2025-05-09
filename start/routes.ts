/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// router.resource('/users', UsersController).apiOnly();

// router.get('/users', [UsersController, 'index']);
// router.post('/users', [UsersController, 'store']);
// router.get('/users/:id', [UsersController, 'show']);
// router.put('/users/:id', [UsersController, 'update']);
// router.delete('/users/:id', [UsersController, 'destroy']);

import UsersController from '#controllers/users_controller';

router.group(() => {
  router.get('/', [UsersController, 'index']);
  router.post('/', [UsersController, 'store']);
  router.get('/:id', [UsersController, 'show']);
  router.put('/:id', [UsersController, 'update']);
  router.delete('/:id', [UsersController, 'destroy']);
}).prefix('/users').prefix('/api/v1');

import AuthController from '#controllers/auth_controller';
import { middleware } from './kernel.js';

router.group(() => {
  router.post('/login', [AuthController, 'login']);
  
  router.group(() => {
    router.get('/user/tokenIsActive', [AuthController, 'me']);
    router.post('/logout', [AuthController, 'logout']);
  }).middleware(middleware.auth({ guards: ['api']}));
  
}).prefix('/auth').prefix('/api/v1');

import TasksController from '#controllers/tasks_controller';

router.group(() => {
  router.get('/all', [TasksController, 'indexAll']);

  router.group(() => {
    router.get('/', [TasksController, 'index']);
    router.post('/', [TasksController, 'store']);
    router.get('/:id', [TasksController, 'show']);
    router.put('/:id', [TasksController, 'update']);
    router.delete('/:id', [TasksController, 'destroy']);
  }).middleware(middleware.auth({ guards: ['api']}));
  
}).prefix('/tasks').prefix('/api/v1');