import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  host: {
    '(document:click)' : 'toggleModalPerfil($event)'
  }
})
export class HeaderComponent {

  @ViewChild('burger') burger!: ElementRef;
  @ViewChild('headerlogo') headerlogo!: ElementRef;
  @ViewChild('modalPerfil') modalPerfil!: ElementRef;

  usuarioConectado!: any;


  constructor(private eventService: EventService, public readonly authService: AuthService, private router:Router) {}

  // show/hide sidebar menu
  toggleSidebar() {
    this.eventService.toggleSidebar();
    this.headerlogo.nativeElement.classList.toggle('change-header')
    this.burger.nativeElement.classList.toggle('change-burger')
  }

  // show/hide modal perfil
  toggleModalPerfil(e:Event){
    const target = e.target as HTMLElement;
    if ( target.classList.contains('header__imgperfil')  ) {

      this.modalPerfil.nativeElement.classList.toggle('isopen-modal');

    } else if(target.closest('.header__modal')) {

      this.modalPerfil.nativeElement.classList.add('isopen-modal');
    }
    else {
      this.modalPerfil.nativeElement.classList.remove('isopen-modal');

    }
  }

  // logout
  logout(event: Event){
    event.preventDefault();
    this.authService.logout();
    this.router.navigateByUrl('/');


  }

}

