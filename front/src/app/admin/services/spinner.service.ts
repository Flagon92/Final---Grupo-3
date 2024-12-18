import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  /* Uso BehaviorSubject porque requiere un valor inicial y porque emite el valor actual a todos los componentes
  suscritos al observable, de esa manera todos los componentes conocen el estado actual de los datos*/

  private spinner = new BehaviorSubject<boolean>(false); // inicializo con false para que el spinner no se muestre
  spinner$ = this.spinner.asObservable();

  showSpinner(): void {
    this.spinner.next(true); // next: emite un nuevo valor(true) y los suscriptores recibiran el nuevo valor
  }

  hideSpinner(): void {
    this.spinner.next(false);
  }

}

