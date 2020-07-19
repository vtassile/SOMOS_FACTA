
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Observable, Subscription } from "rxjs";

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

  displayedColumns: string[];
  currentScreenWidth: string = '';
  flexMediaWatcher: Subscription;

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
  // data: User[];
  public rol;
  data = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public router: Router, private mdiaservice: MDiaService,
    private _sesionService: SesionService,
    private tmenuservice: TMenuService,
    private tmovservice: TMovService,
    private reservaservice: ReservaService,
    private _userService: UserService,
    private fb: FormBuilder, private mediaObserver: MediaObserver) {
    this.flexMediaWatcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias !== this.currentScreenWidth) {
        this.currentScreenWidth = change.mqAlias;
        this.setupTable();
      }
    }); // Be sure to unsubscribe from this in onDestroy()!
  }

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
        //      this.data = data;
        this.data = new MatTableDataSource(data);
        this.data.paginator = this.paginator;
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

  setupTable() {
    this.displayedColumns= ['edita','s_username','s_name','s_surname','imageUrl','actions'];
    if (this.currentScreenWidth === 'xs') { // only display internalId on larger screens
      this.displayedColumns= ['edita','s_username','imageUrl','actions'];

    }
  };


  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }

  modifica(parametro) {
    console.log("Esta pasando por aca");
    console.log(parametro);
    this.router.navigate(["musuario/abc", parametro._id]);
  }

  delete(id) {
    this._userService.delete(id._id)
      .subscribe(res => {
        alert('El Usuario se Borro Exitosamente');
        this.router.navigate(["tusuarios"]);
      });
  }

  resetea(id) {
    this._userService.resetea(id._id, "clave2020")
      .subscribe(res => {
        alert('Reseteado de Clave de Usuario Exitosa');
        this.router.navigate(["tusuarios"]);
      });
  }



}
