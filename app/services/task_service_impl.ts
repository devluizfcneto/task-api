import Task from "#models/task";
import { inject } from "@adonisjs/core";
import { ITasksService } from "./task_service.js";
import TasksRepository from "#repositories/tasks_repository_impl";
import ResourceNotFoundException from "#exceptions/ResourceNotFoundException";
import User from "#models/user";
import { TaskStatus } from "../enums/TaskStatus.js";
import UsersRepository from "#repositories/users_repository_impl";
import UnauthorizedException from "#exceptions/UnauthorizedException";

@inject()
export default class TasksService implements ITasksService {
  constructor(protected tasksRepository: TasksRepository, protected usersRepository: UsersRepository) {}
  
  async getAllTasks(): Promise<Task[]> {
    // Faz alguma regra de negócio
    return await this.tasksRepository.findAll();
  }
  
  
  async getTaskById(id: number): Promise<Task> {
    try {
      // faz alguma regra de negócio
      const task = await this.tasksRepository.findById(id);
      
      if(!task){
        throw new ResourceNotFoundException('Task', id);
      }
      
      return task;
      
    } catch(error) {
      console.error('Erro ao buscar tarefa por ID', error.message);

      if(error.code === 'E_ROW_NOT_FOUND'){
        throw new ResourceNotFoundException('Task',  id);
      }

      throw error;
    }
  }

  async createTask(data: { title: string; description?: string; status?: string }, user: User): Promise<Task | Error> {
    // faz alguma regra de negócio
    const statusNormalized = this.normalizeTaskStatus(data.status);
    
    return await this.tasksRepository.create({ 
      title: data.title, 
      description: data.description ? data.description : '', 
      status: statusNormalized
    }, user);    
  }
  
  async updateTask(data: {id: number, title?: string, description?: string, status?: string, userId: number}, user: User): Promise<Task | Error> {
    try {
      // faz algumas regras de negócio
      const taskFound = await this.tasksRepository.findById(data.id);

      if(!taskFound){
        throw new ResourceNotFoundException('Task', data.id);
      }

      const userFound = await this.usersRepository.findById(data.userId);
      if(!userFound){
        throw new ResourceNotFoundException('User', data.userId);
      }

      if(userFound.id !== user.id){
        throw new UnauthorizedException('Você não tem permissão para atualizar essa tarefa');
      }

      const statusNormalized = this.normalizeTaskStatus(data.status);
      
      return await this.tasksRepository.update(taskFound, {
        title: data.title ? data.title : taskFound.title, 
        description: data.description ? data.description : taskFound.description, 
        status: statusNormalized ? statusNormalized : this.normalizeTaskStatus(taskFound.status)
      });

    }catch(error){
      console.error('Erro: ', error.message);
      throw error;
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      // faz alguma regra de negócio
      const task = await this.tasksRepository.findById(id);
      
      if(!task){
        throw new ResourceNotFoundException('Task', id);
      }

      await this.tasksRepository.delete(task);

    } catch(error) {
      console.error('Erro ao deletar tarefa', error.message);

      if(error.code === 'E_ROW_NOT_FOUND'){
        throw new ResourceNotFoundException('Task',  id);
      }

      throw error;
    }
  }

  normalizeTaskStatus(status?: string): TaskStatus {
    if(!status) return TaskStatus.PENDING;
    return TaskStatus[status.toUpperCase() as keyof typeof TaskStatus] || TaskStatus.PENDING;
  }

}