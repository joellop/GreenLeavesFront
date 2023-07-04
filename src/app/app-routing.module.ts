import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponenteComponent } from './components/formulario-componente/formulario-componente.component';

const routes: Routes = [
  {
    path:'formulario',
    component:FormularioComponenteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
