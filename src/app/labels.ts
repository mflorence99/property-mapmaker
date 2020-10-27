import { GpsData } from './gps-data';
import { Params } from './params';
import { Point } from './gps-data';
import { XY } from './params';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-labels',
  template: `<svg
    attr.viewPort="0 0 {{ params.dims.cxNominal }} {{ params.dims.cyNominal }}"
  >
    <g
      *ngFor="let waypoint of gpsData[key] | keyvalue"
      [id]="waypoint.key.trim()"
    >
      <text
        [attr.x]="point(waypoint.value)[0]"
        [attr.y]="point(waypoint.value)[1]"
        text-anchor="middle"
      >
        <tspan
          *ngFor="let word of words(waypoint.key); let ix = index"
          [attr.dy]="ix > 0 ? '1em' : 0"
          [attr.x]="point(waypoint.value)[0]"
        >
          {{ word }}
        </tspan>
      </text>
    </g>
  </svg>`
})
export class LabelsComponent {
  @Input() key: string;

  constructor(public gpsData: GpsData, public params: Params) {}

  point(point: Point): XY {
    return this.params.point2xy(point);
  }

  words(text: string): string[] {
    return text.split(' ');
  }
}
