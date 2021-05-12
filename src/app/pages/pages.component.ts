import { Component, OnInit } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {AuthService} from '../providers/auth/auth.service';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';
import {NgxMatAlertConfirmService} from 'ngx-mat-alert-confirm';
import {MatDialog} from '@angular/material/dialog';
import {ConcesionarioComponent} from './concesionario/concesionario.component';

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
              private router: Router) {
    super(alertService, dialog);
  }

  ngOnInit(): void {
    const usuario = this.authService.getUser();
    console.log('Usuario', usuario);
    const { concesionarioid } = usuario;
    if (concesionarioid === '') {
      // this.router.navigate(['/concesionario'])
      const data = { orm: null };
      this.openDialog(ConcesionarioComponent, data, null);
    }
  }

}
