import { BoundaryComponent } from './boundary';
import { BridgesComponent } from './bridges';
import { CacheInterceptor } from './cache';
import { ClipComponent } from './clip';
import { ContoursComponent } from './contours';
import { CulvertsComponent } from './culverts';
import { DefsComponent } from './defs';
import { DEPComponent } from './dep';
import { ForestComponent } from './forest';
import { GridComponent } from './grid';
import { ImageComponent } from './image';
import { LabelsComponent } from './labels';
import { LegendComponent } from './legend';
import { OverlayComponent } from './overlay';
import { RootComponent } from './root';
import { RoutesComponent } from './routes';
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
  ClipComponent,
  ContoursComponent,
  CulvertsComponent,
  DefsComponent,
  DEPComponent,
  ForestComponent,
  GridComponent,
  ImageComponent,
  LabelsComponent,
  LegendComponent,
  OverlayComponent,
  RootComponent,
  RoutesComponent,
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
