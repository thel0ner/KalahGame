import { Roles } from "./roles.enum";

export type SignUpDTO = {
    username: string,
    email: string,
    password: string,
    roles: Roles[];
};