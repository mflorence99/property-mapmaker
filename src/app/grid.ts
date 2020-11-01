import { Params } from './params';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-grid',
  template: `<svg
    attr.viewPort="0 0 {{ params.dims.cxNominal }} {{ params.dims.cyNominal }}"
  >
    <g>
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
    </g>
  </svg>`
})
export class GridComponent {
  constructor(public params: Params) {}

  border(): string {
    return `M 1,1 
    L ${this.params.clip.cx - 1},1
    L ${this.params.clip.cx - 1},${this.params.clip.cy - 1} 
    L 1,${this.params.clip.cy - 1}  
    Z`;
  }

  hlines(): string[] {
    const gap = this.params.clip.cy / 15;
    const lines = [];
    for (let y = gap; y < this.params.clip.cy; y += gap)
      lines.push(`M 0,${y} L ${this.params.clip.cx - 1},${y}`);
    return lines;
  }

  translate(): string {
    return `translate(${this.params.clip.x}, ${this.params.clip.y})`;
  }

  vlines(): string[] {
    const gap = this.params.clip.cx / 15;
    const lines = [];
    for (let x = gap; x < this.params.clip.cx; x += gap)
      lines.push(`M ${x},0 L ${x},${this.params.clip.cy - 1}`);
    return lines;
  }
}
