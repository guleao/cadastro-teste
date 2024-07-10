import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { EditarComponent } from './editar/editar.component';

const routes: Routes = [
  { path: 'formulario', component: FormularioComponent },
  { path: 'editar/:codigo', component: EditarComponent },
  { path: '', component: ConsultaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
