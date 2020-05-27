import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedetailsComponent } from './updatedetails.component';

describe('UpdatedetailsComponent', () => {
  let component: UpdatedetailsComponent;
  let fixture: ComponentFixture<UpdatedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
