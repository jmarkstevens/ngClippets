import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {jmsTooltip} from './TooltipContainer/jms-tooltip';
import {TooltipContent} from './TooltipContent/tooltip-content';

@NgModule({
  imports: [CommonModule],
  declarations: [jmsTooltip, TooltipContent],
  exports: [CommonModule, jmsTooltip, TooltipContent]
})
export class TooltipModule {}
