import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  public transform(value, keys: string, term: string) {
    if (!term) {
      return value;
    }
    const res = (value || []).filter(item =>
      keys
        .split(',')
        .some(
          key =>
            item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])
        )
    );
    return res.length ? res : null;
  }
}
