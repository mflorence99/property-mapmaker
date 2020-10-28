import { BoundaryComponent } from './boundary';
import { BridgesComponent } from './bridges';
import { CacheInterceptor } from './cache';
import { ContoursComponent } from './contours';
import { CulvertsComponent } from './culverts';
import { DEPComponent } from './dep';
import { ForestComponent } from './forest';
import { ImageComponent } from './image';
import { LabelsComponent } from './labels';
import { RootComponent } from './root';
import { StreetComponent } from './street';
import { TileComponent } from './tile';
import { TopoComponent } from './topo';
import { TracksComponent } from './tracks';

import { BrowserModule } from '@angular/platform-browser';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

// @see https://stackoverflow.com/questions/55328832

@NgModule({
  imports: [FontAwesomeModule]
})
class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fab, far, fas);
  }
}

const COMPONENTS = [
  BoundaryComponent,
  BridgesComponent,
  ContoursComponent,
  CulvertsComponent,
  DEPComponent,
  ForestComponent,
  ImageComponent,
  LabelsComponent,
  RootComponent,
  StreetComponent,
  TileComponent,
  TopoComponent,
  TracksComponent
];

const MODULES = [
  BrowserModule,
  FontAwesomeModule,
  HttpClientModule,
  IconsModule
];

@NgModule({
  bootstrap: [RootComponent],

  declarations: [...COMPONENTS],

  imports: [...MODULES],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    }
  ]
})
export class MapModule {}
