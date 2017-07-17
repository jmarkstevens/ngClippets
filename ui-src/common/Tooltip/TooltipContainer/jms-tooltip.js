import {Component, Input} from '@angular/core';

@Component({
  selector: 'jms-tooltip',
  template: require('./jms-tooltip.html'),
  styles: [require('./jms-tooltip.css')]
})
export class jmsTooltip {
  @Input()inData = '';
  @Input()adjust = {};
  showTip = false;

  onMouseEnter = event => {
    this.showTip = true;
    if (!this.xPos) {
      this.xPos = {
        left: Math.floor(document.getElementById("helpTip").offsetLeft),
        top: Math.floor(event.clientY),
        height: Math.floor(document.getElementById("helpTip").offsetHeight),
        width: Math.floor(document.getElementById("helpTip").offsetWidth)
      };
    }
  }
  onMouseLeave = () => {
    this.showTip = false;
  }
}
