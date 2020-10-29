import { GpsData } from './gps-data';
import { Params } from './params';
import { Point } from './gps-data';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-clip',
  template: `<svg
    attr.viewPort="0 0 {{ params.dims.cxNominal }} {{ params.dims.cyNominal }}"
  >
    <defs>
      <clipPath
        attr.transform="scale({{ params.scale }}, {{ params.scale }})"
        clipPathUnits="userSpaceOnUse"
        id="boundary"
      >
        <polygon [attr.points]="bounds()" />
      </clipPath>
    </defs>
  </svg>`
})
export class ClipComponent {
  constructor(public gpsData: GpsData, public params: Params) {}

  bounds(): string {
    return this.gpsData.boundary.Boundary.map((point: Point) =>
      this.params.point2xy(point).join(',')
    ).join(' ');
  }
}
