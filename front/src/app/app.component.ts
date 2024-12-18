import { Component } from '@angular/core';
import { ActivationEnd, Event, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './admin/shared/header/header.component';
import { SidebarComponent } from './admin/shared/sidebar/sidebar.component';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title!: string;

  constructor( private router:Router ){
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
      document.title = `Oficios LDC - ${title}`;
    });
  }
}
