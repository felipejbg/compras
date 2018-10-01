import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { ListaComponent } from './lista/lista.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'listas', component: ListaComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRouting {}
