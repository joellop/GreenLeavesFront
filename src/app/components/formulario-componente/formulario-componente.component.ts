import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formulario_validator } from '../validator/formulario.validator';
import { Observable, map, startWith } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ICiudadEstado } from 'src/app/interfaces/ciudadEstado';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-formulario-componente',
  templateUrl: './formulario-componente.component.html',
  styleUrls: ['./formulario-componente.component.scss']
})
export class FormularioComponenteComponent implements OnInit {
  constructor(
    private _formBuilder : FormBuilder, 
    private _apiService : ApiService,
    public dialog: MatDialog){}
  //#region Propiedades
  public formulario : FormGroup = this._formBuilder.group(formulario_validator);

  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined = new Observable<string[]>();
  
  public minDate: Date = new Date();
  public maxDate: Date = new Date();

  //#endregion


  ngOnInit() {
    this.CityStateList();
    this.filteredOptions = this.formulario.get("cityState")?.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  //#region envio de datos
  public sendEmail(): void{
    if(this.formulario.valid){
      this._apiService.sendEmail(this.formulario.value).subscribe(response => {
        console.log(response);
      });
    }else{
      this.formulario.markAllAsTouched();
      this.openDialog();
      
    }
  }
  //#endregion 

  //#region obtener lista de ciudades y estados
  public CityStateList():void{ 
    this._apiService.CityStateList().subscribe(response => {
      console.log(response);
      this.options = response.map(m => m.ciudadEstado1);
      console.log(this.options);
    });
  }
  //#endregion




  openDialog() {
    this.dialog.open(PopUpComponent, {
      data: this.formulario.value,
    });
  }
}
