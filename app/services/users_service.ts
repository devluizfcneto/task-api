import User from "#models/user";

export interface IUsersService {
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<Partial<User>>;
    createUser(email: string, password: string): Promise<Partial<User> | Error>;
    updateUser(id: number, password: string): Promise<Partial<User> | Error>;
    deleteUser(id: number): Promise<void>;
    sanitizeUser(user: User): Partial<User>;
}