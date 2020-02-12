import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFilterComponent } from './components/text-filter/text-filter.component';
import { DropdownFilterComponent } from './components/dropdown-filter/dropdown-filter.component';
import { DateNavigatorComponent } from './components/date-navigator/date-navigator.component';

@NgModule({
  declarations: [TextFilterComponent, DropdownFilterComponent, DateNavigatorComponent],
  imports: [CommonModule],
  exports: [TextFilterComponent, DropdownFilterComponent, DateNavigatorComponent]
})
export class CoreModule {}
