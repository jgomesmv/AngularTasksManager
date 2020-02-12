import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandbyTasksComponent } from './standby-tasks.component';

describe('StandbyTasksComponent', () => {
  let component: StandbyTasksComponent;
  let fixture: ComponentFixture<StandbyTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandbyTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandbyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
