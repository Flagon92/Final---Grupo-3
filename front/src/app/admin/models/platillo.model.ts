import { environment } from "../../../environments/environment.development";

const baseUrl = environment.baseUrl

export class Platillo {

  constructor(

    public id: string,
    public nombre: string,
    public descripcion: string,
    public ingredientes: string,
    public precio: string,
    public urlIMG: string,

  ) {}

  // Método estático para crear una instancia de Usuario
  static transformData(data: Platillo): Platillo { // un método estático se puede usar sin hacer una instancia
    return new Platillo(
      data.id,
      data.nombre,
      data.descripcion,
      data.ingredientes,
      data.precio,
      data.urlIMG
    );
  }

  // get image user
  get getImageUser(){

    if(!this.urlIMG) return `${baseUrl}/uploads/image/cualquiercosa`; // si this.fotoname tiene un valor y no es null o undefined

    // aqui no se hace la petición con http sino el que hace la petición es el src del html
    // esto NO es un path, esta es la petición que se hace al endpoint del backend que retorna una imagen del filesystem
    return `${baseUrl}/uploads/image/${this.urlIMG}`;

  }

}
