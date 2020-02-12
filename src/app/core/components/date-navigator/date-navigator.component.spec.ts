import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateNavigatorComponent } from './date-navigator.component';

describe('DateNavigatorComponent', () => {
  let component: DateNavigatorComponent;
  let fixture: ComponentFixture<DateNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
