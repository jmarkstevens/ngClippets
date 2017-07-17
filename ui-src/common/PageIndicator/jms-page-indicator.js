import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'jms-page-indicator',
  template: require('./jms-page-indicator.html'),
  styles: [require('./jms-page-indicator.css')]
})
export class jmsPageIndicator implements AfterViewInit {
  @Input() inData = {};
  @Output()onValueChanged = new EventEmitter();
  dotArray = [];

  ngAfterViewInit() {
    let count = this.inData.count - 1;
    this.dotArray[count] = count;
  }
  
  handleDotClick = i => {
    this.onValueChanged.emit(i);
  }
  getDotBackColor = i => {
    return i === this.inData.currentIndex ? '#b4dbc0' : '#fff';
  }
}
