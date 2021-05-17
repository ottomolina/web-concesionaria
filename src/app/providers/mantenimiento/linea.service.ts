import { Injectable } from '@angular/core';
import {HttpService} from '../http/http.service';

@Injectable()
export class LineaService {
  private rootUrl = '/linea';

  constructor(private http: HttpService) { }

  public crearLinea = (linea) => {
    return new Promise((resolve, reject) => {
      const sender = {
        marcaid: linea.marcaid,
        linea: linea.linea
      };
      this.http.post(`${this.rootUrl}/guardar`, sender).then(resp => {
        resolve(resp);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public listarLineas = (marcaid?: string) => {
    return new Promise((resolve, reject) => {
      const sender: any = {};
      if (marcaid) { sender.marcaid = marcaid; }
      this.http.get(`${this.rootUrl}/listado`, sender).then(resp => {
        resolve(resp.data.lista);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public actualizarLinea = (linea) => {
    return new Promise((resolve, reject) => {
      const { id } = linea;
      const sender = {
        marcaid: linea.marcaid,
        linea: linea.linea
      };
      const url = `${this.rootUrl}/actualizar/${id}`;
      this.http.put(url, sender).then(resp => {
        resolve(resp);
      }).catch(err => {
        reject(err);
      });
    });
  }
}
