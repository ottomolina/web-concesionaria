import {Component, Input, OnInit} from '@angular/core';
import {EDetalle} from '../../../../models/EDetalle';
import {AuthService} from '../../../../providers/auth/auth.service';
import {EUsuario} from '../../../../models/EUsuario';

@Component({
  selector: 'app-confirma-datos',
  templateUrl: './confirma-datos.component.html',
  styleUrls: ['./confirma-datos.component.css']
})
export class ConfirmaDatosComponent implements OnInit {
  @Input() cliente: any;
  @Input() vehiculo: any;

  public detalleCliente: Array<EDetalle>;
  public detalleVehiculo: Array<EDetalle>;
  public detalleUsuario: Array<EDetalle>;
  public usuario: EUsuario;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.usuario = this.authService.getUser();
    console.log('Usuario', this.usuario);
    this.detalleUsuario = new Array<EDetalle>();
    this.detalleUsuario.push(new EDetalle('Nombre:', `${this.usuario.nombres} ${this.usuario.apellidos}`));
    this.detalleUsuario.push(new EDetalle('Correo:', this.usuario.correo));

    this.detalleCliente = new Array<EDetalle>();
    this.detalleCliente.push(new EDetalle('Nombres:', this.cliente.nombres));
    this.detalleCliente.push(new EDetalle('Apellidos:', this.cliente.apellidos));
    this.detalleCliente.push(new EDetalle('Teléfono:', this.cliente.telefono));
    this.detalleCliente.push(new EDetalle('Correo:', this.cliente.correo));

    const vehiculo = `${this.vehiculo.marca} ${this.vehiculo.linea} ${this.vehiculo.modelo}`;
    this.detalleVehiculo = new Array<EDetalle>();
    this.detalleVehiculo.push(new EDetalle('Tipo:', this.vehiculo.tipo));
    this.detalleVehiculo.push(new EDetalle('Vehículo', vehiculo));
    this.detalleVehiculo.push(new EDetalle('Color:', this.vehiculo.color));
    this.detalleVehiculo.push(new EDetalle('Cilindraje:', this.vehiculo.cc));
    this.detalleVehiculo.push(new EDetalle('Precio:', this.vehiculo.precio));
  }

}
