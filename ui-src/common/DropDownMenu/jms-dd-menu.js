import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'jms-dd-menu',
  template: require('./jms-dd-menu.html'),
  styles: [require('./jms-dd-menu.css')]
})
export class jmsDropDownMenu {
  @Input() options = {};
  @Output() onSelected = new EventEmitter();
  isOpen = false;

  onSelect = option => {
    this.onSelected.emit(option);
    this.isOpen = !this.isOpen;
  };
  handleMouseDown = () => {
    this.isOpen = !this.isOpen;
  };
}
