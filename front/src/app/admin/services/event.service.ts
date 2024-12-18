import { Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // obtengo la ruta aqui porque un servicio se ejecuta antes que los componentes, de esta manera ya tengo aqui datos de la ruta para usarlo en mi componente
  // obtener el ultimo segemento al finalizar la navegación a otra ruta //
  private lastSegmentUrlSubject = new BehaviorSubject<string>('');
  lastSegmentUrl$ = this.lastSegmentUrlSubject.asObservable();

  constructor( private router:Router ){

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe( (event:NavigationEnd) => {
          const lastSegment = event.urlAfterRedirects.split('/').pop() || ''; // pongo '' porque puede ser que lastsegmet sea undefined
          this.lastSegmentUrlSubject.next(lastSegment); // Emitir el último segmento despues de navegar a otra ruta
        })
  }

  // signal para abrir y cerrar el sidebar //
  isSidebarOpen = signal(false);
  toggleSidebar() {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }

}


