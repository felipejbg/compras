import { Component, OnInit } from '@angular/core';
import { Lista } from '../models/lista.model';
import { ListaService } from './lista.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  listas: Lista[] = [];

  constructor(
    private listaService: ListaService
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

  // Para fazer a tabela em zebra
  isPar(i: number): boolean {
    return ((i%2) === 0)
  }

}
