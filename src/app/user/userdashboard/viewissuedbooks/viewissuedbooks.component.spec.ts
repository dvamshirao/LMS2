import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewissuedbooksComponent } from './viewissuedbooks.component';

describe('ViewissuedbooksComponent', () => {
  let component: ViewissuedbooksComponent;
  let fixture: ComponentFixture<ViewissuedbooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewissuedbooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewissuedbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
