import UsersService from '#services/users_service_impl';
import { createUserValidator, updateUserValidator } from '#validators/user';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  
  constructor(protected usersService: UsersService) {}

  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const users = await this.usersService.getAllUsers();
      
      return response.ok({
        status: 'sucesso',
        message: 'Usuários listados com sucesso',
        data: users
      });
    } catch(error) {
      console.error(`Erro ao tentar listar usuários: ${error.message}`);
      throw error;
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const { email, password } = await createUserValidator.validate(request.all());
      const user = await this.usersService.createUser(email, password);
  
      return response.created({
        status: 'sucesso',
        message: 'Usuário criado com sucesso',
        data: user
      });

    } catch (error) {
      console.error(`Erro ao tentar criar usuário: ${error.message}`);
      throw error;
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const user = await this.usersService.getUserById(params.id);
  
      return response.ok({
        status: 'sucesso',
        message: 'Usuário encontrado com sucesso',
        data: user
      });    
    } catch(error) {
      console.error(`Erro ao tentar buscar usuário: ${error.message}`);
      throw error;
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const { password } = await updateUserValidator.validate(request.all());
      const user = await this.usersService.updateUser(params.id, password);
      
      return response.ok({
        status: 'sucesso',
        message: 'Usuário atualizado com sucesso',
        data: user
      });

    } catch(error){
      console.error(`Erro ao tentar atualizar usuário: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      await this.usersService.deleteUser(params.id);
  
      return response.status(204).json({
        status: 'sucesso',
        message: 'Usuário deletado com sucesso'
      });

    } catch(error) {
      console.error(`Erro ao tentar deletar usuário: ${error.message}`);
      throw error;
    }
  }
}