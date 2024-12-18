import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivationEnd, Event, Router } from '@angular/router';

//services
import { ValidationsService } from '../../services/validations.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../services/spinner.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { filter, map } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  // imports: [ ReactiveFormsModule, CommonModule, SpinnerComponent ],
  imports: [ ReactiveFormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  title!: string;


  constructor( private toastr:ToastrService, public validationService: ValidationsService,
               private fb:FormBuilder, private readonly authService: AuthService, private router: Router,
               private spinnerService:SpinnerService ){

                this.getDataRoute();

               }

  ngOnInit():void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, this.validationService.email()]],
      password: ['', [Validators.required]],
    });
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

  login() {

    // mostrar todos los errores
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return
    }

    this.spinnerService.showSpinner();
    this.authService.login(this.loginForm.value)
      .subscribe({

        next: (mesero) => {
          console.log(mesero);
          this.router.navigate(['/dashboard/dashboard']);
        },
        error: (error) => {
          this.toastr.error(error.error.msg);

        },
        complete: () =>{
          this.spinnerService.hideSpinner();
        }
      })
  }

}
