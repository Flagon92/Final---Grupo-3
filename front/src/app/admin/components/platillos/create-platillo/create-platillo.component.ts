import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
//services
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../services/spinner.service';
import { ValidationsService } from '../../../services/validations.service';
import { PlatillosService } from '../../../services/platillos.service';
// components
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-create-platillo',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerComponent, CommonModule],
  templateUrl: './create-platillo.component.html',
  styleUrl: './create-platillo.component.css'
})
export class CreatePlatilloComponent implements OnInit {

  platilloForm!: FormGroup;
  selectedFile!: File | null;
  imagePreview!:string | null;
  allowedTypeImage:string[]= ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

  constructor(private fb: FormBuilder, private platillosService: PlatillosService, private toastr: ToastrService,
              private spinnerService: SpinnerService, public readonly validationService: ValidationsService){}

  ngOnInit(): void {

    this.spinnerService.hideSpinner();
    this.platilloForm = this.fb.group({
      nombre: ['', [Validators.required, this.validationService.onlyLettters()]],
      descripcion: ['', [Validators.required, this.validationService.onlyLettters()]],
      ingredientes: ['', [Validators.required, this.validationService.onlyLettters()]],
      precio: ['', [Validators.required, this.validationService.soloNumeros()]],
      urlIMG: ['']
    });
  }

  // enviar form al backend para crear el usuario
  crearPlatillo(): void {


    this.addFileToForm();

    // mostrar todos los errores
    this.platilloForm.markAllAsTouched();

    if (this.platilloForm.invalid) {
      return
    }

    if (!this.selectedFile) {
      this.toastr.error('Debe subir una imagen')
      return
    }


    this.spinnerService.showSpinner();
    this.platillosService.createPlatillo(this.platilloForm.value).subscribe({
      next: (platillo:any) => {

        console.log(platillo);


        this.toastr.success(platillo.msg);
        this.platilloForm.reset();
      },
      error: (error) =>{
        // console.log(error);

        this.spinnerService.hideSpinner();
        this.toastr.error(error.error.message);
      },
      complete: () => {
        this.spinnerService.hideSpinner();
        this.imagePreview = null;
        // this.platilloForm.reset();
      }
    })
  }


  // detectar cambio en el input file y crear una imagen en bases64
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      if(!this.allowedTypeImage.includes(input.files[0].type)) {
        this.toastr.error('Este tipo de archivo no esta permitido');
        input.value = ''; // limpia el input para que el change se dispare aunque se cargue el mismo archivo
        return;
      }

      this.selectedFile = input.files[0];
      const reader = new FileReader(); // Crear una vista previa de la imagen
      reader.onload = () => { // el reader.onload es asíncorno
        this.imagePreview = reader.result as string; // cuando el archivo fue leído se asigna
      };
      reader.readAsDataURL(this.selectedFile); // iniciar la lectura de un archivo de forma asíncrona
    }

    input.value = '';
  }

  // si existe selectedFile le agrego un valor al control fotoname de mi form
  addFileToForm(): void{
    if (this.selectedFile) {
      this.platilloForm.patchValue({
        urlIMG: this.selectedFile.name
      })
      this.onUpload(); // solo cuando hay selectedFile ejecuto onUpload
    }

  }

  // subir archivo, lo hago a través de otra petición para tener mas control y mantenibilidad
  onUpload(): void{
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('foto', this.selectedFile, this.selectedFile.name);

      this.platillosService.uploadFile(formData).subscribe({
        next: (file:any) => {
        }
      })
    }
  }

  // dispara el file input
  onImageClick(fileInput: HTMLInputElement){
    fileInput.click();
  }

  // cancela todo lo relacionado al seleccionar un archivo
  cancelImage(el:HTMLElement, event:Event){
    event.preventDefault();
    this.imagePreview = null; //quita la imagen previa pero el file sigue en this.selectedFile
    this.platilloForm.patchValue({ // limpio el control filename de mi form
      fotoname: ''
    })
    this.selectedFile = null; // hago null a this.selectedFile
  }


}
