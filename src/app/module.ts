import { IconsModule } from './icons';
import { RootComponent } from './root';

import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';

const COMPONENTS = [];

const MODULES = [BrowserModule, FontAwesomeModule, IconsModule];

@NgModule({
  bootstrap: [RootComponent],

  declarations: [...COMPONENTS],

  imports: [...MODULES]
})
export class MapModule {}
