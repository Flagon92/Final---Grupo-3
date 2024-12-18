import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {

  @Input() spinner!: string;

  constructor(public spinnerService: SpinnerService) { }

}
