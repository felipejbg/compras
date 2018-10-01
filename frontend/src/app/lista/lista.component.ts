import { Component, OnInit } from '@angular/core';

import { ListaService } from './lista.service';
import { Lista } from '../models/lista.model';

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

  constructor(
    private listaService: ListaService
  ) { }

  ngOnInit() {
    this.getListas();
  }

  // Para fazer a tabela em zebra
  isPar(i: number): boolean {
    return ((i%2) === 0)
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
    
  }

  addProduto(produto) {
    var btnContainer = document.getElementById("tabelaProduto");
    

    /** Esse código abaixo é para adicionar uma linha em itens de uma lista. Não será usada aqui.
    if(btnContainer.className.endsWith('checked')) {
      btnContainer.classList.remove("checked");
      //this.produtoSave.splice(this.produtoSave.indexOf(produto), 1)
    } else {
      btnContainer.classList.add("checked");
      //this.produtoSave.push(produto);
    }*/
  }

}
