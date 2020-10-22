import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Utils {
  /** Run function on next tick */
  nextTick(fn: Function): void {
    setTimeout(fn, 0);
  }

  /** Extract search params from launch URL */
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
