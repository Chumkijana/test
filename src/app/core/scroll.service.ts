import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ScrollService {

  atTop = true;

  $atTop: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  scroll(scrollTop: number): void {
    const currentAtTop = scrollTop === 0;

    if (this.atTop === currentAtTop) {
      return;
    }

    this.atTop = currentAtTop;
    this.$atTop.next(this.atTop);
  }

}
