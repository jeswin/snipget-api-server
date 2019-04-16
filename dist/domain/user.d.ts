export interface ICreateUserArgs {
    username: string;
    password: string;
    name: string;
    email: string;
}
export declare function createUser(args: ICreateUserArgs): Promise<void>;
