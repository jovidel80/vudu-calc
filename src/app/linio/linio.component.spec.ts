import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LinioComponent} from './linio.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {MatTableModule} from "@angular/material/table";
import {ClipboardModule} from "@angular/cdk/clipboard";

describe('LinioComponent', () => {
    let component: LinioComponent;
    let fixture: ComponentFixture<LinioComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LinioComponent],
            imports: [
                ReactiveFormsModule,
                MatTableModule,
                ClipboardModule
            ],
            providers: [
                FormBuilder
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LinioComponent);
        component = fixture.componentInstance;
        component.formControls.precioCosto.setValue(23943);
        component.formControls.pvpPublicado.setValue(41990);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('test precioCostoIvac when precioCosto is 23943', () => {
        expect(component.precioCostoIva()).toEqual(4549.17);
    });

    it('test precioCostoBruto when precioCosto is 23943', () => {
        expect(component.precioCostoBruto()).toEqual(28492.17);
    });

    it('test netoPublicado when pvpPublicado is 41990', () => {
        expect(component.netoPublicado().toFixed(2)).toEqual('35285.71');
    });

    it('test ivaPublicado when pvpPublicado is 41990', () => {
        expect(component.ivaPublicado().toFixed(2)).toEqual('6704.29');
    });

    it('test comisionLinio when pvpPublicado is 41990', () => {
        expect(component.formControls.comisionLinio.value).toEqual('6718.40');
    });

    it('test netoLinio when pvpPublicado is 41990', () => {
        expect(component.netoLinio().toFixed(2)).toEqual('5645.71');
    });

    it('test ivaLinio when pvpPublicado is 41990', () => {
        expect(component.ivaLinio().toFixed(2)).toEqual('1072.69');
    });

    it('test envio is 0 when pvpPublicado is < 15990', () => {
        component.formControls.pvpPublicado.setValue(12990);
        expect(component.formControls.envio.value).toEqual(0);
    });

    it('test envio is 2200 when pvpPublicado is >= 15990', () => {
        expect(component.formControls.envio.value).toEqual(2200);
    });

    it('test netoEnvio when pvpPublicado is < 15990', () => {
        component.formControls.pvpPublicado.setValue(12990);
        expect(component.netoEnvio().toFixed(2)).toEqual('0.00');
    });

    it('test netoEnvio when pvpPublicado is >= 15990', () => {
        expect(component.netoEnvio().toFixed(2)).toEqual('1848.74');
    });

    it('test ivaEnvio when pvpPublicado is < 15990', () => {
        component.formControls.pvpPublicado.setValue(12990);
        expect(component.ivaEnvio().toFixed(2)).toEqual('0.00');
    });

    it('test ivaEnvio when pvpPublicado is >= 15990', () => {
        expect(component.ivaEnvio().toFixed(2)).toEqual('351.26');
    });

    it('test ventaMenosComision is 10911.6  when pvpPublicado is < 15990', () => {
        component.formControls.pvpPublicado.setValue(12990);
        expect(component.formControls.ventaMenosComision.value).toEqual(10911.6);
    });

    it('test ventaMenosComision is 33071.6 when pvpPublicado is >= 15990', () => {
        expect(component.formControls.ventaMenosComision.value).toEqual(33071.6);
    });

    it('test netoVentaMenosComision is 27791,26 when pvpPublicado is 41990', () => {
        expect(component.netoVentaMenosComision().toFixed(2)).toEqual('27791.26');
    });

    it('test netoVentaMenosComision is 9169,41 when pvpPublicado is 12990', () => {
        component.formControls.pvpPublicado.setValue(12990);
        expect(component.netoVentaMenosComision().toFixed(2)).toEqual('9169.41');
    });

    it('test ivaVentaMenosComision is 5280.33 when pvpPublicado is 41990', () => {
        expect(component.ivaVentaMenosComision().toFixed(2)).toEqual('5280.34');
    });

    it('test ivaVentaMenosComision is 1742.18 when pvpPublicado is 12990', () => {
        component.formControls.pvpPublicado.setValue(12990);
        expect(component.ivaVentaMenosComision().toFixed(2)).toEqual('1742.19');
    });

    it('test ganancia is 3848.26 when pvpPublicado is 41990', () => {
        expect(component.formControls.ganancia.value).toEqual('3848.26');
    });

    it('test ganancia is 411.76 when pvpPublicado is 2000 and precioCosto is 1000', () => {
        component.formControls.precioCosto.setValue(1000);
        component.formControls.pvpPublicado.setValue(2000);
        expect(component.formControls.ganancia.value).toEqual('411.76');
    });

    it('test % ganancia is 0.14 when pvpPublicado is 41990 and precioCosto is 21943', () => {
        expect(component.ganancia().toFixed(2)).toEqual('0.14');
    });

    it('test % ganancia is 0.29 when pvpPublicado is 2000 and precioCosto is 1000', () => {
        component.formControls.precioCosto.setValue(1000);
        component.formControls.pvpPublicado.setValue(2000);
        expect(component.ganancia().toFixed(2)).toEqual('0.29');
    });

    it('test reiniciar', () => {
        component.reiniciar();
        expect(component.formControls.precioCosto.value).toEqual(null);
        expect(component.formControls.pvpPublicado.value).toEqual(null);
    });
});
