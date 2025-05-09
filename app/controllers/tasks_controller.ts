import TasksService from '#services/task_service_impl';
import { createTaskValidator } from '#validators/task';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TasksController {
  constructor(protected tasksService: TasksService){}
  
  async indexAll({}: HttpContext){
    try {
      const tasks = await this.tasksService.getAllTasks();

      return {
        status: 'sucesso',
        message: 'Tarefas listadas com sucesso',
        data: tasks
      };

    } catch(error) {
      console.error('Erro ao buscar todas as tarefas de todos os usuários', error.message);
      throw error;
    }
  }

  /**
   * Display a list of resource
   */
  async index({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail();
      const tasks = await this.tasksService.getAllTasks(user);

      return response.ok({
        status: 'sucesso',
        message: 'Tarefas listadas com sucesso',
        data: tasks
      });

    } catch(error){
      console.error('Erro ao buscar tarefas do usuário', error.message);
      throw error;
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail();
      
      const { title, description, status } = await createTaskValidator.validate(request.all());
      
      const task = await this.tasksService.createTask({title, description, status}, user);
      
      return response.created({
        status: 'sucesso',
        message: 'Tarefa criada com sucesso',
        data: task
      });
    } catch (error) {
      console.error('Erro ao criar tarefa', error.message);
      throw error;
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    try {
      const task = await this.tasksService.getTaskById(params.id);

      return {
        status: 'sucesso',
        data: task
      };

    } catch(error) {
      console.error('Erro ao buscar tarefa', error.message);
      throw error;
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request, params, auth, response }: HttpContext) {
    try{
      const user = auth.getUserOrFail();
      const { title, description, status } = await createTaskValidator.validate(request.all());

      const task = await this.tasksService.updateTask({id: params.id, title, description, status, userId: user.id}, user);
      return response.ok({
        status: 'sucesso',
        message: 'Tarefa atualizada com sucesso',
        data: task
      });

    }catch(error){
      console.error('Erro ao atualizar tarefa', error.message);
      throw error;
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, auth }: HttpContext) {
    try {
      const user = auth.getUserOrFail();
      await this.tasksService.deleteTask(params.id, user);

      return {
        status: 'sucesso',
        message: 'Tarefa deletada com sucesso'
      };

    } catch(error) {
      console.error('Erro ao deletar tarefa', error.message);
      throw error;
    }
  }
}