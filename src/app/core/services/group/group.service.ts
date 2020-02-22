import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  public groups = [
    'G10',
    'G10',
    'G1',
    'G2',
    'G11',
    'G0',
    'G0',
    'G4',
    'G8',
    'G0',
    'G9',
    'G1'
  ];

  constructor() {}

  get() {
    return of(this.groups);
  }
}
