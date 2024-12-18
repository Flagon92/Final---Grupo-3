import { environment } from "../../../environments/environment.development";

const baseUrl = environment.baseUrl

export class Usuario {

  constructor(
    public user: string,
    public nombres: string,
    public apellidos: string,
    public dni: string,
    public telefono: string,
    public email: string,
    public role: string,
    public google: boolean,
    public uid: string,
    public fotoname: string,

  ) {}

  // Método estático para crear una instancia de Usuario
  static transformData(data: Usuario): Usuario { // un método estático se puede usar sin hacer una instancia
    return new Usuario(
      data.user,
      data.nombres,
      data.apellidos,
      data.dni,
      data.telefono,
      data.email,
      data.role,
      data.google,
      data.uid,
      data.fotoname
    );
  }

  // get image user
  get getImageUser(){

    if(!this.fotoname) return `${baseUrl}/uploads/image/cualquiercosa`; // si this.fotoname tiene un valor y no es null o undefined

    // aqui no se hace la petición con http sino el que hace la petición es el src del html
    // esto NO es un path, esta es la petición que se hace al endpoint del backend que retorna una imagen del filesystem
    return `${baseUrl}/uploads/image/${this.fotoname}`;

  }

}
