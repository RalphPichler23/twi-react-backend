

export interface IUser {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    created_at: string;
}

export interface IUserWithPassword extends IUser {
    password: string;
}