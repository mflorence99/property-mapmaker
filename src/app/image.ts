import { Params } from './params';

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
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-image',
  template: '<canvas #canvas></canvas><img #image>'
})
export class ImageComponent implements AfterViewInit, OnInit {
  @ViewChild('canvas', { static: true }) canvas;
  @ViewChild('image', { static: true }) image;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Input() alpha: number;
  @Input() query: any;
  @Input() ramp: Ramp[];
  @Input() src: string;
  @Input() steps: number;

  private clut: CLUT;

  constructor(private http: HttpClient, public params: Params) {}

  ngAfterViewInit(): void {
    this.http
      .get(this.src, { params: this.query, responseType: 'blob' })
      .pipe(mergeMap((blob: Blob) => this.createImageBitmap(blob)))
      .subscribe((bitmap: ImageBitmap) => {
        // draw the bitmap on the canvas
        const canvas = this.canvas.nativeElement;
        canvas.height = this.params.dims.cyNominal;
        canvas.width = this.params.dims.cxNominal;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(bitmap, 0, 0);
        // munge the image for transparency
        const imageData = ctx.getImageData(
          0,
          0,
          this.params.dims.cxNominal,
          this.params.dims.cyNominal
        );
        const pixels = imageData.data;
        let max = Number.MIN_SAFE_INTEGER;
        let min = Number.MAX_SAFE_INTEGER;
        for (let ix = 0; ix < pixels.length; ix += 4) {
          max = Math.max(max, pixels[ix]);
          min = Math.min(min, pixels[ix]);
          const rgba = this.clut[this.quantize(pixels[ix])];
          pixels[ix] = rgba[0];
          pixels[ix + 1] = rgba[1];
          pixels[ix + 2] = rgba[2];
          pixels[ix + 3] = rgba[3];
        }
        console.log(min, max);
        ctx.putImageData(imageData, 0, 0);
        // draw the munged image
        const image = this.image.nativeElement;
        image.src = canvas.toDataURL();
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
    return Math.trunc(value / (256 / this.steps));
  }
}
