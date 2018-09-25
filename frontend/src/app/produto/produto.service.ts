import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { API } from '../app.api';
import { ErrorHandler } from '../app.error-handler';
import { Produto } from '../models/produto.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient
  ) { }

  getProdutos (): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${API}/produto/sort`)
      .pipe(
        tap(produto => console.log('Backend OK')),
        catchError(ErrorHandler.handleError)
      );
  }

  insereProduto(valor: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${API}/produto`, valor, httpOptions).pipe(
      tap((produto: Produto) => console.log(`Produto inserido id=${produto._id}`)),
      catchError(ErrorHandler.handleError)
    );
  }

  deleteProduto(produto: Produto): Observable<Produto> {
    const url = `${API}/produto/${produto._id}`;
    return this.http.delete<Produto>(url, httpOptions).pipe(
      tap(_ => console.log(`Produto deletado nome=${produto.nome}`)),
      catchError(ErrorHandler.handleError)
    );
  }

}
