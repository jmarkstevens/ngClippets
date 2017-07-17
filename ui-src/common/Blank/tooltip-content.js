import {Component} from '@angular/core';

const title = 'Hello jms-blank';

@Component({
  selector: 'jms-blank',
  template: require('./jms-blank.html'),
  styles: [require('./jms-blank.css')]
})
export class jmsBlank {
  constructor() {
    this.title = title;
  }
}
