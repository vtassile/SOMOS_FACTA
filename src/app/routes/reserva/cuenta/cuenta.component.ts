import { Component, OnInit,ViewChild,Input,OnChanges, SimpleChange,Output, EventEmitter  } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import {MoneyService} from "@shared/services/money.service";
import {SesionService  } from "@shared/services/sesion.service";

import { Money } from '@shared';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnChanges,OnInit  {

  public identity;
  public token;
  public rol;
  
  public moneys = null;

  cuenta: any = {};
  displayedColumns: string[]= ['f_fecha','detalle','importe_d','importe_h'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input('usuario') usuario: any;

  @Output()
  propaga_money = new EventEmitter<string>();

  constructor(private moneyservice: MoneyService,    private _sesionService: SesionService) { }

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedin')) {
      this.identity = this._sesionService.getIdentity();
      this.rol = parseInt(this.identity.rol.n_nivel);
      this.token = this._sesionService.getToken();      
      if(this.rol>2){
        this.displayedColumns= ['f_fecha','detalle','importe_d','importe_h','actions'];
      }  
    }
   
    this.moneyservice
      .get_filtro(this.usuario._id)
      .subscribe((data2: Money[]) => {
        this.moneys = new MatTableDataSource(data2);
        this.moneys.paginator = this.paginator;
      });

  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.moneyservice
      .get_filtro(this.usuario._id)
      .subscribe((data2: Money[]) => {
        this.moneys = new MatTableDataSource(data2);
        this.moneys.paginator = this.paginator;

      });
  }

  delete_m(elemento) {
    this.moneyservice.delete(elemento._id)
      .subscribe(res => {
        this.moneyservice
          .get_filtro(this.usuario._id)
          .subscribe((data2: Money[]) => {
            this.moneys = data2;
            this.propaga_money.emit("borrar");
            alert("El Movimiento se Eliminó con Exito");
          });
      });
  }

}
