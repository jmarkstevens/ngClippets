import {Component, Input} from '@angular/core';

@Component({
  selector: 'jms-list',
  template: require('./jms-list.html'),
  styles: [require('./jms-list.css')]
})
export class jmsList {
  @Input() inData = {};
}
