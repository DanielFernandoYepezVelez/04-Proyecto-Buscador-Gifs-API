import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

/* Models */
import { Gif } from '../../models/gifs.model';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
})
export class ResultadosComponent {
  
  get resultados(): Gif[] {
    return this.gifService.resultados;
  }

  constructor(private gifService: GifsService) { }

}
