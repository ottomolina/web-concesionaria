import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {
    private KEY_USUARIO = 'R00001';
    private KEY_TOKEN = 'R00002';

    constructor(private router: Router) { }

    canActivate(): boolean {
        const logged = localStorage.getItem(this.KEY_TOKEN);
        if (logged === null || logged === undefined || logged === '') {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
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
        return JSON.parse(token);
    }

}
