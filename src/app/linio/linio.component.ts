import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-linio',
    templateUrl: './linio.component.html',
    styleUrls: ['./linio.component.css']
})
export class LinioComponent implements OnInit {

    vuduForm: FormGroup;
    formControls: {
        pvpSugerido: AbstractControl,
        pvpSugeridoMasComision: AbstractControl,
        pvpPublicado: AbstractControl,
        comision: AbstractControl,
        precioCosto: AbstractControl,
        precioSinIva: AbstractControl
    }

    pvpPubSinIvaTT: string;

    displayedColumns: string[] = [
        'pvpPublicado',
        'precioCosto',
        'ivaPrecioCosto',
        'pagaEnvio',
        'precioCostoNoIva',
        'margenSugerido',
        'margenReal',
        'margenSugeridoPorcentual',
        'margenRealPorcentual',
        'pvpPublicadoMenosComision'
    ];
    dataSource = [null];
    envio: string;
    envioNumerico: number;
    comisionMasIva: number;

    constructor(
        private formBuilder: FormBuilder
    ) {
        this.envio = '0';
        this.envioNumerico = 0;
        this.comisionMasIva = 0
        this.vuduForm = this.formBuilder.group({
            pvpSugerido: [null],
            pvpSugeridoMasComision: new FormControl({value: null, disabled: true}),
            pvpPublicado: [null],
            comision: new FormControl({value: null, disabled: true}),
            precioCosto: [null],
            precioSinIva: [null]
        });

        this.formControls = {
            pvpSugerido: this.vuduForm.get('pvpSugerido'),
            pvpSugeridoMasComision: this.vuduForm.get('pvpSugeridoMasComision'),
            pvpPublicado: this.vuduForm.get('pvpPublicado'),
            comision: this.vuduForm.get('comision'),
            precioCosto: this.vuduForm.get('precioCosto'),
            precioSinIva: this.vuduForm.get('precioSinIva')
        }

        this.formControls.pvpSugerido.valueChanges.subscribe(value => {
            if (value > 15990) {
                this.formControls.pvpSugeridoMasComision.setValue(value + value * 0.16 + 2200);
            } else {
                this.formControls.pvpSugeridoMasComision.setValue(value + value * 0.16);
            }
        });

        this.formControls.pvpPublicado.valueChanges.subscribe(value => {
            this.comisionMasIva = value * 0.16;
            const comisionSinIva = this.comisionMasIva / 1.19;
            const iva = this.comisionMasIva - comisionSinIva;
            this.formControls.comision.setValue(comisionSinIva.toFixed(1) +
                ' + ' + iva.toFixed(1) + ' = ' + this.comisionMasIva.toFixed(1));
            if (value > 15990) {
                this.envioNumerico = 2200;
                const envioMasIva = 2200;
                const envioSinIva = envioMasIva / 1.19;
                const ivaEnvio = envioMasIva - envioSinIva;
                this.envio = envioSinIva.toFixed(1) +
                    ' + ' + ivaEnvio.toFixed(1) + ' = ' + envioMasIva.toFixed(1);
            } else {
                this.envio = '200';
                this.envioNumerico = 200;
            }
        });

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
        return this.precioVentaFinal() / 1.19 - this.formControls.precioCosto.value;
    }

    gananciaSugerida(): number {
        return this.precioSugeridoSinIva() - this.formControls.precioCosto.value;
    }

    precioVentaFinal() {
            return this.formControls.pvpPublicado.value - this.comisionMasIva - this.envioNumerico;
    }

    dosDecimales(valor) {
        return parseFloat(valor).toFixed(2);
    }
}
