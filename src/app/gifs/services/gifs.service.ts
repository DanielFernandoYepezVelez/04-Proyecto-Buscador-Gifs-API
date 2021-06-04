import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] = [];
  private _API_KEY = 'TIgWllXNbwcNMuLRb7eg4OnBcml2Q00k';

  constructor(private http: HttpClient) {}

  get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query) && query.length > 2) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    // console.log(this._historial);

    this.http.get('https://api.giphy.com/v1/gifs/search?api_key=TIgWllXNbwcNMuLRb7eg4OnBcml2Q00k&q=dragonBallZ')
            .subscribe((resp:any) => {
              console.log(resp.data);
            }); 
  }
}
