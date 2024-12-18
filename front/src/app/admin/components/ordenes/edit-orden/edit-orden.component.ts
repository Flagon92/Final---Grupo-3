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
import { OrdenesService } from '../../../services/ordenes.service';

@Component({
    selector: 'app-edit-orden',
    standalone: true,
    imports: [ ReactiveFormsModule, CommonModule, SpinnerComponent ],
    templateUrl: './edit-orden.component.html',
    styleUrl: './edit-orden.component.css',
})

export class EditOrdenComponent implements OnInit {

  @ViewChild('password') password!: ElementRef;
  ordenEditForm!: FormGroup;
  orden!: any;
  ordenId!: string | null;
  eyePassword: boolean = false;
  actionPassword: boolean = true;
  splittedUser!: Object;

  imagePreview!:string | null;
  selectedFile!: File | null;
  allowedTypeImage:string[]= ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

  constructor( public readonly validationService: ValidationsService, private spinnerService: SpinnerService,
                private fb: FormBuilder, private ordenesService: OrdenesService, private activatedRouted: ActivatedRoute,
                private toastr: ToastrService, ){}


  ngOnInit():void {

    this.spinnerService.hideSpinner();

    // initialize ordenEditForm
    this.ordenEditForm = this.fb.group({
      estado: ['', [Validators.required]],
    });

    this.getOrden();
  }

  getOrden(){
    // obtengo id del usuario de la url
    this.ordenId = this.activatedRouted.snapshot.paramMap.get('id');
    // obtengo el usuario con el id desde
    this.ordenesService.getOrden(this.ordenId).subscribe({
      next: (orden: any) => {

        this.orden = orden;
        this.ordenId = orden._id;

        // Luego de tener el usuario recién actualizo los valores del formulario con los datos del this.user
        this.ordenEditForm.patchValue({
          estado: this.orden.estado,
        });
      }
    })
  }

  editarOrden(): void {

    console.log(this.ordenEditForm.value);


    this.spinnerService.showSpinner();

    this.ordenesService.updateOrden(this.ordenId, this.ordenEditForm.value).subscribe({
      next: (orden:any) => {

        this.getOrden(); // cada vez que actualizo vuelvo a traer el user pero actualizado
        // const { role, google, uid, ...splittedUser } = this.cliente; // comparo valores de mi form actual y user, si son iguales mostrar mensaje que no hubo cambios.
        // this.splittedUser = splittedUser;

        this.toastr.success('Orden actualizada');


      },
      complete: () => {
        this.spinnerService.hideSpinner();
      }
    })
  }


}


