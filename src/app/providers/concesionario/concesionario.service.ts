import { Injectable } from '@angular/core';
import {HttpService} from '../http/http.service';

@Injectable()
export class ConcesionarioService {
  private rootUrl = '/concesionario';

  constructor(private http: HttpService) { }

  public listarConcesionarios = () => {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.rootUrl}/listado`, {}).then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public getConcesionarioById = (id: string) => {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.rootUrl}/getconcesionario`, { id }).then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public guardarConcesionario = (datos: any) => {
    return new Promise((resolve, reject) => {
      const sender: any = {};
      sender.nombre = datos.nombre;
      sender.direccion = datos.direccion;
      this.http.post(`${this.rootUrl}/guardar`, sender).then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
    });
  }

}
