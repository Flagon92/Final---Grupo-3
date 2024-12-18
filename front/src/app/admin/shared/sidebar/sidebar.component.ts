import { Component, ViewChildren, QueryList, ElementRef, ViewChild, AfterViewInit,  OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  host: {
    '(click)': 'openCloseMenu($event)',
  }
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy  {

  menu:any[] = [];
  @ViewChildren('menuItem') listaMenu!: QueryList<ElementRef>;
  @ViewChild('burger') burger!: ElementRef;
  @ViewChild('sidebar') sidebar!: ElementRef;
  lastSegment!: null | string
  private destroy$ = new Subject<void>(); // Crea un Subject que no emite ningún valor, lo uso para el unsuscribed

  constructor( private router: Router, private siderbarService: SidebarService, public readonly eventService:EventService, private route: ActivatedRoute ){
    this.menu = siderbarService.menu
  }

  // show / hide submenu
  openCloseMenu(event:Event){

    const target = event.target as HTMLElement;

    if (target.closest('.menu_item')) {

      this.listaMenu.forEach( item => {
          if ( item.nativeElement.querySelector('.submenu')) {

            item.nativeElement.classList.add('showSubmenu');
            const listaFiltrada = [...this.listaMenu].filter( el => el.nativeElement !== target.closest('.menu_item') );

            listaFiltrada.forEach( el => {
              el.nativeElement.classList.remove('showSubmenu')
            })
          }
      });

    }

  }

  ngOnInit() {
    this.eventService.lastSegmentUrl$.pipe(
      takeUntil(this.destroy$) // cuando destroy$ emite un valor takeUntil completa y desuscribe el observable principal(lastSegmentUrl$)
    ).subscribe({
      next: (lastSegment) => {
        this.lastSegment = lastSegment;
      }
    });
  }

  ngAfterViewInit() {
    // para mantener abierto el menu cuando se navegue a otra ruta o se actualicé la página
    this.listaMenu.forEach(item =>{
      const lista = item.nativeElement.querySelectorAll(' ul > li');
      lista.forEach( (li:any) => {
        if (this.lastSegment === li.dataset.menu) {
          item.nativeElement.classList.add('showSubmenu');
        }
      })
    })
  }

  ngOnDestroy() {
    this.destroy$.next(); //emite un valor
    this.destroy$.complete(); // observable completado
  }

}
