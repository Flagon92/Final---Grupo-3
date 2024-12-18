import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

//services
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../services/spinner.service';
import { ValidationsService } from '../../../services/validations.service';
// components
import { SpinnerComponent } from '../../spinner/spinner.component';
import e from 'express';
import { MeserosService } from '../../../services/meseros.service';

@Component({
  selector: 'app-create-mesero',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent, CommonModule],
  templateUrl: './create-mesero.component.html',
  styleUrl: './create-mesero.component.css',
  host: {
    '(document:click)': 'toggleEyePassword($event)'
  }
})
export class CreateMeseroComponent implements OnInit {

  meseroForm!: FormGroup;
  eyePassword: boolean = false;
  turnos:string[] = ['Mañana', 'Tarde'];
  activo:boolean[] = [true, false];

  constructor(private fb: FormBuilder, private meserosService: MeserosService, private toastr: ToastrService,
              private spinnerService: SpinnerService, public readonly validationService: ValidationsService){}

  ngOnInit(): void {

    this.spinnerService.hideSpinner();
    this.meseroForm = this.fb.group({
      nomMesero: ['', [Validators.required, this.validationService.onlyLettters()]],
      email: ['', [Validators.required, this.validationService.email()]],
      password: ['', [Validators.required]],
      turno: ['', [Validators.required, this.validationService.onlyLettters()]],
      activo: ['', [Validators.required, this.validationService.onlyLettters()]],
    });

  }

  // enviar form al backend para crear el usuario
  crearMesero(): void {

    console.log(this.meseroForm.value);


    // mostrar todos los errores
    this.meseroForm.markAllAsTouched();

    if (this.meseroForm.invalid) {
      return
    }

    this.spinnerService.showSpinner();
    this.meserosService.createMesero(this.meseroForm.value).subscribe({
      next: (mesero:any) => {

        console.log(mesero);

        this.toastr.success('Se agregó con éxito');
        this.meseroForm.reset();
      },
      error: (error) =>{
        // console.log(error);

        this.spinnerService.hideSpinner();
        this.toastr.error(error.error.message);
      },
      complete: () => {
        this.spinnerService.hideSpinner();
        // this.meseroForm.reset();
      }
    })
  }

  // mostrar/ocultar el ojo del password
  toggleEyePassword(e:Event){
    const target = e.target as HTMLElement;
    if (target.classList.contains('eye-password')) {
      this.eyePassword = !this.eyePassword;
    }
  }



}
