import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Observable, Subscription } from "rxjs";

import {MDiaService} from "@shared/services/mdia.service";
import {TMenuService} from "@shared/services/tmenu.service";
import {TMovService} from "@shared/services/tmov.service";
import {MoneyService} from "@shared/services/money.service";
import {ExcelService} from "@shared/services/excel.service";
import {ReservaService} from "@shared/services/reserva.service";
import {UserService } from "@shared/services/user.service";
import {SesionService  } from "@shared/services/sesion.service";

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

  displayedColumns: string[]= ['f_fecha','n_menu.s_detmenu','n_cantidad','importe','consumido', 'actions'];
  currentScreenWidth: string = '';
  
  public identity;
  public token;
  public rol;
  public mensaje;
  data_11: User[];
  keyword = 's_username';

  public fecha_servidor;
  agente: any = {};
  angForm_2: FormGroup;
  tmenus: TMenu[];
  mdias: MDia[];
  tmovs: TMov[];
  reservas =null;
  moneys: Money[];
  cuenta: any = {};
     
  @ViewChild(MatPaginator) paginator: MatPaginator;

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

    }
    this.mensaje = "Esta Pasando Perfecto";

    this._sesionService
      .fecha_servidor()
      .subscribe((data) => { this.fecha_servidor = data; });

    this._userService
      .get()
      .subscribe((data: User[]) => {
        this.data_11 = data;

      });

    this.reservaservice
      .get_filtro(this.identity._id)
      .subscribe((data2: Reserva[]) => { 
        this.reservas = new MatTableDataSource(data2);
        this.reservas.paginator = this.paginator;
      });

    this.tmovservice
      .get()
      .subscribe((data2: TMov[]) => { this.tmovs = data2; });

    this.tmenuservice
      .get()
      .subscribe((data: TMenu[]) => {
        this.tmenus = data;
        this.angForm_2 = this.fb.group({
          f_fecha: "",
          tmenu: this.tmenus[0]._id,
          s_detmenu: "",
          n_cupo: ""
        });
      });

    this.angForm_2 = this.fb.group({
      f_fecha: "",
      tmenu: "",
      s_detmenu: "",
      n_cupo: ""
    });

    this.moneyservice
      .get_filtro(this.identity._id)
      .subscribe((data2: Money[]) => {
        this.moneys = data2;
        this.obt_saldo(this.identity._id);
      });


  }


  obt_saldo(comensal) {
    return this.moneyservice
      .get_saldo(comensal)
      .subscribe((data2) => {
        this.cuenta = data2[0];
      });
  }

  delete(id) {
    this.reservaservice.delete(id)
      .subscribe(res => {
        alert("El Movimiento se Eliminó con Exito");
        this.reservaservice
          .get_filtro(this.identity._id)
          .subscribe((data2: Reserva[]) => { this.reservas = data2; });
      });
  }

  delete_m(id) {
    this.moneyservice.delete(id)
      .subscribe(res => {
        this.moneyservice
          .get_filtro(this.identity._id)
          .subscribe((data2: Money[]) => {
            this.moneys = data2;
            this.obt_saldo(this.identity._id);
            alert("El Movimiento se Eliminó con Exito");
          });
      });
  }

  receiveMessage($event) {
    if ($event = "Cambia") {
      this.reservaservice
        .get_filtro(this.identity._id)
        .subscribe((data2: Reserva[]) => {
          this.reservas = data2;

          this.moneyservice
            .get_filtro(this.identity._id)
            .subscribe((data2: Money[]) => {
              this.moneys = data2;
              this.obt_saldo(this.identity._id);
            });
        });
    }
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.moneys, 'Exporta');
  }

  selectEvent(result) {
    this.cambia_u(result.s_username);
  }

  cambia_u(usuario) {
    var guarda = usuario;
//    var indice = this.usuarios.indexOf(guarda);
//    this.identity._id = this.u_id[indice];
console.log(usuario);

    this.reservaservice
      .get_filtro(usuario._id)
      .subscribe((data2: Reserva[]) => { this.reservas = data2; });

    this.moneyservice
      .get_filtro(this.identity._id)
      .subscribe((data2: Money[]) => {
        this.moneys = data2;
        this.obt_saldo(this.identity._id);
      });


  }




}