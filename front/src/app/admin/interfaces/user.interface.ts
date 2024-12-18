import { Usuario } from "../models/usuario.model";

export interface UserResponse {
  ok: boolean;
  user: Usuario;
  message: string;
}

export interface UsersResponse {
    ok: boolean;
    users: Usuario[];
}

export interface User {
    user: string;
    nombres: string;
    apellidos: string;
    servicio: string;
    telefono: string;
    email: string;
    role: string;
    google: boolean;
    uid: string;
    fotoname: string;
}






