import {Component, Input} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {registerLocaleData} from "@angular/common";
import localeCl from "@angular/common/locales/es-CL";
import {GananciaWebComponent} from "../linio/linio.component";

registerLocaleData(localeCl, 'cl');

@Component({
    selector: 'app-falabella',
    templateUrl: './falabella.component.html',
    styleUrls: ['./falabella.component.css']
})
export class FalabellaComponent {

    @Input() gananciaToChild: any;

    vuduForm: FormGroup;
    formControls: {
        precioCosto: AbstractControl,
        pvpPublicado: AbstractControl,
        comisionFalabella: AbstractControl,
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
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar
    ) {
        this.vuduForm = this.formBuilder.group({
            precioCosto: [null],
            pvpPublicado: [null],
            comisionFalabella: new FormControl({value: null, disabled: true}),
            envio: new FormControl({value: null, disabled: true}),
            ventaMenosComision: new FormControl({value: null, disabled: true}),
            ganancia: new FormControl({value: null, disabled: true}),

        });

        this.formControls = {
            precioCosto: this.vuduForm.get('precioCosto'),
            pvpPublicado: this.vuduForm.get('pvpPublicado'),
            comisionFalabella: this.vuduForm.get('comisionFalabella'),
            envio: this.vuduForm.get('envio'),
            ventaMenosComision: this.vuduForm.get('ventaMenosComision'),
            ganancia: this.vuduForm.get('ganancia'),
        }

        this.formControls.precioCosto.valueChanges.subscribe(() => {
            this.formControls.pvpPublicado.setValue(this.formControls.pvpPublicado.value);
        });

        this.formControls.pvpPublicado.valueChanges.subscribe(value => {
            this.formControls.comisionFalabella.setValue((value * 0.2).toFixed(2));

            if (value >= 0) {
                this.formControls.envio.setValue(2100);
                this.formControls.ventaMenosComision.setValue(value - this.vuduForm.controls.comisionFalabella.value - 2100);
            } else {
                this.formControls.envio.setValue(0);
                this.formControls.ventaMenosComision.setValue(value - this.vuduForm.controls.comisionFalabella.value);
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
        return this.vuduForm.controls.comisionFalabella.value / 1.19;
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

    openSnackBar() {
        this._snackBar.openFromComponent(GananciaWebComponent, {
            duration: null,
            data: {
                value: this.gananciaToChild.value,
                porcentaje: this.gananciaToChild.porcentaje
            },
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }

    reiniciar() {
        this.vuduForm.reset();
    }
}


