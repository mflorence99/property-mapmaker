import { Params } from './params';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-root',
  template: `
    <main *ngIf="params.ready" [ngClass]="params.format">
      <map-patterns></map-patterns>
      <map-clip></map-clip>
      <map-dep></map-dep>
      <map-street></map-street>
      <map-boundary></map-boundary>
      <map-tracks key="mow" op="bezier"></map-tracks>
      <map-tracks key="water" op="bezier"></map-tracks>
      <map-tracks key="ditches" op="bezier"></map-tracks>
      <map-tracks key="buildings" op="linear"></map-tracks>
      <map-tracks key="driveway" op="bezier" [outlined]="true"></map-tracks>
      <map-tracks key="trails" op="bezier" [outlined]="true"></map-tracks>
      <map-culverts></map-culverts>
      <map-bridges></map-bridges>
      <map-labels key="buildingmarks"></map-labels>
      <map-labels key="landmarks"></map-labels>
      <map-labels key="watermarks"></map-labels>
      <map-routes></map-routes>
      <map-contours></map-contours>
    </main>
  `
})
export class RootComponent {
  constructor(public params: Params) {}
}
