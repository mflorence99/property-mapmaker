import { Geometry } from './geometry';
import { GpsData } from './gps-data';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'map-routes',
  template: `<svg
    attr.viewPort="0 0 {{ geometry.dims.cxNominal }} {{
      geometry.dims.cyNominal
    }}"
  >
    <defs>
      <path
        *ngFor="let route of gpsData.routes | keyvalue"
        [attr.d]="geometry.path(route.value)"
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
  constructor(public geometry: Geometry, public gpsData: GpsData) {}

  text(key: string): string {
    const matches = /([^\d]+)/.exec(key);
    return matches?.[1].trim();
  }
}
