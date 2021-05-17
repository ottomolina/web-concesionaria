import { Injectable } from '@angular/core';
import {HttpService} from '../http/http.service';

@Injectable()
export class ClienteService {
  private rootUrl = '/cliente';

  constructor(private http: HttpService) { }

  public crearCliente = (cliente) => {
    return new Promise((resolve, reject) => {
      const sender: any = { };
      sender.nombres = cliente.nombres;
      sender.apellidos = cliente.apellidos;
      sender.telefono = cliente.telefono;
      sender.correo = cliente.correo;
      sender.direccion = cliente.direccion;
      sender.nacimiento = cliente.nacimiento;
      sender.genero = cliente.genero;
      sender.ocupacion = cliente.ocupacion;
      sender.ingresos = cliente.ingresos;

      this.http.post(`${this.rootUrl}/guardar`, sender).then(resp => {
        resolve(resp);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public listarClientes = () => {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.rootUrl}/listado`, {}).then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
    });
  }

  public actualizarCliente = (cliente) => {
    return new Promise((resolve, reject) => {
      const { id } = cliente;
      const data: any = {};
      data.nombres = cliente.nombres;
      data.apellidos = cliente.apellidos;
      data.telefono = cliente.telefono;
      data.correo = cliente.correo;
      data.direccion = cliente.direccion;
      data.nacimiento = cliente.nacimiento;
      data.genero = cliente.genero;
      data.ocupacion = cliente.ocupacion;
      data.ingresos = cliente.ingresos;

      const url = `${this.rootUrl}/actualizar/${id}`;
      this.http.put(url, data).then(resp => {
        resolve(resp);
      }).catch(err => {
        reject(err);
      });
    });
  }
}
