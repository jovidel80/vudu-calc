import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FalabellaComponent } from './falabella.component';

describe('FalabellaComponent', () => {
  let component: FalabellaComponent;
  let fixture: ComponentFixture<FalabellaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FalabellaComponent ]
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
