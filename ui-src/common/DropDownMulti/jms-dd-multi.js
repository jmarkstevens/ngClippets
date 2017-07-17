import {Component, EventEmitter, Input, Output} from '@angular/core';

const title = 'Hello jms-dd-multi';

@Component({
  selector: 'jms-dd-multi',
  template: require('./jms-dd-multi.html'),
  styles: [require('./jms-dd-multi.css')],
  host: {'(blur)': 'onOpenClose()'}
})
export class jmsDropDownMulti implements AfterViewInit {
  @Input() options = [];
  @Output() onChanged = new EventEmitter();
  isOpen = false;
  selectableOptions = [];
  selectedOptions = [];

  ngAfterViewInit() {
    this.options.forEach((item, index) => {
      item.order = index;
      this.selectableOptions.push(item);
    });
  }
  onRemove = index => {
    const removedOption = this.selectedOptions.splice(index, 1);
    this.selectableOptions.push(removedOption[0]);
    this.selectableOptions.sort((a, b) => a.order - b.order);
    this.onChange(this.selectedOptions);
  };
  onSelect = index => {
    const selectedOption = this.selectableOptions.splice(index, 1);
    this.selectedOptions.push(selectedOption[0]);
    this.selectedOptions.sort((a, b) => a.order - b.order);
    this.onChange(this.selectedOptions);
  };
  onOpenClose = () => {
    this.isOpen = !this.isOpen;
  };
  onChange = selected => {
    this.onChanged.emit(selected);
  };
}
