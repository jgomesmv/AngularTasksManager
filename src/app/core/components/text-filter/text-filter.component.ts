import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['./text-filter.component.scss'],
  host: { class: 'c-textFilter' }
})
export class TextFilterComponent implements OnInit {
  @Output() public filterChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onfilterChanged(value: string) {
    this.filterChanged.emit(value);
  }

}
