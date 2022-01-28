import { Roles } from "./roles.enum";

export type SignInResponseDTO = {
    id: string,
    username: string,
    email: string,
    roles: Roles[],
    accessToken: string,
    tokenType: string,
    refreshToken: string,
};
