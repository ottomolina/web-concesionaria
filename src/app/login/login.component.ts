import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../providers/usuario/usuario.service';
import {NgxMatAlertConfirmService} from 'ngx-mat-alert-confirm';
import {AuthService} from '../providers/auth/auth.service';
import {timeout} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AppComponent {
  public hide = true;
  public txtCorreo = '';
  public txtPass = '';

  public formUsuario: FormGroup;
  private fb: FormBuilder;

  constructor(public alertService: NgxMatAlertConfirmService,
              public dialog: MatDialog,
              private router: Router,
              private userProv: UsuarioService,
              private auth: AuthService) {
    super(alertService, dialog);

    this.fb = new FormBuilder();
    this.formUsuario = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(75)]],
      apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)] ],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)] ]
    });
  }

  acceder(): void {
    const request = { correo: this.txtCorreo, password: this.txtPass };
    this.showLoading();
    this.userProv.login(request).then((resp: any) => {
      this.dismissLoading();
      this.auth.setSession(resp.usuario, resp.token);
      setTimeout(() => {
        this.router.navigate(['/']).then(() => { });
      }, 1000);
    }).catch(err => {
      this.dismissLoading();
      this.showMessage(err.mensaje);
    });
  }

  public onSubmit(): void {
    const data = this.formUsuario.value;
    this.showLoading();
    this.userProv.crearUsuario(data).then(resp => {
      this.dismissLoading();
      this.showMessage('Los datos del usuario se han creado correctamente.\n Ya puede iniciar sesión');
      this.formUsuario.get('nombres').reset();
      this.formUsuario.get('apellidos').reset();
      this.formUsuario.get('correo').reset();
      this.formUsuario.get('password').reset();
    }).catch(err => {
      this.dismissLoading();
      this.showMessage(err.mensaje);
    });
  }

}
