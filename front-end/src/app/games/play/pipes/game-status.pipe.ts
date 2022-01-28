import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameStatus'
})
export class GameStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? 'won' : 'lost'
  }

}
