import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ErrorHttp } from '../../models/ErrorHttp';

@Injectable()
export class HttpService {
  private OK = 0;
  private ERROR = 1;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  public post(endpoint: string, datos?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const ws = `${environment.ws}${endpoint}`;
      let header = new HttpHeaders();
      // header = header.set('Content-Type', 'application/json; charset=utf-8');
      console.log('Request enviar: ', datos);

      const token = this.auth.getToken();
      if ( token ) {
        header = header.set('x-token', token);
      }

      this.http.post(ws, datos, { headers: header }).subscribe( (data) => {
        this.validaJsonRespuesta(data, resolve, reject);
      }, (err) => {
          console.log(err);
          if (err.status === 400) {
            const {errors} = err.error.mensaje;
            reject(new ErrorHttp(errors[0].msg)); // Solo se devolverá el primer mensaje
          } else if (err.status === 401){
            const { mensaje } = err.error;
            reject(new ErrorHttp(mensaje));
          } else {
            reject(new ErrorHttp('Ocurrió un problema con la conexión al servidor.'));
          }
      });
    });
  }

  public put(endpoint: string, datos: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const ws = `${environment.ws}${endpoint}`;
      let header = new HttpHeaders();
      header = header.set('Content-Type', 'application/json; charset=utf-8');
      console.log('Request enviar: ', datos);

      const token = this.auth.getToken();
      if ( token ) {
        header = header.set('x-token', token);
      }

      this.http.put(ws, datos, { headers: header }).subscribe( (data) => {
        this.validaJsonRespuesta(data, resolve, reject);
      }, (err) => {
          console.log(err);
          if (err.status === 400) {
            const { errors } = err.error.mensaje;
            reject(new ErrorHttp(errors[0].msg) ); // Solo se devolverá el primer mensaje
          } else {
            reject(new ErrorHttp('Ocurrió un problema con la conexión al servidor.'));
          }
      });
    });
  }

  public get(endpoint: string, datos?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let ws = `${environment.ws}${endpoint}`;

      let header = new HttpHeaders();
      const token = this.auth.getToken();
      if ( token ) {
        header = header.set('x-token', token);
      }

      if (datos) {
        let params = '';
        Object.keys(datos).map((key) => {
          params = `${params}&${key}=${datos[key]}`;
        });
        ws = `${ws}?${params}`;
      }
      console.log(ws);

      this.http.get(ws).subscribe( (resp) => {
        try{
          console.log(resp);
          const json = JSON.parse(JSON.stringify(resp));
          switch (json.codigo) {
            case this.OK:
              resolve(json);
              break;
            case this.ERROR:
              reject(new ErrorHttp(json.mensaje));
              break;
            default:
              reject(new ErrorHttp(json.mensaje));
              break;
          }
        } catch (err) {
          console.log(err);
          reject(new ErrorHttp('Ocurrió un error en la lectura de la respuesta.'));
        }
      }, (err) => {
          console.log(err);
          reject(new ErrorHttp('Ocurrió un problema con la conexión al servidor.'));
      });
    });
  }

  private validaJsonRespuesta(data, resolve, reject): any {
    try {
      console.log(data);
      const json = JSON.parse(JSON.stringify(data));
      switch (json.codigo) {
        case this.OK:
          resolve(json);
          break;
        case this.ERROR:
          const { errors } = json.mensaje;
          if (errors) { // Vienen errores de validación
            reject(new ErrorHttp(errors[0].msg) ); // Solo se devolverá el primer mensaje
          } else {
            reject(new ErrorHttp(json.mensaje));
          }
          break;
        default:
          reject(new ErrorHttp(json.mensaje));
          break;
      }
    } catch (err) {
      console.log(err);
      reject(new ErrorHttp('Ocurrió un error en la lectura de la respuesta.'));
    }
  }

}
