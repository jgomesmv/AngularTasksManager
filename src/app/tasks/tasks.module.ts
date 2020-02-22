import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TasksRoutingModule } from './tasks-routing.module';
import { TodayPage } from './pages/today/today.page';
import { UserTaskGridComponent } from './pages/today/resources/users-grid/user-task-grid.component';
import { StandbyTasksComponent } from './pages/today/resources/standby-tasks/standby-tasks.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [TodayPage, UserTaskGridComponent, StandbyTasksComponent],
  imports: [CommonModule, TasksRoutingModule, DragDropModule, CoreModule],
  exports: [UserTaskGridComponent]
})
export class TasksModule {}
