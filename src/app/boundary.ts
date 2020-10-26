import { GpsData } from './gps-data';
import { Params } from './params';
import { Point } from './gps-data';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-boundary',
  template: `<svg
    attr.viewPort="0 0 {{ params.dims.cxNominal }} {{ params.dims.cyNominal }}"
  >
    <g><polygon [attr.points]="bounds()" /></g>
  </svg>`
})
export class BoundaryComponent {
  constructor(public gpsData: GpsData, public params: Params) {}

  bounds(): string {
    return this.gpsData.boundary.Boundary.map((point: Point) =>
      this.params.point2xy(point).join(',')
    ).join(' ');
  }
}
