import { Component, OnInit } from '@angular/core';

import { ListaService } from './lista.service';
import { ProdutoService } from '../produto/produto.service';
import { ProdutoListaService } from './produto-lista.service';
import { Lista } from '../models/lista.model';
import { Produto } from '../models/produto.model';
import { ProdutoLista } from '../models/produto-lista.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  mostraLista: boolean = true;
  mostraProdutos: boolean = false;

  listas: Lista[] = [];
  listaSelecionada: Lista = new Lista();

  produto: Produto[] = [];
  produtoSave: Produto[] = [];

  constructor(
    private listaService: ListaService,
    private produtoService: ProdutoService,
    private produtoListaService: ProdutoListaService
  ) { }

  ngOnInit() {
    this.getListas();
    this.getProdutos();
  }

  // Para fazer a tabela em zebra
  isPar(i: number): boolean {
    return ((i%2) === 0)
  }

  getProdutos(): void {
    this.produtoService.getProdutos()
      .subscribe(produtos => {
        this.produto = produtos
      });
  }

  getListas(): void {
    this.listaService.getListas()
    .subscribe(li => {
      this.listas = li
    });
  }

  novaLista(nomeLista: string, dataLista: string) {
    let l: Lista = new Lista();
    l.nome = nomeLista;
    l.data = dataLista;
    this.listaService.insereLista(l)
      .subscribe((lista: Lista) => {
        console.log(`Lista inserida: ${lista.nome}`)
        this.listas.push(l)
    });
  }

  delete(lista: Lista): void {
    this.listas = this.listas.filter(l => l !== lista);
    this.listaService.deleteLista(lista).subscribe();
    this.produtoListaService.deleteProdutoNaLista(lista);
  }

  produtos(lista: Lista) {
    this.mostraLista = false;
    this.mostraProdutos = true;
    this.listaSelecionada = lista;
  }

  voltar() {
    this.mostraLista = true;
    this.mostraProdutos = false;
  }

  salvar() {
    console.log(this.produtoSave.length)
    for(let i=0; i<this.produtoSave.length; i++) {
      let produtoLista: ProdutoLista = new ProdutoLista();
      produtoLista.id_lista = this.listaSelecionada._id;
      produtoLista.id_produto = this.produtoSave[i]._id;
      this.produtoListaService.adicionaProdutoNaLista(produtoLista).subscribe();
    }
  }

  addProduto(produto: Produto) {
    console.log(produto._id + ' ' + produto.nome)
    var btnContainer = document.getElementById(produto._id);
    if(btnContainer.className.endsWith('checked')) {
      btnContainer.classList.remove("checked");
      this.produtoSave.splice(this.produtoSave.indexOf(produto), 1)
    } else {
      btnContainer.classList.add("checked");
      this.produtoSave.push(produto);
    }
  }

}
