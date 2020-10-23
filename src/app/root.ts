import { Params } from './params';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-root',
  template: `
    <main *ngIf="params.ready">
      <map-contours></map-contours>
    </main>
  `
})
export class RootComponent {
  constructor(public params: Params) {}
}
