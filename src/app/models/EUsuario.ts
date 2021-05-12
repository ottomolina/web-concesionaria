
export class EUsuario {
  concesionarioid: string;
  estado: boolean;
  img: string;
  nombres: string;
  apellidos: string;
  correo: string;
  uid: string;

  constructor(concesionarioid: string, estado: boolean, img: string, nombres: string, apellidos: string, correo: string, uid: string) {
    this.concesionarioid = concesionarioid;
    this.estado = estado;
    this.img = img;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.correo = correo;
    this.uid = uid;
  }
}
