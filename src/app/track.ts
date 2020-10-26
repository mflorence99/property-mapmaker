import { GpsData } from './gps-data';
import { Params } from './params';
import { Point } from './gps-data';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-track',
  template: `<svg
    attr.viewPort="0 0 {{ params.dims.cxNominal }} {{ params.dims.cyNominal }}"
  >
    <g *ngFor="let track of gpsData[key] | keyvalue" [id]="track.key.trim()">
      <path [attr.d]="path(track.value)" />
    </g>
  </svg>`
})
export class TrackComponent {
  @Input() key: string;

  constructor(public gpsData: GpsData, public params: Params) {}

  path(points: Point[]): string {
    return (
      'M ' +
      points
        .map((point: Point) => this.params.point2xy(point).join(','))
        .join(' L ')
    );
  }
}
