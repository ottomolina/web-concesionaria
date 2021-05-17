import { Component, OnInit } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {AuthService} from '../providers/auth/auth.service';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';
import {NgxMatAlertConfirmService} from 'ngx-mat-alert-confirm';
import {MatDialog} from '@angular/material/dialog';
import {ConcesionarioComponent} from './concesionario/concesionario.component';
import {ConcesionarioService} from '../providers/concesionario/concesionario.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent extends AppComponent implements OnInit {
  navSide: MatSidenav;
  username: string;
  opened = true;

  navItems = [
    { text: 'Inicio', icon: 'home', link: '/home' },
    { text: 'Mantenimiento', icon: 'build', link: '/mantenimiento' },
    { text: 'Clientes', icon: 'account_box', link: '/clientes' },
    { text: 'Vehículos', icon: 'directions_car', link: '/vehiculos' },
    { text: 'Cotizaciones', icon: 'list_alt', link: '/cotizaciones' }
  ];

  constructor(public alertService: NgxMatAlertConfirmService,
              public dialog: MatDialog,
              private authService: AuthService,
              private router: Router,
              private concesionarioService: ConcesionarioService) {
    super(alertService, dialog);
    const { nombres, apellidos } = this.authService.getUser();
    this.username = `${nombres} ${apellidos}`;
  }

  ngOnInit(): void {
    const usuario = this.authService.getUser();
    const { concesionarioid } = usuario;
    if (concesionarioid === '') {
      this.router.navigate(['/concesionario']);
    } else {
      this.showLoading();
      this.concesionarioService.getConcesionarioById(concesionarioid).then(resp => {
        this.dismissLoading();
        this.authService.setConcesionario(resp);
      }).catch(err => {
        console.log('Error cargaConcesionario', err);
        this.dismissLoading();
        this.showMessage(err.mensaje);
      });
    }
  }

  public cerrarSesion(): void {
    this.authService.closeSession();
    this.router.navigate(['/login']);
  }

}
