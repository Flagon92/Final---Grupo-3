import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ValidationsService } from '../../../services/validations.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerService } from '../../../services/spinner.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ActivatedRoute } from '@angular/router';

// services
import { CategoriasService } from '../../../services/categorias.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-edit-categoria',
    standalone: true,
    imports: [ ReactiveFormsModule, CommonModule, SpinnerComponent ],
    templateUrl: './edit-categoria.component.html',
    styleUrl: './edit-categoria.component.css',
})

export class EditCategoriaComponent implements OnInit {

  categoriaEditForm!: FormGroup;
  categoria!: any;
  categoriaId!: string | null;
  splittedUser!: Object;

  constructor( public readonly validationService: ValidationsService, private spinnerService: SpinnerService,
                private fb: FormBuilder, private categoriaService: CategoriasService, private activatedRouted: ActivatedRoute,
                private toastr: ToastrService, ){}


  ngOnInit():void {

    this.spinnerService.hideSpinner();

    // initialize categoriaEditForm
    this.categoriaEditForm = this.fb.group({
      nombre: ['', [Validators.required, this.validationService.onlyLettters()]],
      descripcion: ['', [Validators.required, this.validationService.onlyLettters()]]
    });

    this.getCategoria();
  }

  getCategoria(){
    // obtengo id del usuario de la url
    this.categoriaId = this.activatedRouted.snapshot.paramMap.get('id');

    // obtengo el usuario con el id desde
    this.categoriaService.getCategoria(this.categoriaId).subscribe({
      next: (categoria: any) => {

        console.log(categoria);


        this.categoria = categoria;

        // Luego de tener el usuario recién actualizo los valores del formulario con los datos del this.user
        this.categoriaEditForm.patchValue({
          nombre: this.categoria.nombre,
          descripcion: this.categoria.descripcion,
        });
      }
    })
  }

  editarCategoria(): void {

    this.categoriaEditForm.markAllAsTouched();
    if (this.categoriaEditForm.invalid) return;

    this.spinnerService.showSpinner();

    this.categoriaService.updateCategoria(this.categoriaId, this.categoriaEditForm.value).subscribe({
      next: (cliente:any) => {

        // this.getCategoria(); // cada vez que actualizo vuelvo a traer el user pero actualizado
        // const { role, google, uid, ...splittedUser } = this.categoria; // comparo valores de mi form actual y user, si son iguales mostrar mensaje que no hubo cambios.
        // this.splittedUser = splittedUser;

        this.toastr.success('Categoría actualizada');


      },
      complete: () => {
        this.spinnerService.hideSpinner();
      }
    })
  }


}


