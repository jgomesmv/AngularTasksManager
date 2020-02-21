import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodayPage } from './pages/today/today.page';
import { GridItemResolver } from './resolvers/grid-item-resolve.resolver';

const routes: Routes = [{ path: '', component: TodayPage, resolve: {
  resolved: GridItemResolver
} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [GridItemResolver]
})
export class TasksRoutingModule { }
