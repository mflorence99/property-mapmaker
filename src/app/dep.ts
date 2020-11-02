import { Geometry } from './geometry';
import { Ramp } from './image';

import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-dep',
  template: `
    <map-image
      [alpha]="alpha"
      [query]="query"
      [ramp]="ramp"
      [range]="[111, 217]"
      [src]="src"
    >
    </map-image>
  `
})
export class DEPComponent {
  alpha = 127;
  query = {
    bbox: `${this.geometry.bounds.left},${this.geometry.bounds.bottom},${this.geometry.bounds.right},${this.geometry.bounds.top}`,
    bboxSR: '4326',
    f: 'image',
    imageSR: '3857',
    renderingRule: JSON.stringify({ rasterFunction: 'Hillshade Gray' }),
    size: `${this.geometry.dims.cxNominal},${this.geometry.dims.cyNominal}`
  };
  ramp: Ramp[] = [
    {
      value: 0,
      color: '#AED581'
    },
    {
      value: 1,
      color: '#ADD480'
    },
    {
      value: 2,
      color: '#ADD480'
    },
    {
      value: 3,
      color: '#ACD480'
    },
    {
      value: 4,
      color: '#ACD37F'
    },
    {
      value: 5,
      color: '#ACD37F'
    },
    {
      value: 6,
      color: '#ABD37F'
    },
    {
      value: 7,
      color: '#ABD27E'
    },
    {
      value: 8,
      color: '#ABD27E'
    },
    {
      value: 9,
      color: '#AAD27E'
    },
    {
      value: 10,
      color: '#AAD27D'
    },
    {
      value: 11,
      color: '#AAD17D'
    },
    {
      value: 12,
      color: '#A9D17D'
    },
    {
      value: 13,
      color: '#A9D17C'
    },
    {
      value: 14,
      color: '#A9D07C'
    },
    {
      value: 15,
      color: '#A8D07C'
    },
    {
      value: 16,
      color: '#A8D07B'
    },
    {
      value: 17,
      color: '#A8D07B'
    },
    {
      value: 18,
      color: '#A7CF7B'
    },
    {
      value: 19,
      color: '#A7CF7A'
    },
    {
      value: 20,
      color: '#A7CF7A'
    },
    {
      value: 21,
      color: '#A6CE7A'
    },
    {
      value: 22,
      color: '#A6CE79'
    },
    {
      value: 23,
      color: '#A5CE79'
    },
    {
      value: 24,
      color: '#A5CE79'
    },
    {
      value: 25,
      color: '#A5CD78'
    },
    {
      value: 26,
      color: '#A4CD78'
    },
    {
      value: 27,
      color: '#A4CD78'
    },
    {
      value: 28,
      color: '#A4CC77'
    },
    {
      value: 29,
      color: '#A3CC77'
    },
    {
      value: 30,
      color: '#A3CC77'
    },
    {
      value: 31,
      color: '#A3CC77'
    },
    {
      value: 32,
      color: '#A2CB76'
    },
    {
      value: 33,
      color: '#A2CB76'
    },
    {
      value: 34,
      color: '#A2CB76'
    },
    {
      value: 35,
      color: '#A1CA75'
    },
    {
      value: 36,
      color: '#A1CA75'
    },
    {
      value: 37,
      color: '#A1CA75'
    },
    {
      value: 38,
      color: '#A0C974'
    },
    {
      value: 39,
      color: '#A0C974'
    },
    {
      value: 40,
      color: '#A0C974'
    },
    {
      value: 41,
      color: '#9FC973'
    },
    {
      value: 42,
      color: '#9FC873'
    },
    {
      value: 43,
      color: '#9EC873'
    },
    {
      value: 44,
      color: '#9EC872'
    },
    {
      value: 45,
      color: '#9EC772'
    },
    {
      value: 46,
      color: '#9DC772'
    },
    {
      value: 47,
      color: '#9DC771'
    },
    {
      value: 48,
      color: '#9DC771'
    },
    {
      value: 49,
      color: '#9CC671'
    },
    {
      value: 50,
      color: '#9CC670'
    },
    {
      value: 51,
      color: '#9CC670'
    },
    {
      value: 52,
      color: '#9BC570'
    },
    {
      value: 53,
      color: '#9BC56F'
    },
    {
      value: 54,
      color: '#9BC56F'
    },
    {
      value: 55,
      color: '#9AC56F'
    },
    {
      value: 56,
      color: '#9AC46E'
    },
    {
      value: 57,
      color: '#9AC46E'
    },
    {
      value: 58,
      color: '#99C46E'
    },
    {
      value: 59,
      color: '#99C36E'
    },
    {
      value: 60,
      color: '#99C36D'
    },
    {
      value: 61,
      color: '#98C36D'
    },
    {
      value: 62,
      color: '#98C36D'
    },
    {
      value: 63,
      color: '#98C26C'
    },
    {
      value: 64,
      color: '#97C26C'
    },
    {
      value: 65,
      color: '#97C26C'
    },
    {
      value: 66,
      color: '#96C16B'
    },
    {
      value: 67,
      color: '#96C16B'
    },
    {
      value: 68,
      color: '#96C16B'
    },
    {
      value: 69,
      color: '#95C06A'
    },
    {
      value: 70,
      color: '#95C06A'
    },
    {
      value: 71,
      color: '#95C06A'
    },
    {
      value: 72,
      color: '#94C069'
    },
    {
      value: 73,
      color: '#94BF69'
    },
    {
      value: 74,
      color: '#94BF69'
    },
    {
      value: 75,
      color: '#93BF68'
    },
    {
      value: 76,
      color: '#93BE68'
    },
    {
      value: 77,
      color: '#93BE68'
    },
    {
      value: 78,
      color: '#92BE67'
    },
    {
      value: 79,
      color: '#92BE67'
    },
    {
      value: 80,
      color: '#92BD67'
    },
    {
      value: 81,
      color: '#91BD66'
    },
    {
      value: 82,
      color: '#91BD66'
    },
    {
      value: 83,
      color: '#91BC66'
    },
    {
      value: 84,
      color: '#90BC65'
    },
    {
      value: 85,
      color: '#90BC65'
    },
    {
      value: 86,
      color: '#8FBC65'
    },
    {
      value: 87,
      color: '#8FBB65'
    },
    {
      value: 88,
      color: '#8FBB64'
    },
    {
      value: 89,
      color: '#8EBB64'
    },
    {
      value: 90,
      color: '#8EBA64'
    },
    {
      value: 91,
      color: '#8EBA63'
    },
    {
      value: 92,
      color: '#8DBA63'
    },
    {
      value: 93,
      color: '#8DBA63'
    },
    {
      value: 94,
      color: '#8DB962'
    },
    {
      value: 95,
      color: '#8CB962'
    },
    {
      value: 96,
      color: '#8CB962'
    },
    {
      value: 97,
      color: '#8CB861'
    },
    {
      value: 98,
      color: '#8BB861'
    },
    {
      value: 99,
      color: '#8BB861'
    },
    {
      value: 100,
      color: '#8BB760'
    },
    {
      value: 101,
      color: '#8AB760'
    },
    {
      value: 102,
      color: '#8AB760'
    },
    {
      value: 103,
      color: '#8AB75F'
    },
    {
      value: 104,
      color: '#89B65F'
    },
    {
      value: 105,
      color: '#89B65F'
    },
    {
      value: 106,
      color: '#89B65E'
    },
    {
      value: 107,
      color: '#88B55E'
    },
    {
      value: 108,
      color: '#88B55E'
    },
    {
      value: 109,
      color: '#87B55D'
    },
    {
      value: 110,
      color: '#87B55D'
    },
    {
      value: 111,
      color: '#87B45D'
    },
    {
      value: 112,
      color: '#86B45C'
    },
    {
      value: 113,
      color: '#86B45C'
    },
    {
      value: 114,
      color: '#86B35C'
    },
    {
      value: 115,
      color: '#85B35C'
    },
    {
      value: 116,
      color: '#85B35B'
    },
    {
      value: 117,
      color: '#85B35B'
    },
    {
      value: 118,
      color: '#84B25B'
    },
    {
      value: 119,
      color: '#84B25A'
    },
    {
      value: 120,
      color: '#84B25A'
    },
    {
      value: 121,
      color: '#83B15A'
    },
    {
      value: 122,
      color: '#83B159'
    },
    {
      value: 123,
      color: '#83B159'
    },
    {
      value: 124,
      color: '#82B159'
    },
    {
      value: 125,
      color: '#82B058'
    },
    {
      value: 126,
      color: '#82B058'
    },
    {
      value: 127,
      color: '#81B058'
    },
    {
      value: 128,
      color: '#81AF57'
    },
    {
      value: 129,
      color: '#80AF57'
    },
    {
      value: 130,
      color: '#80AF57'
    },
    {
      value: 131,
      color: '#80AE56'
    },
    {
      value: 132,
      color: '#7FAE56'
    },
    {
      value: 133,
      color: '#7FAE56'
    },
    {
      value: 134,
      color: '#7FAE55'
    },
    {
      value: 135,
      color: '#7EAD55'
    },
    {
      value: 136,
      color: '#7EAD55'
    },
    {
      value: 137,
      color: '#7EAD54'
    },
    {
      value: 138,
      color: '#7DAC54'
    },
    {
      value: 139,
      color: '#7DAC54'
    },
    {
      value: 140,
      color: '#7DAC53'
    },
    {
      value: 141,
      color: '#7CAC53'
    },
    {
      value: 142,
      color: '#7CAB53'
    },
    {
      value: 143,
      color: '#7CAB53'
    },
    {
      value: 144,
      color: '#7BAB52'
    },
    {
      value: 145,
      color: '#7BAA52'
    },
    {
      value: 146,
      color: '#7BAA52'
    },
    {
      value: 147,
      color: '#7AAA51'
    },
    {
      value: 148,
      color: '#7AAA51'
    },
    {
      value: 149,
      color: '#79A951'
    },
    {
      value: 150,
      color: '#79A950'
    },
    {
      value: 151,
      color: '#79A950'
    },
    {
      value: 152,
      color: '#78A850'
    },
    {
      value: 153,
      color: '#78A84F'
    },
    {
      value: 154,
      color: '#78A84F'
    },
    {
      value: 155,
      color: '#77A84F'
    },
    {
      value: 156,
      color: '#77A74E'
    },
    {
      value: 157,
      color: '#77A74E'
    },
    {
      value: 158,
      color: '#76A74E'
    },
    {
      value: 159,
      color: '#76A64D'
    },
    {
      value: 160,
      color: '#76A64D'
    },
    {
      value: 161,
      color: '#75A64D'
    },
    {
      value: 162,
      color: '#75A54C'
    },
    {
      value: 163,
      color: '#75A54C'
    },
    {
      value: 164,
      color: '#74A54C'
    },
    {
      value: 165,
      color: '#74A54B'
    },
    {
      value: 166,
      color: '#74A44B'
    },
    {
      value: 167,
      color: '#73A44B'
    },
    {
      value: 168,
      color: '#73A44A'
    },
    {
      value: 169,
      color: '#73A34A'
    },
    {
      value: 170,
      color: '#72A34A'
    },
    {
      value: 171,
      color: '#72A34A'
    },
    {
      value: 172,
      color: '#71A349'
    },
    {
      value: 173,
      color: '#71A249'
    },
    {
      value: 174,
      color: '#71A249'
    },
    {
      value: 175,
      color: '#70A248'
    },
    {
      value: 176,
      color: '#70A148'
    },
    {
      value: 177,
      color: '#70A148'
    },
    {
      value: 178,
      color: '#6FA147'
    },
    {
      value: 179,
      color: '#6FA147'
    },
    {
      value: 180,
      color: '#6FA047'
    },
    {
      value: 181,
      color: '#6EA046'
    },
    {
      value: 182,
      color: '#6EA046'
    },
    {
      value: 183,
      color: '#6E9F46'
    },
    {
      value: 184,
      color: '#6D9F45'
    },
    {
      value: 185,
      color: '#6D9F45'
    },
    {
      value: 186,
      color: '#6D9F45'
    },
    {
      value: 187,
      color: '#6C9E44'
    },
    {
      value: 188,
      color: '#6C9E44'
    },
    {
      value: 189,
      color: '#6C9E44'
    },
    {
      value: 190,
      color: '#6B9D43'
    },
    {
      value: 191,
      color: '#6B9D43'
    },
    {
      value: 192,
      color: '#6A9D43'
    },
    {
      value: 193,
      color: '#6A9C42'
    },
    {
      value: 194,
      color: '#6A9C42'
    },
    {
      value: 195,
      color: '#699C42'
    },
    {
      value: 196,
      color: '#699C41'
    },
    {
      value: 197,
      color: '#699B41'
    },
    {
      value: 198,
      color: '#689B41'
    },
    {
      value: 199,
      color: '#689B41'
    },
    {
      value: 200,
      color: '#689A40'
    },
    {
      value: 201,
      color: '#679A40'
    },
    {
      value: 202,
      color: '#679A40'
    },
    {
      value: 203,
      color: '#679A3F'
    },
    {
      value: 204,
      color: '#66993F'
    },
    {
      value: 205,
      color: '#66993F'
    },
    {
      value: 206,
      color: '#66993E'
    },
    {
      value: 207,
      color: '#65983E'
    },
    {
      value: 208,
      color: '#65983E'
    },
    {
      value: 209,
      color: '#65983D'
    },
    {
      value: 210,
      color: '#64983D'
    },
    {
      value: 211,
      color: '#64973D'
    },
    {
      value: 212,
      color: '#64973C'
    },
    {
      value: 213,
      color: '#63973C'
    },
    {
      value: 214,
      color: '#63963C'
    },
    {
      value: 215,
      color: '#62963B'
    },
    {
      value: 216,
      color: '#62963B'
    },
    {
      value: 217,
      color: '#62963B'
    },
    {
      value: 218,
      color: '#61953A'
    },
    {
      value: 219,
      color: '#61953A'
    },
    {
      value: 220,
      color: '#61953A'
    },
    {
      value: 221,
      color: '#609439'
    },
    {
      value: 222,
      color: '#609439'
    },
    {
      value: 223,
      color: '#609439'
    },
    {
      value: 224,
      color: '#5F9338'
    },
    {
      value: 225,
      color: '#5F9338'
    },
    {
      value: 226,
      color: '#5F9338'
    },
    {
      value: 227,
      color: '#5E9338'
    },
    {
      value: 228,
      color: '#5E9237'
    },
    {
      value: 229,
      color: '#5E9237'
    },
    {
      value: 230,
      color: '#5D9237'
    },
    {
      value: 231,
      color: '#5D9136'
    },
    {
      value: 232,
      color: '#5D9136'
    },
    {
      value: 233,
      color: '#5C9136'
    },
    {
      value: 234,
      color: '#5C9135'
    },
    {
      value: 235,
      color: '#5B9035'
    },
    {
      value: 236,
      color: '#5B9035'
    },
    {
      value: 237,
      color: '#5B9034'
    },
    {
      value: 238,
      color: '#5A8F34'
    },
    {
      value: 239,
      color: '#5A8F34'
    },
    {
      value: 240,
      color: '#5A8F33'
    },
    {
      value: 241,
      color: '#598F33'
    },
    {
      value: 242,
      color: '#598E33'
    },
    {
      value: 243,
      color: '#598E32'
    },
    {
      value: 244,
      color: '#588E32'
    },
    {
      value: 245,
      color: '#588D32'
    },
    {
      value: 246,
      color: '#588D31'
    },
    {
      value: 247,
      color: '#578D31'
    },
    {
      value: 248,
      color: '#578D31'
    },
    {
      value: 249,
      color: '#578C30'
    },
    {
      value: 250,
      color: '#568C30'
    },
    {
      value: 251,
      color: '#568C30'
    },
    {
      value: 252,
      color: '#568B2F'
    },
    {
      value: 253,
      color: '#558B2F'
    },
    {
      value: 254,
      color: '#558B2F'
    },
    {
      value: 255,
      color: '#558B2F'
    }
  ];
  src = '/dep';

  constructor(public geometry: Geometry) {}
}
