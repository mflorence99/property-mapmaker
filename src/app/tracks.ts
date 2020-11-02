import { Geometry } from './geometry';
import { GpsData } from './gps-data';
import { PathOp } from './geometry';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'map-tracks',
  template: `<svg
    attr.viewPort="0 0 {{ geometry.dims.cxNominal }} {{
      geometry.dims.cyNominal
    }}"
  >
    <g *ngFor="let track of gpsData[key] | keyvalue" [id]="track.key.trim()">
      <ng-container *ngIf="outlined; else normalPath">
        <path id="outline" [attr.d]="geometry.path(track.value, op)" />
        <path id="colorized" [attr.d]="geometry.path(track.value, op)" />
      </ng-container>
      <ng-template #normalPath>
        <path [attr.d]="geometry.path(track.value, op)" />
      </ng-template>
    </g>
  </svg>`
})
export class TracksComponent {
  @Input() key: string;
  @Input() op: PathOp;
  @Input() outlined: boolean;

  constructor(public geometry: Geometry, public gpsData: GpsData) {}
}
