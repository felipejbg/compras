import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { ListaComponent } from './lista/lista.component';
import { ProdutoComponent } from './produto/produto.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'listas', component: ListaComponent },
    { path: 'produtos/:id', component: ProdutoComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRouting {}
