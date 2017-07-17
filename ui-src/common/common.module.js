import {NgModule} from '@angular/core';
import {TooltipModule} from './Tooltip/tooltip.module';

import {COMMON_DECLARATIONS} from './common.declarations';

@NgModule({
  imports: [TooltipModule],
  declarations: [COMMON_DECLARATIONS],
  providers: [],
  exports: [TooltipModule, COMMON_DECLARATIONS]
})
export class CommonModule {}
