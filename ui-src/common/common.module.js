import {NgModule} from '@angular/core';

import {COMMON_DECLARATIONS} from './common.declarations';

@NgModule({
  imports: [TooltipModule],
  declarations: [COMMON_DECLARATIONS],
  providers: [],
  exports: [COMMON_DECLARATIONS]
})
export class CommonModule {}
