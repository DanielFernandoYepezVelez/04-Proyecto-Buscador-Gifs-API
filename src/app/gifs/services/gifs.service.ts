import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

/* Models */
import { Gif, SearchGifsResponse } from '../models/gifs.model';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private _historial: string[] = [];
  private _API_KEY = 'TIgWllXNbwcNMuLRb7eg4OnBcml2Q00k';
  private _SERVICE_URL = 'https://api.giphy.com/v1/gifs';

  public resultados: Gif[] = [];

  /* EL CONSTRUCTOR ES MUY IMPORTANTE EN EL CICLO DE VIDA DE LOS SERVICIOS */
  
  /* Por Que El Constructor Solo Se Ejecuta La Primera Y Única Vez Que 
  Se LLame El Servicio */

  /* No Importa que tenga 26 páginas donde se llame el servicio, por que el
  constructor solo se ejecuta una vez, por que los servicios trabajan como si
  fueran un singleton */

  /* Me Sirve Para El Refresh De La Página */
  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    /* if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    } */
  }

  get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs(query: string = '') {
    
    query = query.trim().toLowerCase();

    if ((!this._historial.includes(query) && query.length > 0)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);  
    }

    /* Parametros Que Se Mandan Por La Url */
    const params = new HttpParams()
          .set('api_key', this._API_KEY)
          .set('q', query)
          .set('limit', '10');

    this.http.get<SearchGifsResponse>(`${this._SERVICE_URL}/search`, { params: params })
        .subscribe(resp => {
          this.resultados = resp.data
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
        });

    localStorage.setItem('historial', JSON.stringify(this._historial));
  }
}
