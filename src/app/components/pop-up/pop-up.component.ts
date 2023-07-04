import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFormDataDTO } from 'src/app/interfaces/formDataDTO';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IFormDataDTO) {
    console.log(data);
  }
}
