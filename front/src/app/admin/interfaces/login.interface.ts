import { ErrorHandler } from "@angular/core";

export interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
    recaptcha: string;
    role: string;
}

export interface loginResult {
    msgSuccessLogin:string,
    usuario: any,
    errorLogin:ErrorHandler,
    token:string
}
