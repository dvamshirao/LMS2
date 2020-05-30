import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjissuedetailsComponent } from './projissuedetails.component';

describe('ProjissuedetailsComponent', () => {
  let component: ProjissuedetailsComponent;
  let fixture: ComponentFixture<ProjissuedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjissuedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjissuedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
