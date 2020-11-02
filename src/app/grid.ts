import { Geometry } from './geometry';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'map-grid',
  template: `<svg
    attr.viewPort="0 0 {{ geometry.dims.cxNominal }} {{
      geometry.dims.cyNominal
    }}"
  >
    <g>
      <g id="annotations">
        <text
          [attr.x]="this.geometry.clip.cy / (this.numHGrids * 2)"
          [attr.y]="12"
          [attr.transform]="translate()"
          text-anchor="middle"
        >
          200ft
        </text>
      </g>
      <g id="border">
        <path [attr.d]="border()" [attr.transform]="translate()" />
      </g>
      <g id="gridlines">
        <path
          *ngFor="let line of hlines()"
          [attr.d]="line"
          [attr.transform]="translate()"
        />
        <path
          *ngFor="let line of vlines()"
          [attr.d]="line"
          [attr.transform]="translate()"
        />
      </g>
      <g id="annotations">
        <text
          [attr.x]="(this.geometry.clip.cy / this.numHGrids) * 2 + 8"
          [attr.y]="8"
          text-anchor="middle"
        >
          200ft
        </text>
      </g>
    </g>
  </svg>`
})
export class GridComponent {
  // NOTE: every 200 feet
  numHGrids = this.geometry.dims.cxFeet / 200;
  numVGrids = this.geometry.dims.cyFeet / 200;

  constructor(public geometry: Geometry) {}

  border(): string {
    return `M 1,1 
    L ${this.geometry.clip.cx - 1},1
    L ${this.geometry.clip.cx - 1},${this.geometry.clip.cy - 1} 
    L 1,${this.geometry.clip.cy - 1}  
    Z`;
  }

  hlines(): string[] {
    const gap = this.geometry.clip.cy / this.numHGrids;
    const lines = [];
    for (let y = gap; y < this.geometry.clip.cy; y += gap)
      lines.push(`M 0,${y} L ${this.geometry.clip.cx - 1},${y}`);
    return lines;
  }

  translate(): string {
    return `translate(${this.geometry.clip.x}, ${this.geometry.clip.y})`;
  }

  vlines(): string[] {
    const gap = this.geometry.clip.cx / this.numVGrids;
    const lines = [];
    for (let x = gap; x < this.geometry.clip.cx; x += gap)
      lines.push(`M ${x},0 L ${x},${this.geometry.clip.cy - 1}`);
    return lines;
  }
}
