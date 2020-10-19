import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import { registerLocaleData } from '@angular/common';
import localeCl from '@angular/common/locales/es-CL';
registerLocaleData(localeCl, 'cl');

@Component({
    selector: 'app-linio',
    templateUrl: './linio.component.html',
    styleUrls: ['./linio.component.css']
})
export class LinioComponent {

    vuduForm: FormGroup;
    formControls: {
        precioCosto: AbstractControl,
        pvpPublicado: AbstractControl,
        comisionLinio: AbstractControl,
        envio: AbstractControl,
        ventaMenosComision: AbstractControl,
        ganancia: AbstractControl
    }

    publicadoDisplayedColumns: string[] = [
        'netoPublicado',
        'ivaPublicado'
    ];

    linioDisplayedColumns: string[] = [
        'netoLinio',
        'ivaLinio'
    ];

    envioDisplayedColumns: string[] = [
        'netoEnvio',
        'ivaEnvio'
    ];

    ventaMenosComisionDisplayedColumns: string[] = [
        'netoVentaMenosComision',
        'ivaVentaMenosComision'
    ];

    precioCostoDisplayedColumns: string[] = [
        'precioCostoIva',
        'precioCostoBruto'
    ];

    gananciaDisplayedColumns: string[] = [
        'ganancia'
    ];

    dataSource = [null];

    constructor(
        private formBuilder: FormBuilder
    ) {
        this.vuduForm = this.formBuilder.group({
            precioCosto: [null],
            pvpPublicado: [null],
            comisionLinio: new FormControl({value: null, disabled: true}),
            envio: new FormControl({value: null, disabled: true}),
            ventaMenosComision: new FormControl({value: null, disabled: true}),
            ganancia: new FormControl({value: null, disabled: true}),

        });

        this.formControls = {
            precioCosto: this.vuduForm.get('precioCosto'),
            pvpPublicado: this.vuduForm.get('pvpPublicado'),
            comisionLinio: this.vuduForm.get('comisionLinio'),
            envio: this.vuduForm.get('envio'),
            ventaMenosComision: this.vuduForm.get('ventaMenosComision'),
            ganancia: this.vuduForm.get('ganancia'),
        }

        this.formControls.pvpPublicado.valueChanges.subscribe(value => {
            this.formControls.comisionLinio.setValue((value * 0.16).toFixed(2));

            if (value >= 15990) {
                this.formControls.envio.setValue(2200);
                this.formControls.ventaMenosComision.setValue(value - this.vuduForm.controls.comisionLinio.value - 2200);
            } else {
                this.formControls.envio.setValue(0);
                this.formControls.ventaMenosComision.setValue(value - this.vuduForm.controls.comisionLinio.value);
            }

            this.formControls.ganancia.setValue(
                (this.netoVentaMenosComision() - this.formControls.precioCosto.value).toFixed(2));
        });
    }

    precioCostoIva() {
        return this.vuduForm.controls.precioCosto.value * 0.19;
    }

    precioCostoBruto() {
        return this.vuduForm.controls.precioCosto.value + this.precioCostoIva();
    }

    netoPublicado(): number {
        return this.vuduForm.controls.pvpPublicado.value / 1.19;
    }

    ivaPublicado(): number {
        return this.netoPublicado() * 0.19;
    }

    netoLinio(): number {
        return this.vuduForm.controls.comisionLinio.value / 1.19;
    }

    ivaLinio() {
        return this.netoLinio() * 0.19;
    }

    netoEnvio(): number {
        return this.vuduForm.controls.envio.value / 1.19;
    }

    ivaEnvio() {
        return this.netoEnvio() * 0.19;
    }

    netoVentaMenosComision(): number {
        return this.vuduForm.controls.ventaMenosComision.value / 1.19;
    }

    ivaVentaMenosComision() {
        return this.netoVentaMenosComision() * 0.19;
    }

    ganancia() {
        return this.formControls.ganancia.value / this.netoVentaMenosComision();
    }

    reiniciar() {
        this.vuduForm.reset();
    }
}
