import { Geometry } from './geometry';
import { GpsData } from './gps-data';
import { Point } from './gps-data';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

const PADDING = 16;
const HEIGHT = 110;
const WIDTH = 250;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'map-legend',
  template: `<svg
    attr.viewPort="0 0 {{ geometry.dims.cxNominal }} {{
      geometry.dims.cyNominal
    }}"
  >
    <g *ngIf="bounds() as rect">
      <g id="bounds">
        <rect
          [attr.x]="rect.x"
          [attr.y]="rect.y"
          [attr.width]="rect.width"
          [attr.height]="rect.height"
        />
      </g>
      <g
        *ngFor="let track of gpsData.legend | keyvalue"
        [id]="track.key.trim()"
      >
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
      <g id="annotation">
        <text
          [attr.x]="rect.x + rect.width / 2"
          [attr.y]="rect.y + rect.height - 16"
          text-anchor="middle"
        >
          Grid interval 200ft, each square ~1ac
        </text>
      </g>
    </g>
  </svg>`
})
export class LegendComponent {
  constructor(public geometry: Geometry, public gpsData: GpsData) {}

  bounds(): { height: number; width: number; x: number; y: number } {
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
    // convert to rect
    const tl = this.geometry.point2xy({ lat: top, lon: left });
    return {
      x: tl[0] - PADDING,
      y: tl[1] - PADDING,
      width: WIDTH,
      height: HEIGHT
    };
  }
}
