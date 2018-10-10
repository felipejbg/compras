import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { ListaComponent } from './lista/lista.component';
import { ProdutoComponent } from './produto/produto.component';
import { MercadoComponent } from './mercado/mercado.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'listas', component: ListaComponent },
    { path: 'produtos/:id', component: ProdutoComponent },
    { path: 'lista-final', component: MercadoComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRouting {}
