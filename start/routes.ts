/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller';

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

router.group(() => {
  router.get('/', [UsersController, 'index']);
  router.post('/', [UsersController, 'store']);
  router.get('/:id', [UsersController, 'show']);
  router.put('/:id', [UsersController, 'update']);
  router.delete('/:id', [UsersController, 'destroy']);
}).prefix('/users').prefix('/api/v1');
