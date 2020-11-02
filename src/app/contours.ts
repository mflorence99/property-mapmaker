import { Geometry } from './geometry';

import { AfterViewInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

const LAYERS = [
  '11', // 20ft contours
  '12', // 50ft contours
  '16' // 50ft labels
];

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-contours',
  template: ''
})
export class ContoursComponent implements AfterViewInit {
  constructor(
    public geometry: Geometry,
    private host: ElementRef,
    private http: HttpClient
  ) {}

  ngAfterViewInit(): void {
    this.http
      .get('/contours', {
        headers: {
          'x-cache-result': 'true'
        },
        params: {
          /* eslint-disable @typescript-eslint/naming-convention */
          BBOX: `${this.geometry.bounds.left},${this.geometry.bounds.bottom},${this.geometry.bounds.right},${this.geometry.bounds.top}`,
          CRS: this.geometry.crs,
          FORMAT: 'image/svg',
          HEIGHT: String(this.geometry.dims.cyNominal),
          LAYERS: LAYERS.join(','),
          REQUEST: 'GetMap',
          SERVICE: 'WMS',
          STYLES: new Array(LAYERS.length).fill('default').join(','),
          VERSION: '1.3.0',
          WIDTH: String(this.geometry.dims.cyNominal)
          /* eslint-enable @typescript-eslint/naming-convention */
        },
        responseType: 'text'
      })
      .pipe(
        map((svg: string) => svg.substring(svg.indexOf('<svg '))),
        map((svg: string) =>
          svg.replace(
            /<svg [^>]+>/g,
            `<svg viewBox="0 0 ${this.geometry.dims.cxNominal} ${this.geometry.dims.cyNominal}">`
          )
        )
      )
      .subscribe((svg: string) => {
        this.host.nativeElement.innerHTML = svg;
      });
  }
}
