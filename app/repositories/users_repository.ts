import User from "#models/user";

export interface IUsersRepository {
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    create(data: {email: string, password: string}): Promise<User>;
    update(userAlreadyFound: User, password: string): Promise<User>;
    delete(user: User): Promise<void>;
}