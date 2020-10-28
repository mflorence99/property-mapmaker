import { GpsData } from './gps-data';
import { Params } from './params';
import { Point } from './gps-data';
import { XY } from './params';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

const CX_BRIDGE = 12;
const CY_BRIDGE = 10;

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-bridges',
  template: `<svg
    attr.viewPort="0 0 {{ params.dims.cxNominal }} {{ params.dims.cyNominal }}"
  >
    <g
      *ngFor="let bridge of gpsData.bridges | keyvalue"
      [id]="bridge.key.trim()"
    >
      <ng-container *ngIf="nominal(bridge.value) as nominal">
        <g
          *ngIf="center(bridge.value) as center"
          [attr.transform]="
            'rotate(' +
            (rotations[bridge.key.trim()] || 0) +
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
          class="icon-bridge"
        >
          <path
            class="roadway"
            d="M 0,0 L 2,2 L 9,2 L 11,0 L 11,9 L 9,7 L 2,7 L 0,9 Z"
          />
          <path class="edges" d="M 0,0 L 2,2 L 9,2 L 11,0" />
          <path class="edges" d="M 0,9 L 2,7 L 9,7 L 11,9" />
        </g>
      </ng-container>
    </g>
  </svg>`
})
export class BridgesComponent {
  /* eslint-disable @typescript-eslint/naming-convention */
  rotations = {
    'Bridge 1': 25,
    'Bridge 2': -10,
    'Bridge 3': -24
  };

  constructor(public gpsData: GpsData, public params: Params) {}

  center(point: Point): XY {
    const [x, y] = this.params.point2xy(point);
    return [x - CX_BRIDGE / 2, y - CY_BRIDGE / 2];
  }

  nominal(point: Point): XY {
    return this.params.point2xy(point);
  }
}
