import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Lista, Produto } from '../models/lista.model';
import { ListaService } from '../lista/lista.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  lista: Lista;

  constructor(
    private listaService: ListaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.listaService.getListaById(this.route.snapshot.params['id'])
    .subscribe(li => {
      this.lista = li
    });
  }

  // Para fazer a tabela em zebra
  isPar(i: number): boolean {
    return ((i%2) === 0)
  }

  addProduto(nomeProduto,tipoProduto) {
    this.lista.produto.push(new Produto(nomeProduto,tipoProduto));
  }

  delete(produto) {
    this.lista.produto.splice(this.lista.produto.indexOf(produto),1)
  }

  salvar() {
    this.listaService.atualizaLista(this.lista).subscribe(
      lista => console.log(`Lista atualizada ${lista.nome}`)
    );
  }

}
