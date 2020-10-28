import { GpsData } from './gps-data';
import { Point } from './gps-data';

import { Injectable } from '@angular/core';

const RAD2DEG = 180 / Math.PI;
const PI_4 = Math.PI / 4;

export type XY = [x: number, y: number];

@Injectable({ providedIn: 'root' })
export class Params {
  bbox = {
    maxX: Number.MIN_SAFE_INTEGER,
    maxY: Number.MIN_SAFE_INTEGER,
    minX: Number.MAX_SAFE_INTEGER,
    minY: Number.MAX_SAFE_INTEGER
  };
  bounds = {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  };
  crs = 'CRS:84';
  dims = {
    cxNominal: 0,
    cyNominal: 0,
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

  constructor(private gpsData: GpsData) {
    const searchParams = this.parseInitialSearchParams();
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
      this.dims.cxNominal = this.dims.cxTile * this.dims.numXTiles;
      this.dims.cyNominal = this.dims.cyTile * this.dims.numYTiles;
      // compute origin for lat/lon conversion
      this.bounds.bottom = this.tile2lat(this.tiles.bottom + 1);
      this.bounds.left = this.tile2lon(this.tiles.left);
      this.bounds.right = this.tile2lon(this.tiles.right + 1);
      this.bounds.top = this.tile2lat(this.tiles.top);
      // set CSS variables
      const style = document.body.style;
      style.setProperty('--map-cxNominal', `${this.dims.cxNominal}px`);
      style.setProperty('--map-cyNominal', `${this.dims.cyNominal}px`);
      style.setProperty('--map-cxTile', `${this.dims.cxTile}px`);
      style.setProperty('--map-cyTile', `${this.dims.cyTile}px`);
      style.setProperty('--map-numXTiles', `${this.dims.numXTiles}`);
      style.setProperty('--map-numYTiles', `${this.dims.numYTiles}`);
      style.setProperty('--map-scale', `${this.scale}`);
      // ready to render!
      this.ready = true;
    });
  }

  point2xy(point: Point): XY {
    if (point) {
      const x =
        ((this.lon2x(point.lon) - this.lon2x(this.bounds.left)) *
          this.dims.cxNominal) /
        (this.lon2x(this.bounds.right) - this.lon2x(this.bounds.left));
      const y =
        ((this.lat2y(point.lat) - this.lat2y(this.bounds.top)) *
          this.dims.cxNominal) /
        (this.lat2y(this.bounds.bottom) - this.lat2y(this.bounds.top));
      return [x, y];
    } else return undefined;
  }

  /* eslint-disable @typescript-eslint/member-ordering */

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

  // @see https://wiki.openstreetmap.org/wiki/Mercator#JavaScript_.28or_ActionScript.29

  private y2lat(y: number): number {
    return (Math.atan(Math.exp(y / RAD2DEG)) / PI_4 - 1) * 90;
  }

  private x2lon(x: number): number {
    return x;
  }

  private lat2y(lat: number): number {
    return Math.log(Math.tan((lat / 90 + 1) * PI_4)) * RAD2DEG;
  }

  private lon2x(lon: number): number {
    return lon;
  }

  // other helpers

  private parseInitialSearchParams(): any {
    if (location.search && location.search.length > 1) {
      const raw = location.search.substring(1).split('&');
      return raw.reduce((params, pair) => {
        const [k, v] = pair.split('=');
        // NOTE: a bit cheesy
        if (v === 'false') params[k] = false;
        else if (v === 'true') params[k] = true;
        else if (/^[0-9]*$/.test(v)) params[k] = Number(v);
        else params[k] = v;
        return params;
      }, {});
    } else return {};
  }
}
