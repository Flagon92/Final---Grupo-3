import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
//interfaces
import { UserResponse } from '../../../interfaces/user.interface';
//services
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../services/spinner.service';
import { ValidationsService } from '../../../services/validations.service';
// components
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-crate-user',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent, CommonModule],
  templateUrl: './create-cliente.component.html',
  styleUrl: './create-cliente.component.css',

})
export class CreateClienteComponent implements OnInit {

  clienteForm!: FormGroup;
  eyePassword: boolean = false;
  selectedFile!: File | null;
  imagePreview!:string | null;
  allowedTypeImage:string[]= ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

  constructor(private fb: FormBuilder, private clientesService: ClientesService, private toastr: ToastrService,
              private spinnerService: SpinnerService, public readonly validationService: ValidationsService){}

  ngOnInit(): void {

    this.spinnerService.hideSpinner();
    this.clienteForm = this.fb.group({
      correo: ['', [Validators.required, this.validationService.email()]],
      nombre: ['', [Validators.required, this.validationService.onlyLettters()]],
      dni: ['', [Validators.required]],
      telefono: ['', [Validators.required, this.validationService.phone()]],
    });
  }

  // enviar form al backend para crear el usuario
  crearCliente(): void {

    // mostrar todos los errores
    this.clienteForm.markAllAsTouched();

    if (this.clienteForm.invalid) {
      return
    }

    this.spinnerService.showSpinner();
    this.clientesService.createCliente(this.clienteForm.value).subscribe({
      next: (cliente:any) => {
        this.toastr.success('Se creó con éxito');
        this.clienteForm.reset();
      },
      error: (error) =>{

        this.spinnerService.hideSpinner();
        this.toastr.error(error.error.message);
      },
      complete: () => {
        this.spinnerService.hideSpinner();
        this.imagePreview = null;
      }
    })
  }

}
