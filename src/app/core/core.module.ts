import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFilterComponent } from './components/text-filter/text-filter.component';
import { DropdownFilterComponent } from './components/dropdown-filter/dropdown-filter.component';
import { DateNavigatorComponent } from './components/date-navigator/date-navigator.component';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
  declarations: [TextFilterComponent, DropdownFilterComponent, DateNavigatorComponent, FilterPipe, OrderByPipe],
  imports: [CommonModule],
  exports: [TextFilterComponent, DropdownFilterComponent, DateNavigatorComponent, FilterPipe, OrderByPipe]
})
export class CoreModule {}
