import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Seteo } from '@shared';
import { SeteoService } from "@shared/services/seteo.service";

@Component({
  selector: 'app-configura-configura',
  templateUrl: './configura.component.html',
  styleUrls: ['./configura.component.css']
})
export class ConfiguraConfiguraComponent implements OnInit {

  public data: Seteo[];
  public angForm_2: FormGroup;
  public ancho_imagen = 100;
  public alto_imagen = 100;
  public calidad_imagen=70;
  public ancho_imagen_slider = 480;
  public alto_imagen_slider = 200;
  public calidad_imagen_slider = 70;


  constructor(private fb: FormBuilder, private seteoservice: SeteoService, private router: Router) { }

  ngOnInit() {

    this.seteoservice
      .get()
      .subscribe((data: Seteo[]) => {
        this.data = data;

        this.angForm_2 = this.fb.group({
          _id: "",
          l_reserva: 10,
          l_abono: 0,
          m_saldo: 0,
          m_viandas: 1,
          imagen_1: "assets/images/sonriente.jpg",
          imagen_2: "assets/images/sonriente.jpg",
          imagen_3: "assets/images/sonriente.jpg",
          imagen_4: "assets/images/sonriente.jpg",
          imagen_5: "assets/images/sonriente.jpg",
          imagen_6: "assets/images/sonriente.jpg",
          color_1: "assets/images/sonriente.jpg",
          color_2: "assets/images/sonriente.jpg",
          color_3: "assets/images/sonriente.jpg",
          color_4: "assets/images/sonriente.jpg",
          color_5: "assets/images/sonriente.jpg",
          color_6: "assets/images/sonriente.jpg",
          color_7: "assets/images/sonriente.jpg",
          color_8: "assets/images/sonriente.jpg",
          color_9: "assets/images/sonriente.jpg",
          color_10: "assets/images/sonriente.jpg",
          titulo_principal: "SOMOS FACTA",
          subtitulo_principal: "",
          titulo_footer: "",
          subtitulo1_footer: "",
          subtitulo2_footer: ""
        });

        if (this.data.length == 0) {
          this.seteoservice.add(this.angForm_2.value);
        } else {
          if (this.data[0]._id) { this.angForm_2.get("_id").setValue(this.data[0]._id); }
          if (this.data[0].l_reserva) { this.angForm_2.get("l_reserva").setValue(this.data[0].l_reserva); }
          if (this.data[0].l_abono) { this.angForm_2.get("l_abono").setValue(this.data[0].l_abono); }
          if (this.data[0].m_saldo) { this.angForm_2.get("m_saldo").setValue(this.data[0].m_saldo); }
          if (this.data[0].m_viandas) { this.angForm_2.get("m_viandas").setValue(this.data[0].m_viandas); }
          if (this.data[0].imagen_1) { this.angForm_2.get("imagen_1").setValue(this.data[0].imagen_1); }
          if (this.data[0].imagen_2) { this.angForm_2.get("imagen_2").setValue(this.data[0].imagen_2); }
          if (this.data[0].imagen_3) { this.angForm_2.get("imagen_3").setValue(this.data[0].imagen_3); }
          if (this.data[0].imagen_4) { this.angForm_2.get("imagen_4").setValue(this.data[0].imagen_4); }
          if (this.data[0].imagen_5) { this.angForm_2.get("imagen_5").setValue(this.data[0].imagen_5); }
          if (this.data[0].imagen_6) { this.angForm_2.get("imagen_6").setValue(this.data[0].imagen_6); }
          if (this.data[0].color_1) { this.angForm_2.get("color_1").setValue(this.data[0].color_1); }
          if (this.data[0].color_2) { this.angForm_2.get("color_2").setValue(this.data[0].color_2); }
          if (this.data[0].color_3) { this.angForm_2.get("color_3").setValue(this.data[0].color_3); }
          if (this.data[0].color_4) { this.angForm_2.get("color_4").setValue(this.data[0].color_4); }
          if (this.data[0].color_5) { this.angForm_2.get("color_5").setValue(this.data[0].color_5); }
          if (this.data[0].color_6) { this.angForm_2.get("color_6").setValue(this.data[0].color_6); }
          if (this.data[0].color_7) { this.angForm_2.get("color_7").setValue(this.data[0].color_7); }
          if (this.data[0].color_8) { this.angForm_2.get("color_8").setValue(this.data[0].color_8); }
          if (this.data[0].color_9) { this.angForm_2.get("color_9").setValue(this.data[0].color_9); }
          if (this.data[0].color_10) { this.angForm_2.get("color_10").setValue(this.data[0].color_10); }
          if (this.data[0].titulo_principal) { this.angForm_2.get("titulo_principal").setValue(this.data[0].titulo_principal); }
          if (this.data[0].subtitulo_principal) { this.angForm_2.get("subtitulo_principal").setValue(this.data[0].subtitulo_principal); }
          if (this.data[0].titulo_footer) { this.angForm_2.get("titulo_footer").setValue(this.data[0].titulo_footer); }
          if (this.data[0].subtitulo1_footer) { this.angForm_2.get("subtitulo1_footer").setValue(this.data[0].subtitulo1_footer); }
          if (this.data[0].subtitulo2_footer) { this.angForm_2.get("subtitulo2_footer").setValue(this.data[0].subtitulo2_footer); }
        }

      });

  }

  cambia_valor(recipiente: string, valor: string) {
    this.angForm_2.get(recipiente).setValue(valor);
  }

  update(event: Event) {
    event.preventDefault();
    this.seteoservice.update(this.angForm_2.value);
    this.router.navigate([""]);
  }

}
