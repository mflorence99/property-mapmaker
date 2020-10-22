import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'map-root',
  templateUrl: 'root.html',
  styleUrls: ['root.scss']
})
export class RootComponent {}
