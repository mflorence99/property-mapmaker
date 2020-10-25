import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Utils {
  comparePixel(p: number[], q: number[], threshold: number): boolean {
    return (
      Math.abs(p[0] - q[0]) < threshold &&
      Math.abs(p[1] - q[1]) < threshold &&
      Math.abs(p[2] - q[2]) < threshold
    );
  }

  parseInitialSearchParams(): any {
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
