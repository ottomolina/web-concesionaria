import { Injectable } from '@angular/core';
import {HttpService} from '../http/http.service';

@Injectable()
export class MarcaService {
  private rootUrl = '/marca';

  constructor(private http: HttpService) { }

  public crearMarca = (marca) => {
    return new Promise((resolve, reject) => {
      const sender = { marca: marca.marca };

      this.http.post(`${this.rootUrl}/guardar`, sender).then(resp => {
        resolve(resp);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public listarMarcas = () => {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.rootUrl}/listado`, {}).then(resp => {
        resolve(resp.data.lista);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public actualizarMarca = (marca) => {
    return new Promise((resolve, reject) => {
      const { id, ...data} = marca;
      const url = `${this.rootUrl}/actualizar/${id}`;
      this.http.put(url, data).then(resp => {
        resolve(resp);
      }).catch(err => {
        reject(err);
      });
    });
  }
}
