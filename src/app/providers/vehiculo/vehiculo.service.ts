import { Injectable } from '@angular/core';
import {HttpService} from '../http/http.service';

@Injectable()
export class VehiculoService {
  private rootUrl = '/vehiculo';

  constructor(private http: HttpService) { }

  public crearVehiculo = (vehiculo) => {
    return new Promise((resolve, reject) => {
      const sender: any = { };
      sender.tipo = vehiculo.tipo;
      sender.marca = vehiculo.marca;
      sender.linea = vehiculo.linea;
      sender.cc = vehiculo.cc;
      sender.color = vehiculo.color;
      sender.modelo = vehiculo.modelo;
      sender.precio = vehiculo.precio;

      this.http.post(`${this.rootUrl}/guardar`, sender).then(resp => {
        resolve(resp);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public listarVehiculos = () => {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.rootUrl}/listado`, {}).then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public actualizarVehiculo = (vehiculo) => {
    return new Promise((resolve, reject) => {
      const { id } = vehiculo;
      const data: any = {};
      data.tipo = vehiculo.tipo;
      data.marca = vehiculo.marca;
      data.linea = vehiculo.linea;
      data.cc = vehiculo.cc;
      data.color = vehiculo.color;
      data.modelo = vehiculo.modelo;
      data.precio = vehiculo.precio;

      const url = `${this.rootUrl}/actualizar/${id}`;
      this.http.put(url, data).then(resp => {
        resolve(resp);
      }).catch(err => {
        reject(err);
      });
    });
  }
}
