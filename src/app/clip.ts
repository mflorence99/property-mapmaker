import { Geometry } from './geometry';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-clip',
  template: `<svg
    attr.viewPort="0 0 {{ geometry.dims.cxNominal }} {{
      geometry.dims.cyNominal
    }}"
  >
    <defs>
      <clipPath
        attr.transform="scale({{ geometry.scale }}, {{ geometry.scale }})"
        clipPathUnits="userSpaceOnUse"
        id="boundary"
      >
        <polygon [attr.points]="geometry.boundary()" />
      </clipPath>
    </defs>
  </svg>`
})
export class ClipComponent {
  constructor(public geometry: Geometry) {}
}
