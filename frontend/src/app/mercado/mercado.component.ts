import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Lista } from '../models/lista.model';
import { ListaService } from '../lista/lista.service';
import { ProdutoService } from '../produto/produto.service';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.component.html',
  styleUrls: ['./mercado.component.css']
})
export class MercadoComponent implements OnInit {

  listas: Lista[] = [];
  produtos: Produto[] = []

  mostraLista: boolean = true;

  constructor(
    private listaService: ListaService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this.getListas();
  }

  getListas(): void {
    this.listaService.getListas()
    .subscribe(li => {
      this.listas = li
    });
  }

  isPar(i: number): boolean {
    return ((i%2) === 0)
  }

  mostraProdutos(lista: Lista) {
    this.produtoService.getProdutos(lista._id).subscribe(p => {
      this.produtos = p;
    });
    this.mostraLista = false;
  }

  voltar() {
    this.mostraLista = true;
  }

  checado(i) {
    document.getElementById(i).classList.toggle('checked');
  }

}
