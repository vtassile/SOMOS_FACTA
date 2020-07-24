import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Observable, Subscription } from "rxjs";

import { MDiaService } from "@shared/services/mdia.service";
import { TMenuService } from "@shared/services/tmenu.service";
import { TMovService } from "@shared/services/tmov.service";
import { MoneyService } from "@shared/services/money.service";
import { ExcelService } from "@shared/services/excel.service";
import { ReservaService } from "@shared/services/reserva.service";
import { UserService } from "@shared/services/user.service";
import { SesionService } from "@shared/services/sesion.service";

import { User } from "@shared";
import { MDia } from '@shared';
import { TMenu } from '@shared';
import { TMov } from '@shared';
import { Reserva } from '@shared';
import { Money } from '@shared';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss'],
})

export class ReservaComponent implements OnInit {

  currentScreenWidth: string = '';

  public identity;
  public token;
  public rol;
  public mensaje;
  data_11: User[];
  keyword = 's_username';
  public usuario;

  public fecha_servidor;
  agente: any = {};
  tmenus: TMenu[];
  mdias: MDia[];
  tmovs: TMov[];
  reservas = null;
  moneys: Money[];
  cuenta: any = {};

  constructor(public router: Router, private mdiaservice: MDiaService,
    private tmenuservice: TMenuService,
    private tmovservice: TMovService,
    private moneyservice: MoneyService,
    private excelService: ExcelService,
    private reservaservice: ReservaService,
    private _userService: UserService,
    private _sesionService: SesionService,
    private fb: FormBuilder) { }

  ngOnInit() {

    if (localStorage.getItem('isLoggedin')) {
      this.identity = this._sesionService.getIdentity();
      this.rol = parseInt(this.identity.rol.n_nivel);
      this.token = this._sesionService.getToken();
      this.usuario = this.identity;
    }

    this._sesionService
      .fecha_servidor()
      .subscribe((data) => { this.fecha_servidor = data; });

    this._userService
      .get()
      .subscribe((data: User[]) => {
        this.data_11 = data;
        //      console.log(this.data_11);
      });

    this.reservaservice
      .get_filtro(this.usuario._id)
      .subscribe((data2: Reserva[]) => {
        this.reservas = data2;
      });

    this.tmovservice
      .get()
      .subscribe((data2: TMov[]) => { this.tmovs = data2; });

    this.tmenuservice
      .get()
      .subscribe((data: TMenu[]) => {
        this.tmenus = data;
      });

    this.moneyservice
      .get_filtro(this.usuario._id)
      .subscribe((data2: Money[]) => {
        this.moneys = data2;
        this.obt_saldo(this.usuario._id);
      });

  }

  obt_saldo(comensal) {
    return this.moneyservice
      .get_saldo(comensal)
      .subscribe((data2) => {
        this.cuenta = data2[0];
      });
  }

  actualiza_money(motivo_cambio) {
    this.obt_saldo(this.usuario._id);
  }

  actualiza_reserva(motivo_cambio) {
    this.reservaservice
      .get_filtro(this.usuario._id)
      .subscribe((data2: Reserva[]) => {
        this.reservas = data2;
      });
  }

  actualiza_todo(motivo_cambio) {
      this.reservaservice
        .get_filtro(this.usuario._id)
        .subscribe((data2: Reserva[]) => {
          this.reservas = data2;

          this.moneyservice
            .get_filtro(this.usuario._id)
            .subscribe((data2: Money[]) => {
              this.moneys = data2;
              this.obt_saldo(this.usuario._id);
            });
        });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.moneys, 'Exporta');
  }

  selectEvent(result) {
    this.cambia_u(result.s_username);
  }

  cambia_u(usuario) {
    var guarda = usuario;
    var indice = this.data_11.filter(base => base.s_username == usuario);
    if (indice) {
      this.usuario = indice[0];
      this.reservaservice
        .get_filtro(this.usuario._id)
        .subscribe((data2: Reserva[]) => { this.reservas = data2; });
      this.moneyservice
        .get_filtro(this.usuario._id)
        .subscribe((data2: Money[]) => {
          this.moneys = data2;

          this.moneyservice
            .get_saldo(this.usuario._id)
            .subscribe((data2) => {
              this.cuenta = data2[0];
            });
          this.obt_saldo(this.usuario._id);
        });
    }

  }




}