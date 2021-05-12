
export class ErrorHttp {
    mensaje: string;
    finSesion = false;

    constructor(mensaje: string, finSesion?: boolean) {
        this.mensaje = mensaje;
        this.finSesion = finSesion;
    }
}
