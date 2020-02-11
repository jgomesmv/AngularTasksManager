import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TodayPage } from './pages/today/today.page';
import { UsersGridComponent } from './pages/today/resources/users-grid/users-grid.component';


@NgModule({
  declarations: [TodayPage, UsersGridComponent],
  imports: [
    CommonModule,
    TasksRoutingModule
  ],
  exports: [UsersGridComponent]
})
export class TasksModule { }
