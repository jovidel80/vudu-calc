import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css']
})
export class WebComponent implements OnInit {

  vuduForm: FormGroup;
  formControls: {
    pvpSugerido: AbstractControl,
    pvpPublicado: AbstractControl,
    precioCosto: AbstractControl,
    precioSinIva: AbstractControl
  }

  pvpPubSinIvaTT: string;

  displayedColumns: string[] = ['pvpPublicado', 'precioCosto', 'ivaPrecioCosto', 'precioCostoNoIva', 'margenSugerido', 'margenReal', 'margenSugeridoPorcentual', 'margenRealPorcentual'];
  dataSource = [null];

  constructor(
      private formBuilder: FormBuilder
  ) {
    this.vuduForm = this.formBuilder.group({
      pvpSugerido: [null],
      pvpPublicado: [null],
      precioCosto: [null],
      precioSinIva: [null]
    });

    this.formControls = {
      pvpSugerido: this.vuduForm.get('pvpSugerido'),
      pvpPublicado: this.vuduForm.get('pvpPublicado'),
      precioCosto: this.vuduForm.get('precioCosto'),
      precioSinIva: this.vuduForm.get('precioSinIva')
    }

    this.pvpPubSinIvaTT = 'Precio publicado sin IVA, ya que el cliente ve el precio con IVA incluido (PVP publicado)'
  }

  ngOnInit(): void {

  }

  pvpPublicadoSinIva(): number {
    return this.vuduForm.controls.pvpPublicado.value / 1.19;
  }

  ivaPvpPublicado(): number {
    return this.pvpPublicadoSinIva() * 0.19;
  }

  precioCostoMasIva(): number {
    return this.formControls.precioCosto.value + this.calcIvaPrecioCosto();
  }

  calcIvaPrecioCosto(): {} {
    return this.formControls.precioCosto.value * 0.19;
  }

  precioSugeridoSinIva(): number {
    return this.formControls.pvpSugerido.value / 1.19;
  }

  gananciaReal(): number {
    return this.pvpPublicadoSinIva() - this.formControls.precioCosto.value;
  }

  gananciaSugerida(): number {
    return this.precioSugeridoSinIva() - this.formControls.precioCosto.value;
  }
}
