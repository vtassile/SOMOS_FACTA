import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ReservaService } from "@shared/services/reserva.service";
import { SesionService } from "@shared/services/sesion.service";

import { Reserva } from '@shared';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnChanges, OnInit {

  public identity;
  public token;
  public rol;

  reservas = null;
  cuenta: any = {};
  displayedColumns: string[] = ['f_fecha', 'n_menu.s_detmenu', 'n_cantidad', 'importe', 'consumido'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input('usuario') usuario: any;

  @Output()
  propaga_reserva = new EventEmitter<string>();

  constructor(private reservaservice: ReservaService,
    private _sesionService: SesionService) { }

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedin')) {
      this.identity = this._sesionService.getIdentity();
      this.rol = parseInt(this.identity.rol.n_nivel);
      this.token = this._sesionService.getToken();
      if (this.rol > 2) {
        this.displayedColumns = ['f_fecha', 'n_menu.s_detmenu', 'n_cantidad', 'importe', 'consumido', 'actions'];
      }
    }

    this.reservaservice
      .get_filtro(this.usuario._id)
      .subscribe((data2: Reserva[]) => {
        this.reservas = new MatTableDataSource(data2);
        this.reservas.paginator = this.paginator;
      });

  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.reservaservice
      .get_filtro(this.usuario._id)
      .subscribe((data2: Reserva[]) => {
        this.reservas = new MatTableDataSource(data2);
        this.reservas.paginator = this.paginator;
      });
  }

  delete(elemento) {
    this.reservaservice.delete(elemento._id)
      .subscribe(res => {
        alert("El Movimiento se Eliminó con Exito");
        this.reservaservice
          .get_filtro(this.usuario._id)
          .subscribe((data2: Reserva[]) => {
            this.reservas = data2;
            this.propaga_reserva.emit("borrar");
            alert("El Movimiento se Eliminó con Exito");
          });
      });
  }



}
