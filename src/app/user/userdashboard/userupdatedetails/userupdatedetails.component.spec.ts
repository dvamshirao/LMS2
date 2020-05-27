import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserupdatedetailsComponent } from './userupdatedetails.component';

describe('UserupdatedetailsComponent', () => {
  let component: UserupdatedetailsComponent;
  let fixture: ComponentFixture<UserupdatedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserupdatedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserupdatedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
