import { Component, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


//services
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../services/spinner.service';
import { ValidationsService } from '../../../services/validations.service';

// components
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ClientesService } from '../../../services/clientes.service';
import { PlatillosService } from '../../../services/platillos.service';
import { OrdenesService } from '../../../services/ordenes.service';

@Component({
  selector: 'app-create-orden',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent, CommonModule],
  templateUrl: './create-orden.component.html',
  styleUrl: './create-orden.component.css',

})
export class CreateOrdenComponent implements OnInit {

  ordenesForm!: FormGroup;
  platillos!: any;
  ordenCreada = false;

  constructor(private fb: FormBuilder, private ordenesService: OrdenesService, private toastr: ToastrService,
              private spinnerService: SpinnerService, public readonly validationService: ValidationsService, private platillosService: PlatillosService){}

  ngOnInit(): void {

    this.spinnerService.hideSpinner();
    this.ordenesForm = this.fb.group({
      idMesa: ['', [Validators.required, this.validationService.soloNumeros() ]],
      platosSeleccionados: this.fb.array([])
    });

    this.platillosService.getPlatillos().subscribe( (resp:any) => {
      this.platillos = resp;


    })
  }

  get platosSeleccionados(): FormArray {
    return this.ordenesForm.get('platosSeleccionados') as FormArray;
  }

  createPlatoGroup(): FormGroup {

    return this.fb.group({
      idPlatillo: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
  }

  agregarPlato(): void {
    this.platosSeleccionados.push(this.createPlatoGroup());
  }

  eliminarPlato(indice: number): void {
    this.platosSeleccionados.removeAt(indice);
  }

  onPlatoChange(event: Event, index: number): void {
    const selectedId = +(event.target as HTMLSelectElement).value;
    const selectedPlatillo = this.platillos.find((platillo:any) => platillo.id === selectedId);
    if (selectedPlatillo) {
      // this.platosSeleccionados.at(index).get('nombre')?.setValue(selectedPlatillo.nombre);
      this.platosSeleccionados.at(index).patchValue({ nombre: selectedPlatillo.nombre });
    }
  }




  // enviar form al backend para crear el usuario
  crearOrden(): void {

    console.log(this.ordenesForm.value);


    // mostrar todos los errores
    this.ordenesForm.markAllAsTouched();

    if (this.ordenesForm.invalid) {
      return
    }

    this.spinnerService.showSpinner();
    this.ordenesService.createOrden(this.ordenesForm.value).subscribe({
      next: (cliente:any) => {
        this.toastr.success('Se creó conn éxito');
        // this.ordenesForm.reset();
        this.ordenCreada = true;
        this.ordenesForm.reset({
          idMesa: '',  // Resetea el campo idMesa
          platosSeleccionados: this.fb.array([])  // Resetea el FormArray
        });
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
