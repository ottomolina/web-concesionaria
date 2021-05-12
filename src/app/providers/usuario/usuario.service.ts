import {Injectable} from '@angular/core';
import {HttpService} from '../http/http.service';

@Injectable()
export class UsuarioService {
  private rootUrl = '/usuario';

  constructor(private http: HttpService) { }

  crearUsuario = (usuario) => {
    return new Promise((resolve, reject) => {
      const { password, ...data } = usuario;
      data.password = btoa(password);

      this.http.post(`${this.rootUrl}/guardar`, data).then(resp => {
        console.log('Resolve', resp);
        resolve(resp);
      }).catch(err => {
        console.log('Reject', err);
        reject(err);
      });
    });
  };

  actualizarUsuario = (usuario) => {
    return new Promise((resolve, reject) => {
      const {_uid, ...data} = usuario;
      const url = `${this.rootUrl}/actualizar/${_uid}`;
      this.http.put(url, data).then(resp => {
        console.log('Resolve', resp);
        resolve(resp);
      }).catch(err => {
        console.log('Reject', err);
        reject(err);
      });
    });
  };

  login = (usuario) => {
    return new Promise((resolve, reject) => {
      const {password, ...data} = usuario;
      data.password = btoa(password);
      this.http.post(`/auth/login`, data).then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
    });
  };

}
