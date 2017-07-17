import {Component, Input} from '@angular/core';

@Component({
  selector: 'tooltip-content',
  template: require('./tooltip-content.html'),
  styles: [require('./tooltip-content.css')]
})
export class TooltipContent implements AfterViewChecked {
  @Input()inData = '';
  @Input()xPos = '';
  @Input()adjust = {};
  
  constructor() {
    let _this = this;
    window.setTimeout(() => _this.setLeftTop(_this), 500);
  }
  setLeftTop = (_this) => {
    let height = document.getElementById("contentOuter").offsetHeight;
    let windowHeight = window.innerHeight;
    let xPos = _this.xPos;
    let position = _this.inData.place;
    let posT = ((xPos.top - this.adjust.top) > (height + xPos.height + 5));
    let posR = (((xPos.top - this.adjust.top) > (height * .5)) && ((windowHeight - xPos.top) > (height * .5)));
    let posB = ((windowHeight - xPos.top) > (xPos.height + 5));
    if (position === 'top' && !posT) {
      if (posR) position = 'right';
      else position = 'bottom';
    } else if (position === 'right' && !posR) {
      if (posT) position = 'top';
      else position = 'bottom';
    } else if (position === 'bottom' && !posB) {
      if (posR) position = 'right';
      else position = 'top';
    }
    _this.position = position;
    switch (position) {
      case 'top': _this.xTop = xPos.top - (height + xPos.height + 2); break;
      case 'right': _this.xTop = xPos.top - (height * .5); break;
      case 'bottom': _this.xTop = xPos.top + 2; break;
    }
    _this.xLeft = xPos.left + xPos.width + 3;
    _this.contentOuterStyle = {'background-color': '#030', color: '#eee'};
  }
}
