import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderscore'
})
export class RemoveUnderscorePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    value = value?.replace('_sharp', '#').replace('_', ' ').replace('_', ' ').replace('_', ' ');
    return value;
  }

}
