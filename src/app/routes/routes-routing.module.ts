import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';

import { AdminLayoutComponent } from '../theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '../theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './sessions/login/login.component';
import { RegisterComponent } from './sessions/register/register.component';

import { AuthGuard } from '@shared';


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',canActivate: [AuthGuard],
        component: DashboardComponent,
        data: { title: 'Dashboard', titleI18n: 'dashboard' },
      },
      {
        path: 'sessions',
        loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Sessions', titleI18n: 'Sessions' },
      },
  { path: 'configura', loadChildren: () => import('./configura/configura.module').then(m => m.ConfiguraModule) },
  { path: 'musuario', loadChildren: () => import('./musuario/musuario.module').then(m => m.MusuarioModule) },
  { path: 'tusuario', loadChildren: () => import('./tusuario/tusuario.module').then(m => m.TUsuarioModule) },
  { path: 'dinning_room/reserva', loadChildren: () => import('./reserva/reserva.module').then(m => m.ReservaModule) },
  { path: 'dinning_room/mdia', loadChildren: () => import('./mdia/mdia.module').then(m => m.MDiaModule) },
  { path: 'n_mdia', loadChildren: () => import('./n-mdia/n-mdia.module').then(m => m.NMDiaModule) },
  { path: 'carnet', loadChildren: () => import('./carnet/carnet.module').then(m => m.CarnetModule) },    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login', titleI18n: 'Login' },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Register', titleI18n: 'Register' },
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      enableTracing: false
    }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class RoutesRoutingModule {}
