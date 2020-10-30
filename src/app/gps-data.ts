import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { parseString } from 'xml2js';
import { tap } from 'rxjs/operators';

export interface Point {
  ele: number;
  lat: number;
  lon: number;
}

export interface Tracks {
  [name: string]: Point[];
}

export interface Waypoints {
  [name: string]: Point;
}

@Injectable({ providedIn: 'root' })
export class GpsData {
  boundary: Tracks;
  bridges: Waypoints;
  buildingmarks: Waypoints;
  buildings: Tracks;
  culverts: Waypoints;
  ditches: Tracks;
  driveway: Tracks;
  islands: Waypoints;
  landmarks: Waypoints;
  mow: Tracks;
  trails: Tracks;
  water: Tracks;
  watermarks: Waypoints;

  constructor(private http: HttpClient) {}

  load(): Observable<any> {
    return forkJoin([
      this.loadImpl('boundary'),
      this.loadImpl('bridges'),
      this.loadImpl('buildingmarks'),
      this.loadImpl('buildings'),
      this.loadImpl('culverts'),
      this.loadImpl('ditches'),
      this.loadImpl('driveway'),
      this.loadImpl('landmarks'),
      this.loadImpl('mow'),
      this.loadImpl('trails'),
      this.loadImpl('water'),
      this.loadImpl('watermarks')
    ]);
  }

  private loadImpl(key: string): Observable<Tracks | Waypoints> {
    return this.http
      .get(`/assets/data/${key}.gpx`, {
        observe: 'response',
        responseType: 'text'
      })
      .pipe(
        mergeMap((response: HttpResponse<string>) => this.parse(response.body)),
        tap((data: Tracks | Waypoints) => (this[key] = data))
      );
  }

  private meters2feet(meters: number): number {
    return meters * 3.28084;
  }

  private obj2point(obj: any): Point {
    // NOTE: GPS collected elevation in meters
    const ele = this.meters2feet(Number(obj.ele?.[0]));
    const lat = Number(obj.$.lat);
    const lon = Number(obj.$.lon);
    return { ele, lat, lon };
  }

  private parse(xml: string): Observable<Tracks | Waypoints> {
    return new Observable<Tracks | Waypoints>((observer) => {
      parseString(xml, (err, obj) => {
        if (err) observer.error(err);
        else {
          observer.next(this.transform(obj.gpx));
          observer.complete();
        }
      });
    });
  }

  private toTracks(gpx: any): Tracks {
    return gpx.trk.reduce((acc, trk) => {
      acc[trk.name[0]] = trk.trkseg[0].trkpt.map((trkpt) =>
        this.obj2point(trkpt)
      );
      return acc;
    }, {});
  }

  private toWaypoints(gpx: any): Waypoints {
    return gpx.wpt.reduce((acc, wpt) => {
      acc[wpt.name[0]] = this.obj2point(wpt);
      return acc;
    }, {});
  }

  private transform(gpx: any): Tracks | Waypoints {
    if (gpx.trk) return this.toTracks(gpx);
    else if (gpx.wpt) return this.toWaypoints(gpx);
    else throw new Error('Invalid GPX data');
  }
}
