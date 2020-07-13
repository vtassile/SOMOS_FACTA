import { Pipe, PipeTransform } from '@angular/core';
import { SesionService } from "@shared/services/sesion.service";

@Pipe({
  name: 'nivelMenu'
})
export class NivelMenuPipe implements PipeTransform {

  public identity;
  public rol;

  constructor(private _sesionService: SesionService) {
    if (localStorage.getItem('isLoggedin')) {
      this.identity = this._sesionService.getIdentity();
      this.rol = this.identity.rol.n_nivel;
    }
  }

  transform(menu: any): any {  
    return this.filtra_menu(menu);
  }

  filtra_menu(res) {
    let greaterTen = [];
    let tope = this.rol;
    for (let i = 0; i < res.length; i++) {
      var actual = res[i];
      if (actual.nivel <= tope) {
        if (actual.type == "sub") {
          var sub_actual = actual["children"];
          var actualiza = sub_actual.filter(sub_actual => sub_actual.nivel <= tope);
          actual["children"] = actualiza;
          greaterTen.push(actual);
        } else { greaterTen.push(actual); }
      }
    }
    return greaterTen;
  }

}
