import { Params } from './params';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

// NOTE: don't know why ArcGIS has x, y backwards!

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-topo',
  template: `
    <ng-container *ngFor="let y of yTiles; let iy = index">
      <ng-container *ngFor="let x of xTiles; let ix = index">
        <img
          [ngStyle]="{
            'display': 'inlin-block',
            'height.px': params.dims.cyTile * params.scale,
            'vertical-align': 'top',
            'width.px': params.dims.cxTile * params.scale
          }"
          src="/topo/tile/{{ params.zoom }}/{{ y + iy }}/{{ x + ix }}"
        />
      </ng-container>
    </ng-container>
  `
})
export class TopoComponent {
  xTiles = new Array(this.params.dims.numXTiles).fill(this.params.tiles.left);
  yTiles = new Array(this.params.dims.numYTiles).fill(this.params.tiles.top);

  constructor(public params: Params) {}
}
