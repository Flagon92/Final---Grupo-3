import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() {}

  // Validación para solo texto y números
  userNick(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^[a-zA-Z0-9\s]+$/.test(control.value);
      return valid ? null : { userNick: true };
    };
  }

  // Sólo textos, tilde, ñ y espacios en blanco
  onlyLettters(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s,]+$/.test(control.value);
      return valid ? null : { onlyLettters: true };
    };
  }

  // Validación combinada para email y dominios específicos con mensajes de error diferenciados
  email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(control.value);
      const domainValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|pe|com\.pe)$/.test(control.value);
      if (!emailValid) {
        return { emailFormat: true };
      } else if (!domainValid) {
        return { emailDomain: true };
      }
      return null;
    };
  }

  // Validación para contraseña con reglas específicas
  password(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(control.value);
      return valid ? null : { password: true };
    };
  }

  // Validación for phone number
  phone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^\d{9}$/.test(control.value);
      return valid ? null : { phone: true };
    };
  }

  soloNumeros(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^[0-9]*$/.test(control.value);
      return valid ? null : { soloNumeros: true };
    };
  }


  // Función para obtener mensajes de error
  errorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'Este campo es requerido.';

    } else if (control.hasError('soloNumeros')) {
      return 'Sólo números';

    } else if (control.hasError('userNick')) {
      return 'Una palabra, letras, números, sin espacios.';

    } else if(control.hasError('onlyLettters')) {
      return 'Solo se permiten letras.';

    } else if (control.hasError('emailFormat')) {
      return 'El formato del Email es inválido.';

    } else if (control.hasError('emailDomain')) {
      return 'El dominio del Email no es válido.';

    } else if (control.hasError('password')) {
      return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.';

    }  else if (control.hasError('phone')) {
      return 'Solo números, 9 dígitos, sin espacios.';
    }
    return '';
  }


  // Función para impiar espacios al incicio y final y permitir solo un espacio entre palabras
  cleanField(event:Event, control: AbstractControl) {

    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      // Limpiar espacios al inicio y al final del texto ingresado
      let cleanedValue = inputElement.value.trim();
      // Reemplazar múltiples espacios con un solo espacio
      cleanedValue = cleanedValue.replace(/\s+/g, ' ');
      // inputElement.value = cleanedValue;
      // Actualizar el valor del control del formulario, para que se vuelve a disparar la validación pero con el campo limpio sin espacios
      control.setValue(cleanedValue, { emitEvent: false });
    }
  }

  // Función para impiar espacio al incicio y final y no permitir espacios entre palabras
  noSpaces(event: Event, control: AbstractControl) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      // Limpiar espacios al inicio y al final del texto ingresado
      let cleanedValue = inputElement.value.trim();
      // Eliminar todos los espacios entre palabras
      cleanedValue = cleanedValue.replace(/\s+/g, '');
      // inputElement.value = cleanedValue;
      // Actualizar el valor del control del formulario, para que se vuelve a disparar la validación pero con el campo limpio sin espacios
      control.setValue(cleanedValue, { emitEvent: false });
    }
  }

}
