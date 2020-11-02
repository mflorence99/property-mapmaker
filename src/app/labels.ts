import { Geometry } from './geometry';
import { GpsData } from './gps-data';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'map-labels',
  template: `<svg
    attr.viewPort="0 0 {{ geometry.dims.cxNominal }} {{
      geometry.dims.cyNominal
    }}"
  >
    <g
      *ngFor="let waypoint of gpsData[key] | keyvalue"
      [id]="waypoint.key.trim()"
    >
      <ng-container *ngIf="geometry.point2xy(waypoint.value) as xy">
        <text [attr.x]="xy[0]" [attr.y]="xy[1]" text-anchor="middle">
          <tspan
            *ngFor="let word of words(waypoint.key); let ix = index"
            [attr.dy]="ix > 0 ? '1em' : 0"
            [attr.x]="xy[0]"
          >
            {{ word }}
          </tspan>
        </text>
      </ng-container>
    </g>
  </svg>`
})
export class LabelsComponent {
  @Input() key: string;

  constructor(public geometry: Geometry, public gpsData: GpsData) {}

  words(text: string): string[] {
    return text.split(' ');
  }
}
