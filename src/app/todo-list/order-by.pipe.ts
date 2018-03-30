import { Pipe, PipeTransform } from '@angular/core';
import { TodoItem } from '../todo-item';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: TodoItem[], orderedBy: any): any {
    if (!Array.isArray(array)) {
      return array;
    }

    if (orderedBy.ascending) {
      return array.sort((x, y) =>
        x[orderedBy.field].toString().toLowerCase() > y[orderedBy.field].toString().toLowerCase() ? +1 :
          x[orderedBy.field].toString().toLowerCase() < y[orderedBy.field].toString().toLowerCase() ? -1 : 0);
    } else {
      return array.sort((x, y) =>
        x[orderedBy.field].toString().toLowerCase() > y[orderedBy.field].toString().toLowerCase() ? -1 :
          x[orderedBy.field].toString().toLowerCase() < y[orderedBy.field].toString().toLowerCase() ? +1 : 0);
    }
  }
}
