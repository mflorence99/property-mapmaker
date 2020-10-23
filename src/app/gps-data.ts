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
  islands: Waypoints;

  constructor(private http: HttpClient) {}

  load(): Observable<any> {
    return forkJoin([this.loadImpl('boundary'), this.loadImpl('islands')]);
  }

  private loadImpl(key: string): Observable<Tracks | Waypoints> {
    return this.http
      .get(`/assets/${key}.gpx`, { observe: 'response', responseType: 'text' })
      .pipe(
        mergeMap((response: HttpResponse<string>) => this.parse(response.body)),
        tap((data: Tracks | Waypoints) => (this[key] = data))
      );
  }

  private parse(xml: string): Observable<Tracks | Waypoints> {
    return new Observable<any>((observer) => {
      parseString(xml, (err, obj) => {
        if (err) observer.error(err);
        else {
          observer.next(this.transform(obj.gpx));
          observer.complete();
        }
      });
    });
  }

  private toFeet(m: number): number {
    return m * 3.28084;
  }

  private toTracks(gpx: any): Tracks {
    return gpx.trk.reduce((acc, trk) => {
      acc[trk.name[0]] = trk.trkseg[0].trkpt.map((trkpt) => ({
        // NOTE: GPS collected elevation in meters
        ele: this.toFeet(Number(trkpt.ele[0])),
        lat: Number(trkpt.$.lat),
        lon: Number(trkpt.$.lon)
      }));
      return acc;
    }, {});
  }

  private toWaypoints(gpx: any): Waypoints {
    return gpx.wpt.reduce((acc, wpt) => {
      acc[wpt.name[0]] = {
        // NOTE: GPS collected elevation in meters
        ele: this.toFeet(Number(wpt.ele[0])),
        lat: Number(wpt.$.lat),
        lon: Number(wpt.$.lon)
      };
      return acc;
    }, {});
  }

  private transform(gpx: any): Tracks | Waypoints {
    if (gpx.trk) return this.toTracks(gpx);
    else if (gpx.wpt) return this.toWaypoints(gpx);
    else throw new Error('Invalid GPX data');
  }
}
