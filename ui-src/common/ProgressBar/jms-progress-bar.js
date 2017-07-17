import {Component, Input} from '@angular/core';

@Component({
  selector: 'jms-progress-bar',
  template: require('./jms-progress-bar.html'),
  styles: [require('./jms-progress-bar.css')]
})
export class jmsProgressBar implements OnChanges {
  @Input() inData = {};
  @Input() index = 0;
  
  ngOnChanges(props) {
    if (props['index'] && (props['index'].currentValue !== props['index'].previousValue)) {
      let index = props['index'].currentValue;
      let count = this.inData.count;
      let perc = index/count * 100;
      this.percentage = perc > 50 ? Math.floor(perc) : Math.ceil(perc);
    }
  }
}
