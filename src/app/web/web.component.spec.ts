import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WebComponent} from './web.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";

describe('WebComponent', () => {
    let component: WebComponent;
    let fixture: ComponentFixture<WebComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MatTableModule,
                MatTooltipModule
            ],
            declarations: [WebComponent],
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
        fixture = TestBed.createComponent(WebComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
