import { Geometry } from './geometry';
import { GpsData } from './gps-data';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'map-legend',
  template: `<svg
    attr.viewPort="0 0 {{ geometry.dims.cxNominal }} {{
      geometry.dims.cyNominal
    }}"
  >
    <g *ngFor="let track of gpsData.legend | keyvalue" [id]="track.key.trim()">
      <path [attr.d]="geometry.path(track.value, 'bezier')" />
      <text
        *ngIf="geometry.point2xy(track.value[track.value.length - 1]) as xy"
        [attr.x]="xy[0] + 8"
        [attr.y]="xy[1] + 4"
      >
        {{ track.key }}
      </text>
    </g>
  </svg>`
})
export class LegendComponent {
  constructor(public geometry: Geometry, public gpsData: GpsData) {}
}
