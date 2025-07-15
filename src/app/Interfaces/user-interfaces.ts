export interface register {
    id: string;
    email: string;
    password: string;
    userName: string;
    address: string;
    phoneNumber: string;
}

export interface login {
    password: string;
    userName: string;
}
export interface user {
    id: string;
    name: string;
    role: string;
    isActive: boolean;
    token: string;
}
export interface userTokenClaims {
    id: string;
    name: string;
    role: string;
    isActive: boolean;
}