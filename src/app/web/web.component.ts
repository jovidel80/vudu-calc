import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

export interface PeriodicElement {
  pvpPublicado: number;
  precioCosto: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {pvpPublicado: 333, precioCosto: 444}
];

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css']
})
export class WebComponent implements OnInit {

  vuduForm: FormGroup;

  displayedColumns: string[] = ['pvpPublicado', 'precioCosto', 'precioCostoNoIva', 'ivaPrecioCosto', 'margenSugerido', 'margenReal'];
  dataSource = ELEMENT_DATA;

  constructor(
      private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.vuduForm = this.formBuilder.group({
      pvpSugerido: [null],
      pvpPublicado: [null],
      precioCosto: [null],
      precioSinIva: [null]
    });
  }

  submit(): void {
    if (!this.vuduForm.valid) {
      return;
    }
    console.log(this.vuduForm.value);
  }

  calcularPvpSinIva(): number {
    return this.vuduForm.controls.pvpPublicado.value / 1.19;
  }

  calcularIva(): number {
    return this.calcularPvpSinIva() * 0.19;
  }

  calcularPrecioCostoSinIva(): number {
    return this.vuduForm.controls.precioCosto.value / 1.19;
  }

  calcIvaPrecioCosto(): {} {
    return this.calcularPrecioCostoSinIva() * 0.19;
  }

  calcPrecioSugeridoSinIva(): number {
    return this.vuduForm.controls.pvpSugerido.value / 1.19;
  }

}
