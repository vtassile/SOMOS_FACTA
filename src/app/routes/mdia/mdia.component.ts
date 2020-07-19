import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


import { MDiaService } from '@shared/services/mdia.service';
import { TMenuService } from '@shared/services/tmenu.service';

import { MDia } from '@shared';
import { TMenu } from '@shared';

@Component({
  selector: 'mdia-tables',
  templateUrl: './mdia.component.html',
  styleUrls: ['./mdia.component.scss'],
})

export class MDiaComponent implements OnInit {
  data = null;
  tmenus: TMenu[];

  displayedColumns: string[] = ['edita', 'f_fecha', 'tmenu.s_detalle', 's_detmenu', 'imagen', 'actions'];

  currentScreenWidth: string = '';

  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "f_fecha";
  public sortOrder = "desc";
  public campo1 = "usuario";
  public campo2 = "s_username";

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private mdiaservice: MDiaService,
    private router: Router,
    private tmenuservice: TMenuService) { }

  ngOnInit() {
    this.tmenuservice
      .get()
      .subscribe((data: TMenu[]) => {
        this.tmenus = data;
      });
    this.refresca();
  }

  delete(registro) {
    this.mdiaservice.delete(registro._id)
      .subscribe(res => {
        alert("El Menu se Eliminó con Exito");
        this.refresca();
        //          window.location.reload(true)
      });
  }

  refresca() {
    this.mdiaservice
      .get()
      .subscribe((data2: MDia[]) => {
        this.data = data2;
        this.data = new MatTableDataSource(data2);
        this.data.paginator = this.paginator;
        console.log(this.data);
      });

  }

  modifica(parametro) {
    console.log("Esta pasando por aca");
    console.log(parametro);
    //  this.router.navigate(["n_mdia", parametro._id]);
  }

  add(){
   this.router.navigate(["n_mdia"]);

  }


}