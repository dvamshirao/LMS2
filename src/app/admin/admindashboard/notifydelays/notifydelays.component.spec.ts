import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifydelaysComponent } from './notifydelays.component';

describe('NotifydelaysComponent', () => {
  let component: NotifydelaysComponent;
  let fixture: ComponentFixture<NotifydelaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifydelaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifydelaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
