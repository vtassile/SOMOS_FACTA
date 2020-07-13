import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';

import { SesionService } from "@shared/services/sesion.service";

import { ARCHIVOS } from "@shared";
import { CLAVES } from "@shared";

@Component({
  selector: 'app-carga-imagen',
  templateUrl: './carga-imagen.component.html',
  styleUrls: ['./carga-imagen.component.css']
})
export class CargaImagenComponent implements OnInit {

  @Input("imagen_ingreso") imagen_ingreso: string;
  @Input("ancho") ancho:number;
  @Input("alto") alto:number;
  @Input("calidad") calidad:number;
  

  @Output() imagen_salida = new EventEmitter<string>();
  public imagen = "assets/images/sonriente.jpg";
  public token;
  public uploader;
  

  constructor(private _sesionService: SesionService) {
  }

  ngOnInit() {
   
    this.uploader = new FileUploader({
      url: ARCHIVOS.uploadAPI.toString(),
      authToken: this.token,
      itemAlias: "file",
      additionalParameter: { 'ancho': this.ancho, 'alto': this.alto, 'calidad': this.calidad }
    });



    this.imagen = this.imagen_ingreso;
    if (localStorage.getItem('isLoggedin')) {
      this.token = this._sesionService.getToken();

    }

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
      this.uploader.uploadAll();
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
     // console.log("FileUpload:uploaded successfully:", item, status, response);
      if (status == 200) {
        this.imagen = ARCHIVOS.readAPI.toString() + JSON.parse(response);
        this.imagen_c(this.imagen);
      }
    };


  }

  imagen_c(imagen: string) {
    this.imagen_salida.emit(imagen);
  }

}
