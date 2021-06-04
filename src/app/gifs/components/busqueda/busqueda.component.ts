import { Component, ElementRef, ViewChild } from '@angular/core';

/* Services */
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {
  /* (!) Estoy Seguro Que El Elemento No Va A Tener Valores Nulos,
  Por Que Pertenece Al HTML */
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  
  constructor(private gifsServices: GifsService) { 
  }

  buscar(value: string): void {
    // console.log(value);
    // console.log(this.txtBuscar);
    // console.log(this.txtBuscar.nativeElement);
    // console.log(this.txtBuscar.nativeElement.value);
    const valor: string = this.txtBuscar.nativeElement.value;
    this.gifsServices.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }
}
