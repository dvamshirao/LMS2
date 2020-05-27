import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitbookrequestComponent } from './submitbookrequest.component';

describe('SubmitbookrequestComponent', () => {
  let component: SubmitbookrequestComponent;
  let fixture: ComponentFixture<SubmitbookrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitbookrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitbookrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
