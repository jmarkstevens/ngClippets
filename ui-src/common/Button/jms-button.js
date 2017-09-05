import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'jms-button',
  template: require('./jms-button.html'),
  styles: [require('./jms-button.css')],
})
export default class jmsButton {
  @Input() btn = {};
  @Output() onBtnClicked = new EventEmitter();

  onBtnClick = () => {
    this.onBtnClicked.emit();
  };
}
