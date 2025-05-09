import Task from "#models/task";
import User from "#models/user";
import { TaskStatus } from "../enums/TaskStatus.js";
import { ITasksRepository } from "./tasks_repository.js";

export default class TasksRepository implements ITasksRepository {
    async findAll(): Promise<Task[]> {
        return await Task
                    .query()
                    // .preload('user')
                    .select('id', 'title', 'description', 'status', 'created_at', 'updated_at')
                    .orderBy('created_at', 'desc'); 
    }

    async findById(id: number): Promise<Task | null> {
        return await Task.findBy({
            select: ['id', 'title', 'description', 'created_at', 'updated_at'],
            where: { id: id }
        });
    }

    async create(data: { title: string, description: string, status: TaskStatus }, user: User): Promise<Task> {
        return await Task.create({
            title: data.title,
            description: data.description,
            status: data.status,
            userId: user.id
        });
    }

    async update(taskAlreadyFound: Task, data: { title: string, description: string, status: TaskStatus }): Promise<Task> {
        return await taskAlreadyFound.merge({
            title: data.title,
            description: data.description,
            status: data.status
        }).save();
    }

    async delete(task: Task): Promise<void> {
        await task.delete();
    }
}