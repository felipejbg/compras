import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { API } from '../app.api';
import { Lista } from '../models/lista.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  constructor(
    private http: HttpClient
  ) { }

  getListas (): Observable<Lista[]> {
    return this.http.get<Lista[]>(`${API}/lista/sort`)
      .pipe(
        tap(lista => console.log('Carregado lista ordenada por data.'))
      );
  }

  insereLista(valor: Lista): Observable<Lista> {
    return this.http.post<Lista>(`${API}/lista`, valor, httpOptions).pipe(
      tap((lista: Lista) => console.log(`Lista inserida id=${lista._id}`))
    );
  }

  deleteLista(lista: Lista): Observable<Lista> {
    const url = `${API}/lista/${lista._id}`;
    return this.http.delete<Lista>(url, httpOptions).pipe(
      tap(_ => console.log(`Lista deletada nome=${lista.nome}`))
    );
  }

}
