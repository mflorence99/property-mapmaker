import { Geometry } from './geometry';

import { AfterViewInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { mergeMap } from 'rxjs/operators';

// @see rampgenerator.com
export type Ramp = {
  color: string;
  value: number;
};

type RGBA = [r: number, g: number, b: number, a: number];

type CLUT = Record<number, RGBA>;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'map-image',
  template: `<canvas #canvas></canvas>
    <img class="outside" #outside />
    <img class="inside" #inside />`
})
export class ImageComponent implements AfterViewInit, OnInit {
  @ViewChild('canvas', { static: true }) canvas;
  @ViewChild('inside', { static: true }) inside;
  @ViewChild('outside', { static: true }) outside;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Input() alpha: number;
  @Input() query: any;
  @Input() ramp: Ramp[];
  @Input() range: number[];
  @Input() src: string;

  private clut: CLUT;

  constructor(public geometry: Geometry, public http: HttpClient) {}

  ngAfterViewInit(): void {
    this.http
      .get(this.src, { params: this.query, responseType: 'blob' })
      .pipe(mergeMap((blob: Blob) => this.createImageBitmap(blob)))
      .subscribe((bitmap: ImageBitmap) => {
        // draw the bitmap on the canvas
        const canvas = this.canvas.nativeElement;
        canvas.height = this.geometry.dims.cyNominal;
        canvas.width = this.geometry.dims.cxNominal;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(bitmap, 0, 0);
        // grab the image pixels
        const imageData = ctx.getImageData(
          0,
          0,
          this.geometry.dims.cxNominal,
          this.geometry.dims.cyNominal
        );
        const pixels = imageData.data;
        // const histogram = {};
        // munge the pixels for color change
        for (let ix = 0; ix < pixels.length; ix += 4) {
          const value = this.quantize(pixels[ix]);
          // if (!histogram[value]) histogram[value] = 1;
          // else histogram[value] += 1;
          const rgba = this.clut[value];
          if (rgba) {
            pixels[ix] = rgba[0];
            pixels[ix + 1] = rgba[1];
            pixels[ix + 2] = rgba[2];
            pixels[ix + 3] = rgba[3];
          } else console.log(value);
        }
        // console.table(histogram);
        ctx.putImageData(imageData, 0, 0);
        // draw the munged image twice
        // ... outside is filtered sepia
        const outside = this.outside.nativeElement;
        outside.src = canvas.toDataURL();
        // ... inside is clipped to boundary
        const inside = this.inside.nativeElement;
        inside.src = canvas.toDataURL();
      });
  }

  ngOnInit(): void {
    // convert color ramp to CLUT
    this.clut = this.ramp.reduce((acc: CLUT, ramp: Ramp) => {
      acc[ramp.value] = this.hexToRGBA(ramp.color);
      return acc;
    }, {});
  }

  private createImageBitmap(blob: Blob): Observable<ImageBitmap> {
    return new Observable<ImageBitmap>((observer) => {
      createImageBitmap(blob)
        .then((bitmap) => {
          observer.next(bitmap);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
  }

  // @see https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  private hexToRGBA(hex: string): RGBA {
    const parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [
      parseInt(parsed[1], 16),
      parseInt(parsed[2], 16),
      parseInt(parsed[3], 16),
      this.alpha
    ];
  }

  private quantize(value: number): number {
    value =
      Math.max(this.range[0], Math.min(this.range[1], value)) - this.range[0];
    value *= 256 / (this.range[1] - this.range[0]);
    return Math.min(
      this.ramp.length - 1,
      Math.trunc(value / (256 / this.ramp.length))
    );
  }
}
