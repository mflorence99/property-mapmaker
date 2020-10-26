import { Params } from './params';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-root',
  template: `
    <main *ngIf="params.ready">
      <map-topo></map-topo>
      <map-forest></map-forest>
      <map-street></map-street>
      <map-boundary></map-boundary>
      <map-track key="mow" op="bezier"></map-track>
      <map-track key="water" op="bezier"></map-track>
      <map-track key="buildings" op="linear"></map-track>
      <map-track key="driveway" op="bezier" [outlined]="true"></map-track>
      <map-track key="trails" op="bezier" [outlined]="true"></map-track>
      <map-contours *ngIf="params.scale > 1"></map-contours>
    </main>
  `
})
export class RootComponent {
  constructor(public params: Params) {}
}
