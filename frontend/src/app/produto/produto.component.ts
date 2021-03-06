import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Lista } from '../models/lista.model';
import { ListaService } from '../lista/lista.service';
import { Produto } from '../models/produto.model';
import { ProdutoService } from './produto.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  lista: Lista;
  produtos: Produto[] = []

  constructor(
    private listaService: ListaService,
    private produtoService: ProdutoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.listaService.getListaById(this.route.snapshot.params['id']).subscribe(li => {
      this.lista = li
      this.getProdutos();
    });
  }

  getProdutos() {
    this.produtoService.getProdutos(this.route.snapshot.params['id']).subscribe(p => {
      this.produtos = p;
    });
  }

  // Para fazer a tabela em zebra
  isPar(i: number): boolean {
    return ((i%2) === 0)
  }

  addProduto(nomeProduto,tipoProduto) {
    let p: Produto = new Produto()
    p.idlista = this.lista._id
    p.nome = nomeProduto
    p.tipo = tipoProduto
    this.produtos.push(p);
  }

  delete(produto: Produto) {
    this.produtos.splice(this.produtos.indexOf(produto),1)
    this.produtoService.deleteProduto(produto).subscribe();
  }

  salvar() {
    console.log(`Salvando... ${this.produtos}`)
    for(let i=0; i<this.produtos.length; i++) {
      console.log(`this.produtos[i]._id ${this.produtos[i]._id}`)
      if(this.produtos[i]._id === undefined)
        this.produtoService.insereProduto(this.produtos[i]).subscribe();
      //else  // ainda não tem a opção de atualizar produtos.
      //  this.produtoService.atualizaProduto(this.produtos[i]).subscribe();
    }
  }

}
