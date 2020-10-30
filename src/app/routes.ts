import { GpsData } from './gps-data';
import { Params } from './params';
import { Point } from './gps-data';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-routes',
  template: `<svg
    attr.viewPort="0 0 {{ params.dims.cxNominal }} {{ params.dims.cyNominal }}"
  >
    <defs>
      <path
        *ngFor="let route of gpsData.routes | keyvalue"
        [attr.d]="path(route.value)"
        [id]="'path_' + route.key.replace(' ', '_')"
      />
    </defs>
    <g>
      <text
        *ngFor="let route of gpsData.routes | keyvalue"
        [id]="route.key.trim()"
      >
        <textPath [attr.href]="'#path_' + route.key.replace(' ', '_')">
          {{ text(route.key) }}
        </textPath>
      </text>
    </g>
  </svg>`
})
export class RoutesComponent {
  constructor(public gpsData: GpsData, public params: Params) {}

  linear(point: Point): string {
    const [x, y] = this.params.point2xy(point);
    return `L ${x} ${y}`;
  }

  path(points: Point[]): string {
    return points.reduce((acc: string, point: Point, ix: number) => {
      if (ix === 0) {
        const [x, y] = this.params.point2xy(point);
        return `M ${x} ${y}`;
      } else return `${acc} ${this.linear(point)}`;
    }, '');
  }

  text(key: string): string {
    const matches = /([^\d]+)/.exec(key);
    return matches?.[1].trim();
  }
}
