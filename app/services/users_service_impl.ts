import { inject } from "@adonisjs/core";
import hash from "@adonisjs/core/services/hash";
import User from "#models/user";
import { IUsersService } from "./users_service.js";
import UsersRepository from "#repositories/users_repository_impl";
import ResourceNotFoundException from "#exceptions/ResourceNotFoundException";

@inject()
export default class UsersService implements IUsersService {

    constructor(protected usersRepository: UsersRepository){}

    async getAllUsers(){
        //Faz alguma regra de negócio
       return await this.usersRepository.findAll();
    }

    async getUserById(id: number){
        try {
            // Faz alguma regra de negócio
            const user = await this.usersRepository.findById(id);

            if(!user){
                throw new ResourceNotFoundException('User', id);
            }
            
            return this.sanitizeUser(user);

        } catch(error) {
            console.error('Erro ao buscar usuário por ID', error.message);

            if(error.code === 'E_ROW_NOT_FOUND'){
                throw new ResourceNotFoundException('User',  id);
            }

            throw error;
        }
    }

    async createUser(email: string, password: string){
        // Faz alguma regra de negócio
        const user = await this.usersRepository.create({email, password});
        return this.sanitizeUser(user);
    }

    async updateUser(id: number, password: string){
        // Faz alguma regra de negócio
        const user = await this.usersRepository.findById(id);
        if(!user){
            throw new ResourceNotFoundException('User', id);
        }

        const newPassword = await hash.make(password);
        const userUpdated = await this.usersRepository.update(user, newPassword);

        return this.sanitizeUser(userUpdated);
    }

    async deleteUser(id: number){
        // Faz alguma regra de negócio
        const user = await this.usersRepository.findById(id);
        if(!user){
            throw new ResourceNotFoundException('User', id);
        }

        await this.usersRepository.delete(user);
    }

    sanitizeUser(user: User){
        const userResponse = user.serialize();
        delete userResponse.password;
        return userResponse;
    }
}

