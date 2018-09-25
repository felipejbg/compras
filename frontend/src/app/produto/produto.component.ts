import { Component, OnInit } from '@angular/core';

import { ProdutoService } from './produto.service';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  filtroAtual: string = 'Tudo';
  produtos: Produto[];
  todosProdutos: Produto[];

  constructor(
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this.getProdutos();
  }

  getProdutos(): void {
    this.produtoService.getProdutos()
      .subscribe(produtos => {
        this.todosProdutos = produtos
        this.produtos = produtos
      });
  }

  insereProduto(nome: string, tipo: string) {
    let p: Produto = new Produto();
    p.nome = nome;
    p.tipo = tipo;
    this.produtoService.insereProduto(p)
      .subscribe((produto: Produto) => {
        console.log(`Produto inserido: ${produto.nome}`)
        this.todosProdutos.push(p)
        if(this.filtroAtual === p.tipo || this.filtroAtual === 'all') this.produtos.push(p)
      });
  }

  delete(produto: Produto): void {
    this.todosProdutos = this.todosProdutos.filter(p => p !== produto);
    this.produtos = this.produtos.filter(p => p !== produto);
    this.produtoService.deleteProduto(produto).subscribe();
  }

  openForm() {
    document.getElementById("myForm").style.display = "block";
  }

  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  filtro(valor) {
    this.filtroAtual = valor
    if(this.filtroAtual === 'Tudo') {
      this.produtos = this.todosProdutos;
    } else {
      this.produtos = [];
      for(let i=0; i<this.todosProdutos.length; i++) {
        if(this.todosProdutos[i].tipo === this.filtroAtual) {
          this.produtos.push(this.todosProdutos[i]);
        }
      }
    }
  }

}
