import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

//services
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../services/spinner.service';
import { ValidationsService } from '../../../services/validations.service';
import { CategoriasService } from '../../../services/categorias.service';
// components
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-create-categoria',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent, CommonModule],
  templateUrl: './create-categoria.component.html',
  styleUrl: './create-categoria.component.css',

})
export class CreateCategoriaComponent implements OnInit {

  categoriaForm!: FormGroup;

  constructor(private fb: FormBuilder, private categoriasService: CategoriasService, private toastr: ToastrService,
              private spinnerService: SpinnerService, public readonly validationService: ValidationsService){}

  ngOnInit(): void {

    this.spinnerService.hideSpinner();
    this.categoriaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  // enviar form al backend para crear el usuario
  createCategoria(): void {

    // mostrar todos los errores
    this.categoriaForm.markAllAsTouched();

    if (this.categoriaForm.invalid) {
      return
    }

    this.spinnerService.showSpinner();
    this.categoriasService.createCategoria(this.categoriaForm.value).subscribe({
      next: (cliente:any) => {
        this.toastr.success('Se creó con éxito');
        this.categoriaForm.reset();
      },
      error: (error) =>{

        this.spinnerService.hideSpinner();
        this.toastr.error(error.error.message);
      },
      complete: () => {
        this.spinnerService.hideSpinner();
      }
    })
  }

}
