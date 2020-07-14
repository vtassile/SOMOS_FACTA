import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { NgxDataTableModule } from "angular-9-datatable";

import { User } from "@shared";
import { MDia } from '@shared';
import { TMenu } from '@shared';
import { TMov } from '@shared';
import { Reserva } from '@shared';


import { UserService } from "@shared/services/user.service";
import { SeteoService } from "@shared/services/seteo.service";
import { SesionService } from "@shared/services/sesion.service";
import { TMovService } from '@shared/services/tmov.service';

import { MDiaService } from '@shared/services/mdia.service';
import { TMenuService } from '@shared/services/tmenu.service';
import { ReservaService } from '@shared/services/reserva.service';


@Component({
  selector: 'app-reserva',
  templateUrl: './tusuario.component.html',
  styleUrls: ['./tusuario.component.scss'],
})

export class TUsuarioComponent implements OnInit {
  public identity;
  public token;
  public fecha_servidor;
  agente: any = {};
  angForm_2: FormGroup;
  tmenus: TMenu[];
  mdias: MDia[];
  tmovs: TMov[];
  reservas: Reserva[];
  public accion;
  data: User[];
  public rol;

  public filterQuery = "";
  public rowsOnPage = 20;
  public sortBy = "usuario.s_username";
  public sortOrder = "asc";
  public campo1 = "usuario";
  public campo2 = "s_username";
  public query3 = "";

  constructor(public router: Router, private mdiaservice: MDiaService,
    private _sesionService: SesionService,
    private tmenuservice: TMenuService,
    private tmovservice: TMovService,
    private reservaservice: ReservaService,
    private _userService: UserService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.accion = "Si";

    if (localStorage.getItem('isLoggedin')) {
      this.identity = this._sesionService.getIdentity();
      this.rol = parseInt(this.identity.rol.n_nivel);
      this.token = this._sesionService.getToken();

    }

    this._userService
      .tget()
      .subscribe((data: User[]) => {
        this.data = data;


      });

    this.reservaservice
      .get_combo("Si", "No")
      .subscribe((data2: Reserva[]) => { this.reservas = data2; });


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

  }


  delete(id) {
    this._userService.delete(id)
      .subscribe(res => {
        alert('El Usuario se Borro Exitosamente');
        this.router.navigate(["tusuarios"]);
      });
  }

  resetea(id) {

    this._userService.resetea(id, "clave2020")
      .subscribe(res => {
        alert('Reseteado de Clave de Usuario Exitosa');
        this.router.navigate(["tusuarios"]);
      });
  }



}

