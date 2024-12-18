import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ValidationsService } from '../../../services/validations.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerService } from '../../../services/spinner.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ActivatedRoute } from '@angular/router';

// interfaces
import { ToastrService } from 'ngx-toastr';
import { MeserosService } from '../../../services/meseros.service';

@Component({
    selector: 'app-edit-mesero',
    standalone: true,
    imports: [ ReactiveFormsModule, CommonModule, SpinnerComponent ],
    templateUrl: './edit-mesero.component.html',
    styleUrl: './edit-mesero.component.css',
    host: {
      '(document:click)' : 'clickEvent($event)'
    }
})

export class EditMeseroComponent implements OnInit {

  @ViewChild('password') password!: ElementRef;
  meseroEditForm!: FormGroup;
  mesero!: any;
  meseroId!: string | null;
  eyePassword: boolean = false;
  actionPassword: boolean = true;
  splittedUser!: Object;
  turnos:string[] = ['Mañana', 'Tarde'];
  activo:boolean[] = [true, false];



  constructor( public readonly validationService: ValidationsService, private spinnerService: SpinnerService,
                private fb: FormBuilder, private meserosService: MeserosService, private activatedRouted: ActivatedRoute,
                private toastr: ToastrService, ){}


  ngOnInit():void {

    this.spinnerService.hideSpinner();

    // initialize meseroEditForm
    this.meseroEditForm = this.fb.group({
      nomMesero: ['', [Validators.required, this.validationService.onlyLettters()]],
      email: ['', [Validators.required, this.validationService.email()]],
      password: [{ value:'', disabled: true }, [Validators.required]],
      turno: ['', [Validators.required, this.validationService.onlyLettters()]],
      activo: ['', [Validators.required]],
    });

    this.getMesero();
  }

  getMesero(){
    // obtengo id del usuario de la url
    this.meseroId = this.activatedRouted.snapshot.paramMap.get('id');
    // obtengo el usuario con el id desde
    this.meserosService.getMesero(this.meseroId).subscribe({
      next: (mesero: any) => {

        this.mesero = mesero.mesero;
        console.log(this.mesero);


        // Luego de tener el usuario recién actualizo los valores del formulario con los datos del this.user
        this.meseroEditForm.patchValue({
          nomMesero: this.mesero.nomMesero,
          email: this.mesero.email,
          password: '',
          turno: this.mesero.turno,
          activo: this.mesero.activo,
        });
      }
    })
  }

  editarMesero(): void {

    this.meseroEditForm.markAllAsTouched();
    if (this.meseroEditForm.invalid) return;

    this.spinnerService.showSpinner();

    this.meserosService.updateMesero(this.meseroId, this.meseroEditForm.value).subscribe({
      next: (mesero:any) => {

        console.log(mesero);


        this.getMesero(); // cada vez que actualizo vuelvo a traer el user pero actualizado
        // const { role, google, uid, ...splittedUser } = this.user; // comparo valores de mi form actual y user, si son iguales mostrar mensaje que no hubo cambios.
        // this.splittedUser = splittedUser;


        this.toastr.success('Mesero actualizado');
        this.meseroEditForm.get('password')?.reset();

        if (this.meseroEditForm.get('password')?.enabled) { // indica que se actualizó el password por eso está habilitado
          this.actionPassword = !this.actionPassword;
        }

        this.meseroEditForm.get('password')?.disable();
      },
      complete: () => {
        this.spinnerService.hideSpinner();
      }
    })
  }

  // detecta los click en mi host (componente) y segun el target ejecuto lógica
  clickEvent(e:Event){
    const target = e.target as HTMLElement;
    const password = this.meseroEditForm.get('password');

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


}


