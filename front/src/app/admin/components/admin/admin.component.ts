import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { ActivationEnd, Event, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  title!: string;

  constructor( private router:Router, public readonly eventService: EventService ){
    this.getDataRoute();
  }

  getDataRoute(){
    this.router.events
    .pipe(
      filter((event: Event): event is ActivationEnd => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    )
    .subscribe( ({title}) => {
      this.title = title;
      document.title = `Tagliatore - ${title}`;
    });
  }

}
