import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FalabellaComponent} from './falabella.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Overlay} from "@angular/cdk/overlay";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('FalabellaComponent', () => {
  let component: FalabellaComponent;
  let fixture: ComponentFixture<FalabellaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FalabellaComponent ],
      imports: [
        ReactiveFormsModule,
        MatTableModule,
        ClipboardModule
      ],
      providers: [
        FormBuilder,
        MatSnackBar,
        Overlay
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FalabellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
