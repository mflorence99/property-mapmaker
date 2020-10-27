import { GpsData } from './gps-data';
import { Params } from './params';
import { Point } from './gps-data';
import { XY } from './params';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-bridges',
  template: `<svg
    attr.viewPort="0 0 {{ params.dims.cxNominal }} {{ params.dims.cyNominal }}"
  >
    <defs>
      <g id="bridge">
        <path
          fill="white"
          d="M 0,0 L 2,2 L 9,2 L 11,0 L 11,7 L 9,5 L 2,5 L 0,7 Z"
        />
        <path
          stroke="#9e9e9e"
          fill="transparent"
          d="M 0,0 L 2,2 L 9,2 L 11,0 "
        />
        <path
          stroke="#9e9e9e"
          fill="transparent"
          d="M 0,7 L 2,5 L 9,5 L 11,7 "
        />
      </g>
    </defs>
    <g
      *ngFor="let bridge of gpsData.bridges | keyvalue"
      [id]="bridge.key.trim()"
    >
      <use
        [attr.x]="point(bridge.value)[0] - 12"
        [attr.y]="point(bridge.value)[1]"
        transform="rotate(45, 325.4200560887655, 128.20345940797137)"
        xlink:href="#bridge"
      ></use>
    </g>
  </svg>`
})
export class BridgesComponent {
  constructor(public gpsData: GpsData, public params: Params) {}

  point(point: Point): XY {
    return this.params.point2xy(point);
  }
}
