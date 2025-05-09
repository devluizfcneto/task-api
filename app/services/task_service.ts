import Task from "#models/task";
import User from "#models/user";

export interface ITasksService {
    getAllTasks(): Promise<Task[]>;
    getTaskById(id: number): Promise<Task>;
    createTask(data: {title: string, description: string, status?: string}, user: User): Promise<Task | Error>;
    updateTask(data: {id: number, title?: string, description?: string, status?: string, userId?: number}, user: User): Promise<Task | Error>;
    deleteTask(id: number): Promise<void>;
}