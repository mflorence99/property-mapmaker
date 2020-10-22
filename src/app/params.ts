import { Utils } from './utils';

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Params {
  bbox = {
    maxX: -72.021666,
    maxY: 43.20916,
    minX: -72.031163,
    minY: 43.201764
  };
  crs = 'CRS:84';
  endpoints = {
    contours:
      'https://carto.nationalmap.gov/arcgis/services/contours/MapServer/WmsServer'
  };
  searchParams = {
    zoom: 18
  };

  /** ctor */
  constructor(utils: Utils) {
    this.searchParams = utils.parseInitialSearchParams();
  }
}
