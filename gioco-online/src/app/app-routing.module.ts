import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiocatoriComponent } from './giocatori/giocatori.component';
import { GiochiComponent } from './giochi/giochi.component';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { PartitaComponent } from './partita/partita.component';
import { PartiteComponent } from './partite/partite.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'partita/:id', component: PartitaComponent, canActivate: [LoginGuard]},
  { path: 'partite', component: PartiteComponent, canActivate: [LoginGuard]},
  { path: 'giocatori', component: GiocatoriComponent, canActivate: [LoginGuard]},
  { path: 'giochi', component: GiochiComponent, canActivate: [LoginGuard]},
  { path: '**', redirectTo: 'giochi' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
