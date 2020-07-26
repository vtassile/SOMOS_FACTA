import { Component, OnInit } from '@angular/core';
import { SesionService } from "@shared/services/sesion.service";


@Component({
  selector: 'app-carnet-carnet',
  templateUrl: './carnet.component.html',
  styleUrls: ['./carnet.component.scss']
})
export class CarnetCarnetComponent implements OnInit {

  public identity;  // identidad del agente
  public token;  // token valido del agente
  public rol;   // rol del agente
  public imagen;   // imagen del agente

  constructor(private _sesionService: SesionService,
    ) { }

  ngOnInit() {
    if (localStorage.getItem('isLoggedin')) {
      this.identity = this._sesionService.getIdentity();
      this.rol = parseInt(this.identity.rol.n_nivel);
      this.token = this._sesionService.getToken();
      this.imagen = this.identity.s_imagen;
      console.log(this.identity);
      console.log(this.identity.s_imagen);
    }
  }

}
