import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { MDia } from '@shared';
import { TMenu } from '@shared';

import { MDiaService } from '@shared/services/mdia.service';
import { TMenuService } from '@shared/services/tmenu.service';
import { SesionService } from "@shared/services/sesion.service";

@Component({
  selector: 'app-n-mdia',
  templateUrl: './n-mdia.component.html',
  styleUrls: ['./n-mdia.component.scss']
})

export class NMDiaComponent implements OnInit {
  agente: any = {};
  angForm_2: FormGroup;
  tmenus: TMenu[];
  mdias: MDia[];
  public ancho_imagen=400;
  public alto_imagen=200;
  public calidad_imagen=70;

  constructor(public router: Router, private mdiaservice: MDiaService,private _sesionService: SesionService,
    private tmenuservice: TMenuService, private fb: FormBuilder) { }

  ngOnInit() {

    this.tmenuservice
      .get()
      .subscribe((data: TMenu[]) => {
        this.tmenus = data;
        this.angForm_2 = this.fb.group({
          f_fecha: "",
          tmenu: this.tmenus[0]._id,
          s_detmenu: "",
          n_cupo: "",
          s_imagen: "assets/images/plato_vacio.jpg"
        });
      });

    this.angForm_2 = this.fb.group({
      f_fecha: "",
      tmenu: "",
      s_detmenu: "",
      n_cupo: "",
      s_imagen: "assets/images/plato_vacio.jpg"
    });

  }

  add(event: Event) {
    event.preventDefault();
    var fecha_corta=this._sesionService.fecha_corta(this.angForm_2.value.f_fecha);
    this.angForm_2.get("f_fecha").setValue(fecha_corta);
    this.mdiaservice.add(this.angForm_2.value);
    this._sesionService.mensaje("El Menú se Agregó con Exito");

    this.router.navigate([" "]);
  }

  cambia_valor(recipiente:string,valor: string) {
    this.angForm_2.get(recipiente).setValue(valor);
  }



}

