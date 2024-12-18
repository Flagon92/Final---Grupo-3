import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ValidationsService } from '../../../services/validations.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerService } from '../../../services/spinner.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute } from '@angular/router';

// interfaces
import { ToastrService } from 'ngx-toastr';
import { Platillo } from '../../../models/platillo.model';
import { PlatillosService } from '../../../services/platillos.service';

@Component({
    selector: 'app-edit-platillo',
    standalone: true,
    imports: [ ReactiveFormsModule, CommonModule, SpinnerComponent ],
    templateUrl: './edit-platillo.component.html',
    styleUrl: './edit-platillo.component.css',
    host: {
      '(document:click)' : 'clickEvent($event)'
    }
})

export class EditPlatilloComponent implements OnInit {

  @ViewChild('password') password!: ElementRef;
  platilloEditForm!: FormGroup;
  platillo!: Platillo;
  platilloId!: string | null;
  eyePassword: boolean = false;
  actionPassword: boolean = true;
  splittedUser!: Object;

  imagePreview!:string | null;
  selectedFile!: File | null;
  allowedTypeImage:string[]= ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];



  constructor( public readonly validationService: ValidationsService, private spinnerService: SpinnerService,
                private fb: FormBuilder, private platillosService: PlatillosService, private activatedRouted: ActivatedRoute,
                private toastr: ToastrService, ){}


  ngOnInit():void {

    this.spinnerService.hideSpinner();

    // initialize platilloEditForm
    this.platilloEditForm = this.fb.group({
      nombre: ['', [Validators.required, this.validationService.onlyLettters()]],
      descripcion: ['', [Validators.required, this.validationService.onlyLettters()]],
      precio: ['', [Validators.required]],
      ingredientes: ['', [Validators.required, this.validationService.onlyLettters()]],
      urlIMG: ['']
    });

    this.getPlatillo();
  }

  getPlatillo(){
    // obtengo id del usuario de la url
    this.platilloId = this.activatedRouted.snapshot.paramMap.get('id');
    // obtengo el usuario con el id desde
    this.platillosService.getPlatillo(this.platilloId).subscribe({
      next: (platillo: any) => {


        this.platillo = Platillo.transformData(platillo);

        // console.log(this.platillo);


        // Luego de tener el usuario recién actualizo los valores del formulario con los datos del this.user
        this.platilloEditForm.patchValue({
          nombre: this.platillo.nombre,
          descripcion: this.platillo.descripcion,
          precio: this.platillo.precio,
          ingredientes: this.platillo.ingredientes,
        });
      }
    })
  }

  editarPlatillo(): void {

    this.addFileToForm();
    // console.log(this.platilloEditForm.value);

    this.platilloEditForm.markAllAsTouched();
    if (this.platilloEditForm.invalid) return;

    this.spinnerService.showSpinner();

    this.platillosService.updatePlatillo(this.platilloId, this.platilloEditForm.value).subscribe({
      next: (platillo:any) => {

        this.getPlatillo(); // cada vez que actualizo vuelvo a traer el user pero actualizado
        const { id, ...splittedUser } = this.platillo; // comparo valores de mi form actual y user, si son iguales mostrar mensaje que no hubo cambios.
        this.splittedUser = splittedUser;

        this.selectedFile = null;
        // this.imagePreview = null;

        if (this.areObjectsEqual(this.splittedUser, this.platilloEditForm.value)) { // Comparo para ver si no hay cambios
          this.toastr.success('No hubo cambios');
          return;
        }

        this.toastr.success('Platillo actualizado');
      },
      complete: () => {
        this.spinnerService.hideSpinner();
      }
    })
  }

  // detecta los click en mi host (componente) y segun el target ejecuto lógica
  clickEvent(e:Event){
    const target = e.target as HTMLElement;
    const password = this.platilloEditForm.get('password');

    if (target.classList.contains('eye-password')) {
      this.eyePassword = !this.eyePassword;
      return;
    }
    if (target.classList.contains('change-password')) {
      password?.enable();
      this.password.nativeElement.focus();
      this.actionPassword = !this.actionPassword;
      return;
    }
    if (target.classList.contains('cancel-password')) {
      password?.reset();
      // password?.setValidators([Validators.required, this.validationService.password()]);
      password?.disable();
      this.actionPassword = !this.actionPassword;
    }
  }

  // ordena y compara los valores de mis objetos
  areObjectsEqual(obj1: any, obj2: any): boolean {
    const keys1 = Object.keys(obj1).sort();
    const keys2 = Object.keys(obj2).sort();
    if (JSON.stringify(keys1) !== JSON.stringify(keys2)) {
      return false;
    }
    return keys1.every(key => obj1[key] === obj2[key]); // compara los valores de, se usa every para que devuelva un boolean
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

      // cancela todo lo relacionado al seleccionar un archivo
  cancelImage(el:HTMLElement, event:Event){
    event.preventDefault();
    this.imagePreview = null; //quita la imagen previa pero el file sigue en this.selectedFile
    this.platilloEditForm.patchValue({ // limpio el control filename de mi form
      fotoname: ''
    })
    this.selectedFile = null; // hago null a this.selectedFile
  }

  // dispara el file input
  onImageClick(fileInput: HTMLInputElement){
    fileInput.click();
  }

  // si existe selectedFile le agrego un valor al control fotoname de mi form
  addFileToForm(): void {

    const urlIMG = this.selectedFile ? this.selectedFile.name : this.platillo.urlIMG;
    this.platilloEditForm.patchValue({ urlIMG })

    // console.log(this.platilloEditForm.value);

    this.selectedFile && this.onUpload();
  }

  // subir archivo, lo hago a través de otra petición para tener mas control y mantenibilidad
  onUpload(): void{
    if (this.selectedFile) {

      const formData = new FormData();
      formData.append('foto', this.selectedFile, this.selectedFile.name);

      this.platillosService.uploadFile(formData).subscribe({
        next: (file:any) => {

          console.log(file);

        }
      })
    }
  }

}


