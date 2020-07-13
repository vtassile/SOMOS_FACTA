import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { SesionService } from "@shared/services/sesion.service";

@Injectable()

export class StartupService {

  public identity;
  public rol;

  constructor(private menuService: MenuService, private http: HttpClient, private _sesionService: SesionService) {
    if (localStorage.getItem('isLoggedin')) {
      this.identity = this._sesionService.getIdentity();
      this.rol = this.identity.rol.n_nivel;
    }

  }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      var archivo = 'assets/data/menu.json?_t=';
      this.http
        .get(archivo + Date.now())
        .pipe(
          catchError(res => {
            resolve();
            return res;
          })
        )
        .subscribe(
          (res: any) => {
            this.menuService.recursMenuForTranslation(res.menu, 'menu');
            this.menuService.set(res.menu);
          },
          () => { },
          () => {
            resolve();
          }
        );
    });
  }


}
