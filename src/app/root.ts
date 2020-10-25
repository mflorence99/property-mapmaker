import { Params } from './params';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-root',
  template: `
    <main *ngIf="params.ready">
      <map-topo></map-topo>
      <map-forest></map-forest>
      <map-street></map-street>
      <map-contours *ngIf="params.scale > 1"></map-contours>
    </main>
  `
})
export class RootComponent {
  constructor(public params: Params) {}
}
