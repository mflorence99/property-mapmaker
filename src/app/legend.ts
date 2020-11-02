import { Geometry } from './geometry';
import { GpsData } from './gps-data';
import { Point } from './gps-data';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

const PADDING = 16;
const WIDTH = 84;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'map-legend',
  template: `<svg
    attr.viewPort="0 0 {{ geometry.dims.cxNominal }} {{
      geometry.dims.cyNominal
    }}"
  >
    <g id="bounds"><path [attr.d]="bounds()" /></g>
    <g *ngFor="let track of gpsData.legend | keyvalue" [id]="track.key.trim()">
      <path id="outline" [attr.d]="geometry.path(track.value, 'bezier')" />
      <path id="colorized" [attr.d]="geometry.path(track.value, 'bezier')" />
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

  bounds(): string {
    let bottom = Number.MAX_SAFE_INTEGER;
    let left = Number.MAX_SAFE_INTEGER;
    let top = Number.MIN_SAFE_INTEGER;
    let right = Number.MIN_SAFE_INTEGER;
    // get lat/lon bounds
    Object.keys(this.gpsData.legend).forEach((key) => {
      this.gpsData.legend[key].forEach((point: Point) => {
        right = Math.max(right, point.lon);
        top = Math.max(top, point.lat);
        left = Math.min(left, point.lon);
        bottom = Math.min(bottom, point.lat);
      });
    });
    // convert to path
    const tl = this.geometry.point2xy({ lat: top, lon: left });
    const br = this.geometry.point2xy({ lat: bottom, lon: right });
    return `M ${tl[0] - PADDING},${tl[1] - PADDING} 
    L ${br[0] + WIDTH},${tl[1] - PADDING} 
    L ${br[0] + WIDTH},${br[1] + PADDING} 
    L ${tl[0] - PADDING},${br[1] + PADDING} 
    Z`;
  }
}
