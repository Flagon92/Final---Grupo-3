export interface ServicesResponse {
    ok: boolean;
    services: Service[]; // Reemplaza "any" con la estructura real de "services"
  }
  
export interface Service {
    descripcion: string;
    foto: string;
    nombre: string;
    profesion: string;
    uid: string;
}

