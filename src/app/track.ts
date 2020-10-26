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
  selector: 'map-track',
  template: `<svg
    attr.viewPort="0 0 {{ params.dims.cxNominal }} {{ params.dims.cyNominal }}"
  >
    <g *ngFor="let track of gpsData[key] | keyvalue" [id]="track.key.trim()">
      <path [attr.d]="path(track.value, bezier.bind(this))" />
    </g>
  </svg>`
})
export class TrackComponent {
  @Input() key: string;

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

  path(points: Point[], op: Function): string {
    return points.reduce(
      (acc: string, point: Point, ix: number, points: Point[]) => {
        if (ix === 0) {
          const [x, y] = this.params.point2xy(point);
          return `M ${x} ${y}`;
        } else return `${acc} ${op(point, ix, points)}`;
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
