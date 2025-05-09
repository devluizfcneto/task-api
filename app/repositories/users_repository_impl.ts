import User from "#models/user"
import { inject } from "@adonisjs/core";
import { IUsersRepository } from "./users_repository.js";

@inject()
export default class UsersRepository implements IUsersRepository {
    async findAll(): Promise<User[]> {
        return await User
                    .query()
                    .preload('tasks')
                    .orderBy('created_at', 'desc')
                    .select(['id', 'email', 'created_at', 'updated_at']);
    }

    async findById(id: number): Promise<User>{
        return await User
                    .query()
                    .preload('tasks')
                    .where('id', id)
                    .firstOrFail();
    }

    async findByEmail(email: string): Promise<User>{
        return await User
                    .query()
                    .preload('tasks')
                    .where('email', email)
                    .firstOrFail();
    }

    async create(data: {email: string, password: string}): Promise<User>{
        return await User.create(data);
    }

    async update(userAlreadyFound: User, password: string): Promise<User>{
        return await userAlreadyFound
                    .merge({ password: password })
                    .save();
    }

    async delete(user: User): Promise<void>{
        return await user.delete();
    }
}