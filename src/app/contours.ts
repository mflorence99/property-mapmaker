import { Params } from './params';

import { AfterViewInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';

const LAYERS = [
  '11', // 20ft contours
  '12', // 50ft contours
  '16' // 50ft labels
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'map-contours',
  template: '<div #contours></div>'
})
export class ContoursComponent implements AfterViewInit {
  @ViewChild('contours') contours: ElementRef;

  constructor(private http: HttpClient, private params: Params) {}

  ngAfterViewInit(): void {
    this.http
      .get(this.params.endpoints.contours, {
        params: {
          /* eslint-disable @typescript-eslint/naming-convention */
          BBOX: `${this.params.bbox.minX},${this.params.bbox.minY},${this.params.bbox.maxX},${this.params.bbox.maxY}`,
          CRS: this.params.crs,
          FORMAT: 'image/svg',
          HEIGHT: '1024',
          LAYERS: LAYERS.join(','),
          REQUEST: 'GetMap',
          SERVICE: 'WMS',
          STYLES: new Array(LAYERS.length).fill('default').join(','),
          TILED: 'true',
          VERSION: '1.3.0',
          WIDTH: '1024'
          /* eslint-enable @typescript-eslint/naming-convention */
        },
        responseType: 'text'
      })
      .subscribe((svg) => {
        this.contours.nativeElement.innerHTML = svg;
      });
  }
}
