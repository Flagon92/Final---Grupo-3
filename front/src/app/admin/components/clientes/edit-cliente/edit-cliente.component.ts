import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ValidationsService } from '../../../services/validations.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerService } from '../../../services/spinner.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ActivatedRoute } from '@angular/router';

// interfaces
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from '../../../services/clientes.service';

@Component({
    selector: 'app-edit-cliente',
    standalone: true,
    imports: [ ReactiveFormsModule, CommonModule, SpinnerComponent ],
    templateUrl: './edit-cliente.component.html',
    styleUrl: './edit-cliente.component.css'
})

export class EditClienteComponent implements OnInit {

  @ViewChild('password') password!: ElementRef;
  clienteEditForm!: FormGroup;
  cliente!: any;
  clienteId!: string | null;
  eyePassword: boolean = false;
  actionPassword: boolean = true;
  splittedUser!: Object;

  imagePreview!:string | null;
  selectedFile!: File | null;
  allowedTypeImage:string[]= ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

  constructor( public readonly validationService: ValidationsService, private spinnerService: SpinnerService,
                private fb: FormBuilder, private clientesService: ClientesService, private activatedRouted: ActivatedRoute,
                private toastr: ToastrService, ){}


  ngOnInit():void {

    this.spinnerService.hideSpinner();

    // initialize clienteEditForm
    this.clienteEditForm = this.fb.group({
      correo: ['', [Validators.required, this.validationService.email()]],
      nombre: ['', [Validators.required, this.validationService.onlyLettters()]],
      dni: ['', [Validators.required]],
      telefono: ['', [Validators.required, this.validationService.phone()]],
    });

    this.getCliente();
  }

  getCliente(){
    // obtengo id del usuario de la url
    this.clienteId = this.activatedRouted.snapshot.paramMap.get('id');
    // obtengo el usuario con el id desde
    this.clientesService.getCliente(this.clienteId).subscribe({
      next: (cliente: any) => {

        this.cliente = cliente.cliente;

        // Luego de tener el usuario recién actualizo los valores del formulario con los datos del this.user
        this.clienteEditForm.patchValue({
          correo: this.cliente.correo,
          nombre: this.cliente.nombre,
          dni: this.cliente.dni,
          telefono: this.cliente.telefono,
        });
      }
    })
  }

  editarCliente(): void {

    this.clienteEditForm.markAllAsTouched();
    if (this.clienteEditForm.invalid) return;

    this.spinnerService.showSpinner();

    this.clientesService.updateCliente(this.clienteId, this.clienteEditForm.value).subscribe({
      next: (cliente:any) => {

        this.getCliente(); // cada vez que actualizo vuelvo a traer el user pero actualizado
        const { role, google, uid, ...splittedUser } = this.cliente; // comparo valores de mi form actual y user, si son iguales mostrar mensaje que no hubo cambios.
        this.splittedUser = splittedUser;

        this.toastr.success('Cliente actualizado');


      },
      complete: () => {
        this.spinnerService.hideSpinner();
      }
    })
  }


}


