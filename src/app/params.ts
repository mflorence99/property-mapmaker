import { GpsData } from './gps-data';
import { Point } from './gps-data';
import { Utils } from './utils';

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Params {
  bbox = {
    maxX: Number.MIN_SAFE_INTEGER,
    maxY: Number.MIN_SAFE_INTEGER,
    minX: Number.MAX_SAFE_INTEGER,
    minY: Number.MAX_SAFE_INTEGER
  };
  crs = 'CRS:84';
  ready = false;
  zoom = 17;

  constructor(private gpsData: GpsData, private utils: Utils) {
    const searchParams = utils.parseInitialSearchParams();
    this.zoom = searchParams?.zoom ?? this.zoom;
    // load all the GPS data
    this.gpsData.load().subscribe(() => {
      // compute the boundary box
      this.gpsData.boundary.Boundary.forEach((point: Point) => {
        this.bbox.maxX = Math.max(this.bbox.maxX, point.lon);
        this.bbox.maxY = Math.max(this.bbox.maxY, point.lat);
        this.bbox.minX = Math.min(this.bbox.minX, point.lon);
        this.bbox.minY = Math.min(this.bbox.minY, point.lat);
      });
      // compute tiles
      const top = this.lat2tile(this.bbox.maxY);
      const left = this.lon2tile(this.bbox.minX);
      const bottom = this.lat2tile(this.bbox.minY);
      const right = this.lon2tile(this.bbox.maxX);
      const width = Math.abs(left - right) + 1;
      const height = Math.abs(top - bottom) + 1;
      console.log({ top, left, right, bottom, width, height });
      // recompute bounding box
      console.log(this.bbox);
      console.log({
        maxX: this.tile2lon(right),
        maxY: this.tile2lat(top),
        minX: this.tile2lon(left),
        minY: this.tile2lat(bottom)
      });
      // ready to render!
      this.ready = true;
    });
  }

  // @see https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames

  private lat2tile(lat: number): number {
    return Math.floor(
      ((1 -
        Math.log(
          Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
        ) /
          Math.PI) /
        2) *
        Math.pow(2, this.zoom)
    );
  }

  private lon2tile(lon: number): number {
    return Math.floor(((lon + 180) / 360) * Math.pow(2, this.zoom));
  }

  private tile2lat(x: number): number {
    return (x / Math.pow(2, this.zoom)) * 360 - 180;
  }

  private tile2lon(y: number): number {
    const n = Math.PI - (2 * Math.PI * y) / Math.pow(2, this.zoom);
    return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  }
}
