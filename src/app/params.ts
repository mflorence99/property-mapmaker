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
  dims = {
    cxTile: 256,
    cyTile: 256,
    numXTiles: 0,
    numYTiles: 0
  };
  ready = false;
  scale = 1;
  tiles = {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  };
  zoom = 17;

  constructor(private gpsData: GpsData, private utils: Utils) {
    const searchParams = utils.parseInitialSearchParams();
    this.scale = searchParams?.scale ?? this.scale;
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
      this.tiles.bottom = this.lat2tile(this.bbox.minY);
      this.tiles.left = this.lon2tile(this.bbox.minX);
      this.tiles.right = this.lon2tile(this.bbox.maxX);
      this.tiles.top = this.lat2tile(this.bbox.maxY);
      // compute dimension
      this.dims.numYTiles = Math.abs(this.tiles.left - this.tiles.right) + 1;
      this.dims.numXTiles = Math.abs(this.tiles.top - this.tiles.bottom) + 1;
      // recompute bounding box
      this.bbox.maxX = this.tile2lon(this.tiles.right);
      this.bbox.maxY = this.tile2lat(this.tiles.top);
      this.bbox.minX = this.tile2lon(this.tiles.left);
      this.bbox.minY = this.tile2lat(this.tiles.bottom);
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

  private tile2lat(y: number): number {
    const n = Math.PI - (2 * Math.PI * y) / Math.pow(2, this.zoom);
    return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  }

  private tile2lon(x: number): number {
    return (x / Math.pow(2, this.zoom)) * 360 - 180;
  }
}
