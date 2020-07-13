import { Component, Input } from '@angular/core';
import { MenuService } from '@core';
import { SesionService } from "@shared/services/sesion.service";

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
})
export class SidemenuComponent {
  // NOTE: Ripple effect make page flashing on mobile
  public identity;
  public token;
  public par_ingre;
 
  @Input() ripple = false;

  menus = this.menuService.getAll();
 
  constructor(private menuService: MenuService,private _sesionService: SesionService) {
    if (localStorage.getItem('isLoggedin')) {
      this.identity = this._sesionService.getIdentity();
      this.token = this._sesionService.getToken();
    }


  }

  // Delete empty values and rebuild route
  buildRoute(routes: string[]) {
    let route = '';
    routes.forEach(item => {
      if (item && item.trim()) {
        route += '/' + item.replace(/^\/+|\/+$/g, '');
      }
    });
    return route;
  }
}
