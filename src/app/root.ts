import { Geometry } from './geometry';

import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';

type UIEvent = {
  layerX: number;
  layerY: number;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'map-root',
  template: `
    <main *ngIf="ready">
      <figure
        [ngClass]="[geometry.format, dragging ? 'dragging' : '']"
        (click)="logLocation($event)"
        (mousedown)="startDrag($event)"
        (mouseout)="stopDrag()"
        (mousemove)="doDrag($event)"
        (mouseup)="stopDrag()"
      >
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
        <map-grid></map-grid>
        <map-overlay></map-overlay>
        <map-legend></map-legend>
      </figure>
    </main>
  `
})
export class RootComponent {
  dragging = false;
  ready = false;

  private basis: MouseEvent;

  constructor(
    private cdf: ChangeDetectorRef,
    private host: ElementRef,
    public geometry: Geometry
  ) {
    this.geometry.ready.subscribe(() => {
      this.ready = true;
      this.cdf.markForCheck();
    });
  }

  doDrag(event: MouseEvent): void {
    if (this.dragging) {
      this.host.nativeElement.scrollBy(
        -(event.clientX - this.basis.clientX),
        -(event.clientY - this.basis.clientY)
      );
      this.basis = event;
    }
  }

  // NOTE: we know layerX, layerY is non-standard, but
  // it works for us and that's good enough for this non-critical API
  logLocation({ layerX, layerY }: UIEvent): void {
    const x = layerX + this.geometry.clip.x;
    const y = layerY + this.geometry.clip.y;
    console.log(this.geometry.xy2point([x, y]));
  }

  startDrag(event: MouseEvent): void {
    this.basis = event;
    this.dragging = true;
  }

  stopDrag(): void {
    this.dragging = false;
  }
}
