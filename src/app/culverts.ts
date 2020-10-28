import { GpsData } from './gps-data';
import { Params } from './params';
import { Point } from './gps-data';
import { XY } from './params';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

const CX_CULVERT = 14;
const CY_CULVERT = 3;

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-culverts',
  template: `<svg
    attr.viewPort="0 0 {{ params.dims.cxNominal }} {{ params.dims.cyNominal }}"
  >
    <g
      *ngFor="let culvert of gpsData.culverts | keyvalue"
      [id]="culvert.key.trim()"
    >
      <ng-container *ngIf="nominal(culvert.value) as nominal">
        <g
          *ngIf="center(culvert.value) as center"
          [attr.transform]="
            'rotate(' +
            (rotations[culvert.key.trim()] || 0) +
            ',' +
            nominal[0] +
            ',' +
            nominal[1] +
            ') ' +
            'translate(' +
            center[0] +
            ',' +
            center[1] +
            ')'
          "
        >
          <ng-container *ngIf="desc(culvert.key) as d">
            <text x="0" y="-2" text-anchor="middle">
              {{ d.len }}"-{{ d.id }}
            </text>
          </ng-container>
          <path d="M 0,0 L 13,0" />
          <path d="M 0,2 L 13,2" />
        </g>
      </ng-container>
    </g>
  </svg>`
})
export class CulvertsComponent {
  /* eslint-disable @typescript-eslint/naming-convention */
  rotations = {
    'Culvert 4-1': -20,
    'Culvert 4-4': 90,
    'Culvert 4-5': 160,
    'Culvert 12-17': 10,
    'Culvert 12-20': -20,
    'Culvert 12-21': 20,
    'Culvert 12-22': 20,
    'Culvert 12-23': -70,
    'Culvert 12-24': 20,
    'Culvert 12-25': 40,
    'Culvert 12-26': 70,
    'Culvert 12-27': 95,
    'Culvert 12-28': 20,
    'Culvert 12-29': 170,
    'Culvert 12-34': 60,
    'Culvert 12-35': 130,
    'Culvert 12-36': 170,
    'Culvert 24-2': 82,
    'xxx': 0
  };

  constructor(public gpsData: GpsData, public params: Params) {}

  center(point: Point): XY {
    const [x, y] = this.params.point2xy(point);
    return [x - CX_CULVERT / 2, y - CY_CULVERT / 2];
  }

  desc(key: string): { id: string; len: number } {
    const matches = /Culvert ([\d]+)-([\d]+)/.exec(key);
    return { id: matches?.[2], len: Number(matches?.[1]) };
  }

  nominal(point: Point): XY {
    return this.params.point2xy(point);
  }
}
