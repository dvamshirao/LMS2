import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaybookrequestsComponent } from './displaybookrequests.component';

describe('DisplaybookrequestsComponent', () => {
  let component: DisplaybookrequestsComponent;
  let fixture: ComponentFixture<DisplaybookrequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaybookrequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaybookrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
