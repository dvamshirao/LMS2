import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjcirculationComponent } from './projcirculation.component';

describe('ProjcirculationComponent', () => {
  let component: ProjcirculationComponent;
  let fixture: ComponentFixture<ProjcirculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjcirculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjcirculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
