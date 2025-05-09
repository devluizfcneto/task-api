import Task from "#models/task";
import User from "#models/user";
import { TaskStatus } from "../enums/TaskStatus.js";

export interface ITasksRepository {
    findAll(): Promise<Task[]>;
    findById(id: number): Promise<Task | null>;
    create(data: {title: string, description: string, status: TaskStatus}, user: User): Promise<Task>;
    update(taskAlreadyFound: Task, data: { title: string, description: string, status: TaskStatus }): Promise<Task>;
    delete(task: Task): Promise<void>;
}