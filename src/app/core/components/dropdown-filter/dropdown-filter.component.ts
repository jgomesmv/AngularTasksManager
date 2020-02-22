import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectListItem } from '../../models/select-list-item/select-list-item';

@Component({
  selector: 'dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss'],
  host: { class: 'c-dropdown-filter' }
})
export class DropdownFilterComponent implements OnInit {
  @Input() selectList: SelectListItem[] = [];
  @Output() public valueSelected = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onValueChanged(value: string): void {
    this.valueSelected.emit(value);
  }
}
