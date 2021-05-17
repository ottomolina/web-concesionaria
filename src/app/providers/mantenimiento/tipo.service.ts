import { Injectable } from '@angular/core';
import {HttpService} from '../http/http.service';

@Injectable()
export class TipoService {
  private rootUrl = '/tipo';

  constructor(private http: HttpService) { }

  public crearTipo = (tipo) => {
    return new Promise((resolve, reject) => {
      const sender = { tipo: tipo.tipo };

      this.http.post(`${this.rootUrl}/guardar`, sender).then(resp => {
        resolve(resp);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public listarTipos = () => {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.rootUrl}/listado`, {}).then(resp => {
        resolve(resp.data.lista);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public actualizarTipo = (tipo) => {
    return new Promise((resolve, reject) => {
      const { id, ...data} = tipo;
      const url = `${this.rootUrl}/actualizar/${id}`;
      this.http.put(url, data).then(resp => {
        resolve(resp);
      }).catch(err => {
        reject(err);
      });
    });
  }

}
