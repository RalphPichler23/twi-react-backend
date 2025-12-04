

export interface IUser {
    id: string;
    email?: string | undefined;
    created_at: string;
}

export interface IUserWithPassword extends IUser {
    password: string;
}