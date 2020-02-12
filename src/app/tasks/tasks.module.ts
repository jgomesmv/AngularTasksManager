import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TodayPage } from './pages/today/today.page';
import { UsersGridComponent } from './pages/today/resources/users-grid/users-grid.component';
import { StandbyTasksComponent } from './pages/today/resources/standby-tasks/standby-tasks.component';

@NgModule({
  declarations: [TodayPage, UsersGridComponent, StandbyTasksComponent],
  imports: [CommonModule, TasksRoutingModule],
  exports: [UsersGridComponent]
})
export class TasksModule {}
