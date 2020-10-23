import { Params } from './params';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-root',
  template: `
    <main
      *ngIf="params.ready"
      [ngStyle]="{
        'height.px': params.dims.cyTile * params.dims.numYTiles * params.scale,
        'width.px': params.dims.cxTile * params.dims.numXTiles * params.scale
      }"
    >
      <map-topo></map-topo>
      <map-forest></map-forest>
      <map-contours></map-contours>
    </main>
  `
})
export class RootComponent {
  constructor(public params: Params) {}
}
