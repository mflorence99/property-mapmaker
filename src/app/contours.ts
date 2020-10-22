import { Params } from './params';

import { AfterViewInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';

import { map } from 'rxjs/operators';

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
        /* eslint-disable @typescript-eslint/naming-convention */
        params: {
          BBOX: `${this.params.bbox.minX},${this.params.bbox.minY},${this.params.bbox.maxX},${this.params.bbox.maxY}`,
          CRS: this.params.crs,
          FORMAT: 'image/svg',
          HEIGHT: '1024',
          LAYERS:
            '2,3,4,6,7,8,10,11,12,14,15,16,18,19,20,21,23,24,25,26,28,29,30,31,32,33,34,35',
          REQUEST: 'GetMap',
          SERVICE: 'WMS',
          STYLES:
            'default,default,default,default,default,default,default,default,default,default,default,default,default,default,default,default,default,default,default,default,default,default,default,default,default,default,default,default',
          TILED: 'true',
          VERSION: '1.3.0',
          WIDTH: '1024'
        },
        responseType: 'text'
        /* eslint-enable @typescript-eslint/naming-convention */
      })
      .pipe(map((svg) => svg.substring(svg.indexOf('<svg '))))
      .subscribe((svg) => {
        this.contours.nativeElement.innerHTML = svg;
      });
  }
}
