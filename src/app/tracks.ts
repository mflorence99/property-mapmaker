import { GpsData } from './gps-data';
import { Params } from './params';
import { Point } from './gps-data';
import { XY } from './params';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { Input } from '@angular/core';

const SMOOTHING = 0.2;

type LineProps = { angle: number; length: number };

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-tracks',
  template: `<svg
    attr.viewPort="0 0 {{ params.dims.cxNominal }} {{ params.dims.cyNominal }}"
  >
    <defs>
      <pattern id="halftone" patternUnits="userSpaceOnUse" width="2" height="2">
        <g fill="rgba(0, 0, 0, 0.5)">
          <rect x="0" y="0" width="1" height="1" />
          <rect x="1" y="1" width="1" height="1" />
        </g>
      </pattern>
      <pattern
        [attr.width]="20 / params.scale"
        [attr.height]="20 / params.scale"
        id="wetland"
        patternUnits="userSpaceOnUse"
      >
        <path
          class="icon-wetland"
          d="M1.48 4.5A2.18 2.18 0 0 1 3 4a2.36 2.36 0 0 1 2.5 2l.78 4.68a2.3 2.3 0 0 0-2 .05L3.48 6a2.21 2.21 0 0 0-2-1.5zm6 6.74a3.41 3.41 0 0 1 1.3-.65L10 3a2.21 2.21 0 0 1 2-1.5 2.18 2.18 0 0 0-1.5-.5A2.36 2.36 0 0 0 8 3l-1.3 7.79c.279.115.54.267.78.45zm4.32-.5c.157-.128.324-.241.5-.34L13 6a2.21 2.21 0 0 1 2-1.5 2.18 2.18 0 0 0-1.5-.5A2.36 2.36 0 0 0 11 6l-.67 4a3.41 3.41 0 0 1 1.47.74zM14 12a1.78 1.78 0 0 0-1.19.42l-.47.41a.75.75 0 0 1-1 0c-.15-.12-.29-.26-.44-.39a1.9 1.9 0 0 0-2.45 0c-.16.13-.31.28-.47.41a.75.75 0 0 1-1 0c-.16-.13-.31-.28-.47-.41a1.9 1.9 0 0 0-2.44 0c-.15.13-.29.27-.44.39a.92.92 0 0 1-.3.16.84.84 0 0 1-.8-.25 6.167 6.167 0 0 0-.79-.58 1.23 1.23 0 0 0-.68-.16H1a.5.5 0 0 0 0 1 .93.93 0 0 1 .64.31l.36.26a1.9 1.9 0 0 0 2.33.06c.19-.14.36-.32.55-.47a.75.75 0 0 1 1 0l.39.35a1.91 1.91 0 0 0 2.46.07c.15-.11.27-.25.42-.37a.77.77 0 0 1 1.089-.011l.011.011.39.35a1.89 1.89 0 0 0 1.76.37 2.14 2.14 0 0 0 1-.6A1 1 0 0 1 14 13a.5.5 0 0 0 0-1z"
        />
      </pattern>
    </defs>
    <g *ngFor="let track of gpsData[key] | keyvalue" [id]="track.key.trim()">
      <ng-container *ngIf="outlined; else normalPath">
        <path id="outline" [attr.d]="path(track.value)" />
        <path id="background" [attr.d]="path(track.value)" />
        <path id="colorized" [attr.d]="path(track.value)" />
      </ng-container>
      <ng-template #normalPath>
        <path [attr.d]="path(track.value)" />
      </ng-template>
    </g>
  </svg>`
})
export class TracksComponent {
  @Input() key: string;
  @Input() op: string;
  @Input() outlined: boolean;

  constructor(public gpsData: GpsData, public params: Params) {}

  // @see https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74

  bezier(point: Point, ix: number, points: Point[]): string {
    const current = this.params.point2xy(point);
    const next = this.params.point2xy(points[ix + 1]);
    const previous = this.params.point2xy(points[ix - 1]);
    const pprevious = this.params.point2xy(points[ix - 2]);
    const [x, y] = current;
    const [cpsX, cpsY] = this.controlPoint(previous, pprevious, current);
    const [cpeX, cpeY] = this.controlPoint(current, previous, next, true);
    return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${x},${y}`;
  }

  linear(point: Point): string {
    const [x, y] = this.params.point2xy(point);
    return `L ${x} ${y}`;
  }

  path(points: Point[]): string {
    return points.reduce(
      (acc: string, point: Point, ix: number, points: Point[]) => {
        if (ix === 0) {
          const [x, y] = this.params.point2xy(point);
          return `M ${x} ${y}`;
        } else return `${acc} ${this[this.op](point, ix, points)}`;
      },
      ''
    );
  }

  private controlPoint(
    [cx, cy]: XY,
    previous: XY,
    next: XY,
    reverse = false
  ): XY {
    previous = previous ?? [cx, cy];
    next = next ?? [cx, cy];
    // properties of opposed line
    const lineProps = this.lineProps(previous, next);
    // if is end-control-point, add PI to the angle to go backward
    const angle = lineProps.angle + (reverse ? Math.PI : 0);
    const length = lineProps.length * SMOOTHING;
    // control point position is relative to the current point
    const x = cx + Math.cos(angle) * length;
    const y = cy + Math.sin(angle) * length;
    return [x, y];
  }

  private lineProps([px, py]: XY, [qx, qy]: XY): LineProps {
    const lx = qx - px;
    const ly = qy - py;
    return {
      angle: Math.atan2(ly, lx),
      length: Math.sqrt(Math.pow(lx, 2) + Math.pow(ly, 2))
    };
  }
}
