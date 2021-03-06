import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {
  private static KEY_USUARIO = 'R00001';
  private static KEY_CONCESIONARIO = 'R00003';
  private KEY_USUARIO = 'R00001';
  private KEY_TOKEN = 'R00002';

  static asignaConcesionario = (concesionario: any) => {
    const usuario: any = JSON.parse(localStorage.getItem(AuthService.KEY_USUARIO));
    usuario.concesionarioid = concesionario.id;
    localStorage.setItem(AuthService.KEY_USUARIO, JSON.stringify(usuario));
    localStorage.setItem(AuthService.KEY_CONCESIONARIO, JSON.stringify(concesionario));
  }

    constructor(private router: Router) { }

    canActivate(): boolean {
        const logged = localStorage.getItem(this.KEY_TOKEN);
        if (logged === null || logged === undefined || logged === '') {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

    setConcesionario = (concesionario: any) => {
      localStorage.setItem(AuthService.KEY_CONCESIONARIO, JSON.stringify(concesionario));
    }

    getConcesionario = () => {
      const orm = localStorage.getItem(AuthService.KEY_CONCESIONARIO);
      return JSON.parse(orm);
    }

    setSession = (usuario: any, token: string) => {
        localStorage.setItem(this.KEY_USUARIO, JSON.stringify(usuario));
        localStorage.setItem(this.KEY_TOKEN, token);
    }

    closeSession = () => {
        localStorage.removeItem(this.KEY_USUARIO);
        localStorage.removeItem(this.KEY_TOKEN);
    }

    getUser = () => {
        const usuario = localStorage.getItem(this.KEY_USUARIO);
        if (!usuario) {
            this.router.navigate(['/login']);
            return '';
        }
        return JSON.parse(usuario);
    }

    getToken = () => {
        const token = localStorage.getItem(this.KEY_TOKEN);
        if (!token) {
            this.router.navigate(['/login']);
            return '';
        }
        return token;
    }

}
