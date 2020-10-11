import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RipleyComponent } from './ripley.component';

describe('RipleyComponent', () => {
  let component: RipleyComponent;
  let fixture: ComponentFixture<RipleyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RipleyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RipleyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
