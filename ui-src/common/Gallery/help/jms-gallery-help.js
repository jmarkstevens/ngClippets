import {Component} from '@angular/core';

const title = 'Hello jms-gallery-help';

@Component({
  selector: 'jms-gallery-help',
  template: require('./jms-gallery-help.html'),
  styles: [require('./jms-gallery-help.css')]
})
export class jmsGalleryHelp {
  constructor() {
    this.title = title;
  }
}
