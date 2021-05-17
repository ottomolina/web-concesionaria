import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NgxMatAlertConfirmService} from 'ngx-mat-alert-confirm';
import {AppComponent} from '../../app.component';
import {CotizacionDialogComponent} from './cotizacion-dialog/cotizacion-dialog.component';
import {ClienteService} from '../../providers/cliente/cliente.service';
import {CotizacionService} from '../../providers/cotizacion/cotizacion.service';
import {VehiculoService} from '../../providers/vehiculo/vehiculo.service';
import {AuthService} from '../../providers/auth/auth.service';
import {InfoCotizacionComponent} from './info-cotizacion/info-cotizacion.component';
import {PdfService} from '../../providers/util/pdf.service';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CotizacionComponent extends AppComponent {
  public lstCliente: any = [];
  public listaClientes: any;
  public listaVehiculos: any;
  public listaTipos: any;
  public listaMarcas: any;
  public listaLineas: any;

  public displayedColumns: string[] = ['id', 'cliente', 'telefono', 'correo', 'options'];

  constructor(public alertService: NgxMatAlertConfirmService,
              public dialog: MatDialog,
              private authService: AuthService,
              private cotizacionService: CotizacionService,
              private vehiculoService: VehiculoService,
              private clienteService: ClienteService,
              private pdfService: PdfService
  ) {
    super(alertService, dialog);
    this.showLoading();
    Promise.all([ this.cargarClientes(), this.cargaDatos()])
      .then(result => this.dismissLoading() )
      .catch(err => {
        this.dismissLoading();
        this.showMessage(err.mensaje);
      });
  }

  cargarClientes = async () => {
    const data: any = await this.cotizacionService.obtenerClientesConCotizacion();
    this.lstCliente = data.lista.map(element => {
      element.cotizaciones = [];
      return element;
    });
  }

  cargaDatos = async () => {
    const lst: any = await this.vehiculoService.listarVehiculos();
    this.listaVehiculos = lst.lista;
    const listado: any = await this.cotizacionService.obtieneDatos();
    const lstCl: any = await this.clienteService.listarClientes();
    this.listaClientes = lstCl.lista;
    this.listaTipos = listado.tipos;
    this.listaMarcas = listado.marcas;
    this.listaLineas = listado.lineas;
  }

  public expandRow(row: any): void {
    if (row.cotizaciones.length === 0) {
      this.showLoading();
      this.cotizacionService.listarCotizaciones(row.id).then((resp: any) => {
        this.dismissLoading();
        row.cotizaciones = resp.lista.map(element => {
          element.agente = this.authService.getUser();
          element.concesionario = this.authService.getConcesionario();
          return element;
        });
      }).catch(err => {
        console.log(err);
        this.dismissLoading();
        this.showMessage(err.mensaje);
      });
    } else {
      row.cotizaciones = [];
    }
  }

  public nuevoRegistro(): void {
    const data = {
      listas: {
        clientes: this.listaClientes,
        vehiculos: this.listaVehiculos,
        tipos: this.listaTipos,
        marcas: this.listaMarcas,
        lineas: this.listaLineas
      }
    };
    const ref = this.openDialog(CotizacionDialogComponent, data, null);
    ref.componentInstance.handleGuardar.subscribe(formulario => {
      this.guardarCotizacion(formulario, ref);
    });
    ref.beforeClosed().subscribe((result) => {
      ref.componentInstance.handleGuardar.unsubscribe();
      if ( result ) {
        this.showLoading();
        this.cargarClientes().then(() => {
          this.dismissLoading();
        }).catch(err => {
          this.dismissLoading();
          this.showMessage(err.mensaje);
        });
      }
    });
  }

  private guardarCotizacion(obj: any,  ref: MatDialogRef<CotizacionDialogComponent>): void {
    obj.uid = this.authService.getUser().uid;
    obj.concesionarioid = this.authService.getConcesionario().id;
    this.showLoading();
    this.cotizacionService.crearCotizacion(obj).then(resp => {
      this.dismissLoading();
      ref.close( true );
    }).catch(err => {
      this.dismissLoading();
      this.showMessage(err.mensaje);
    });
  }

  public infoCotizacion(cotizacion: any, cliente): void {
    const ref = this.openDialog(InfoCotizacionComponent, null, null);
    ref.componentInstance.cliente = cliente;
    ref.componentInstance.vehiculo = cotizacion.vehiculo;
    ref.componentInstance.usuario = cotizacion.agente;
    ref.componentInstance.concesionario = cotizacion.concesionario;
  }

  public printCotizacion(cotizacion: any, cliente: any): void {
    const { vehiculo, agente, concesionario } = cotizacion;
    const contenido = {
      content: [
        {text: 'Información de la cotización', style: 'header'},
        'A continuación podrá visualizar los datos de la cotización.',
        '\n\n',
        {text: 'Datos del concesionario', style: 'title'},
        {
          style: 'table',
          table: {
            body: [
              ['Nombre', 'Dirección'],
              [concesionario.nombre, concesionario.direccion]
            ]
          }
        },
        {text: 'Datos del agente', style: 'title'},
        {
          style: 'table',
          table: {
            body: [
              ['Nombre', 'Correo'],
              [`${agente.nombres} ${agente.apellidos}`, agente.correo]
            ]
          }
        },
        {text: 'Datos del vehículo cotizado', style: 'title'},
        {
          style: 'table',
          table: {
            body: [
              ['Tipo:', vehiculo.tipo],
              ['Vehículo:', `${vehiculo.marca} ${vehiculo.linea} ${vehiculo.modelo}`],
              ['Color:', vehiculo.color],
              ['Cilindraje:', vehiculo.cc],
              ['Precio:', vehiculo.precio]
            ]
          }
        },
        {text: 'Datos del cliente', style: 'title'},
        {
          style: 'table',
          table: {
            body: [
              ['Nombre:', `${cliente.nombres} ${cliente.apellidos}`],
              ['Teléfono:', cliente.telefono],
              ['Correo:', cliente.correo]
            ]
          }
        },
        '\n\n',
        `La información aquí contenida es confidencial y debe ser tratada con propósitos informativos, la impresión de esta cotización no implica ningún compromiso entre ambas partes.`
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        title: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        table: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      }
    };

    this.showLoading();
    this.pdfService.generatePdf(contenido).then(() => {
      this.dismissLoading();
    }).catch(err => {
      this.dismissLoading();
      this.showMessage(err.mensaje);
    });
  }

}
