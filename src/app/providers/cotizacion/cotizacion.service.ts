import { Injectable } from '@angular/core';
import {HttpService} from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private rootUrl = '/cotizacion';

  constructor(private http: HttpService) { }

  public crearCotizacion = (cotizacion) => {
    return new Promise((resolve, reject) => {
      const sender = {
        agenteid: cotizacion.uid,
        concesionarioid: cotizacion.concesionarioid,
        cliente: cotizacion.cliente,
        vehiculo: cotizacion.vehiculo
      };
      this.http.post(`${this.rootUrl}/guardar`, sender).then(resp => {
        resolve(resp);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public obtenerClientesConCotizacion = () => {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.rootUrl}/get-cliente`, {}).then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public listarCotizaciones = (clienteid: string) => {
    return new Promise((resolve, reject) => {
      const sender = { clienteid };
      this.http.get(`${this.rootUrl}/listado`, sender).then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public obtieneDatos = () => {
    return new Promise((resolve, reject) => {
      this.http.get(`/datos/listado`, {}).then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
    });
  }

}
