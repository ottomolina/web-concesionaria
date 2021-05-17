import { Component, OnInit, } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppComponent} from '../../app.component';
import {NgxMatAlertConfirmService} from 'ngx-mat-alert-confirm';
import {ConcesionarioService} from '../../providers/concesionario/concesionario.service';
import {ConcesionarioDialogComponent} from './concesionario-dialog/concesionario-dialog.component';
import {AuthService} from '../../providers/auth/auth.service';
import {Router} from '@angular/router';
import {UsuarioService} from '../../providers/usuario/usuario.service';

@Component({
  selector: 'app-concesionario',
  templateUrl: './concesionario.component.html',
  styleUrls: ['./concesionario.component.css']
})
export class ConcesionarioComponent extends AppComponent implements OnInit {

  constructor(public alertService: NgxMatAlertConfirmService,
              public dialog: MatDialog,
              public concesionarioService: ConcesionarioService,
              public usuarioService: UsuarioService,
              private authService: AuthService,
              private router: Router
              ) {
    super(alertService, dialog);
    const { concesionarioid } = this.authService.getUser();
    if (!concesionarioid) {
      this.cargaDatos();
    } else {
      router.navigate(['/home']);
    }
  }

  ngOnInit(): void { }

  public cargaDatos(): void {
    this.showLoading();
    this.concesionarioService.listarConcesionarios().then(data => {
      this.dismissLoading();
      const ref = this.openDialog(ConcesionarioDialogComponent, data, null);

      ref.componentInstance.onGuardar.subscribe(formulario => {
        this.guardarConcesionario(formulario, ref);
      });
      ref.componentInstance.onSeleccionar.subscribe(concesionario => {
        ref.close(concesionario);
      });

      ref.beforeClosed().subscribe((result) => {
        ref.componentInstance.onGuardar.unsubscribe();
        ref.componentInstance.onSeleccionar.unsubscribe();
        this.asignaConcesionario(result);
      });
    }).catch(err => {
      this.dismissLoading();
      this.showMessage(err.mensaje);
    });
  }

  public asignaConcesionario(concesionario: any): void {
    AuthService.asignaConcesionario(concesionario);
    this.showLoading();
    const { uid } = this.authService.getUser();
    const usuario = { _uid: uid, concesionarioid: concesionario.id };
    console.log(usuario);
    this.usuarioService.actualizarUsuario(usuario).then(resp => {
      this.dismissLoading();
      console.log(resp);
      this.router.navigate(['/']);
    }).catch(err => {
      console.log('Error asignarConcesionario', err);
      this.dismissLoading();
      this.showMessage(err.mensaje);
    });
  }

  public guardarConcesionario(formulario: any, ref: MatDialogRef<ConcesionarioDialogComponent>): void {
    this.showLoading();
    this.concesionarioService.guardarConcesionario(formulario).then(resp => {
      this.dismissLoading();
      console.log('result', resp);
      ref.close( resp );
    }).catch(err => {
      console.log('Error guardaConcesionario', err);
      this.dismissLoading();
      this.showMessage(err.mensaje);
    });
  }

}
