import { Geometry } from './geometry';
import { GpsData } from './gps-data';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-overlay',
  template: `<svg
    attr.viewPort="0 0 {{ geometry.dims.cxNominal }} {{
      geometry.dims.cyNominal
    }}"
  >
    <g
      *ngFor="let waypoint of gpsData.overlay | keyvalue"
      [id]="waypoint.key.trim()"
    >
      <ng-container *ngIf="geometry.point2xy(waypoint.value) as xy">
        <image
          *ngIf="waypoint.key === 'Compass'"
          [attr.x]="xy[0]"
          [attr.y]="xy[1]"
          width="61"
          height="97"
          href="assets/compass.svg"
        />
      </ng-container>
    </g>
  </svg>`
})
export class OverlayComponent {
  constructor(public geometry: Geometry, public gpsData: GpsData) {}
}
