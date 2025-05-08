import Task from '#models/task'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import { TaskStatus } from '../../app/enums/TaskStatus.js'

export default class TaskSeeder extends BaseSeeder {
  async run() {
    await Task.createMany([
      {
        id: 1,
        title: "Tarefa 1",
        description: "Descrição da Tarefa 1 do usuario de id: 1",
        status: TaskStatus.PENDING,
        userId: 1,
        createdAt: DateTime.now()
      },
      {
        id: 2,
        title: "Tarefa 2",
        description: "Descrição da Tarefa 2 do usuario de id: 1",
        status: TaskStatus.COMPLETED,
        userId: 1,
        createdAt: DateTime.now()
      },
      {
        id: 3,
        title: "Tarefa 3",
        description: "Descrição da Tarefa 3 do usuario de id: 1",
        userId: 1,
        createdAt: DateTime.now()
      },
      {
        id: 4,
        title: "Tarefa 4",
        description: "Descrição da Tarefa 4 do usuario de id: 2",
        status: TaskStatus.PENDING,
        userId: 2,
        createdAt: DateTime.now()
      },
      {
        id: 5,
        title: "Tarefa 5",
        description: "Descrição da Tarefa 5 do usuario de id: 2",
        status: TaskStatus.COMPLETED,
        userId: 2,
        createdAt: DateTime.now()
      }
    ]);
  }
}