import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'jms-dd-select',
  template: require('./jms-dd-select.html'),
  styles: [require('./jms-dd-select.css')]
})
export class jmsDropDownSelect {
  @Input() options = {};
  @Output() onSelected = new EventEmitter();
  isOpen = false;
  selectedOption = {label: 'choose one'};

  onSelect = option => {
    this.onSelected.emit(option);
    this.selectedOption = option;
    this.isOpen = !this.isOpen;
  };
  handleMouseDown = () => {
    this.isOpen = !this.isOpen;
  };
}
