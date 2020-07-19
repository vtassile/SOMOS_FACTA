import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { MDia } from '@shared';
import { TMenu } from '@shared';

import { MDiaService } from '@shared/services/mdia.service';
import { TMenuService } from '@shared/services/tmenu.service';

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
  public alto_imagen=100;
  public calidad_imagen=70;

  constructor(public router: Router, private mdiaservice: MDiaService,
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
    console.log(this.angForm_2.value);
    this.mdiaservice.add(this.angForm_2.value);
    this.router.navigate([" "]);
  }

  cambia_valor(recipiente:string,valor: string) {
    this.angForm_2.get(recipiente).setValue(valor);
  }



}

