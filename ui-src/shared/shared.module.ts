import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RightPadPipe} from './pipes/rpad';

@NgModule({
  imports: [CommonModule],
  declarations: [RightPadPipe],
  providers: [],
  exports: [CommonModule, RightPadPipe]
})
export class SharedModule {}
