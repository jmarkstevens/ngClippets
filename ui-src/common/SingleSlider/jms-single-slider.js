import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'jms-single-slider',
  template: require('./jms-single-slider.html'),
  styles: [require('./jms-single-slider.css')]
})
export class jmsSingleSlider implements OnInit, OnChanges {
  @Input() inData = {};
  @Input() index = 0;
  @Output() onValueChanged = new EventEmitter();
  dragging = false;

  constructor(elementRef) {
    this.elementRef = elementRef;
  }
  
  ngOnChanges(props) {
    if (props['inData'] && (props['inData'].currentValue !== props['inData'].previousValue)) {
      this.count = this.inData.max - this.inData.min;
    }
    if (props['index'] && (props['index'].currentValue !== props['index'].previousValue)) {
      let index = props['index'].currentValue;
      let perc = index/this.count * 100;
      this.percentage = perc > 50 ? Math.floor(perc) : Math.ceil(perc);
      if (this.countWidth) this.indexLeft = Math.floor(this.countWidth * (this.percentage * .01));
    }
  }

  ngOnInit() {
    this.countWidth = this.elementRef.nativeElement.clientWidth - 32;
    this.indexLeft = Math.floor(this.countWidth * (this.percentage * .01));
    this.leftSpace = this.elementRef.nativeElement.getBoundingClientRect().left + 16;
  }
  
  onCountClick = event => {
    let xPos = event.clientX - this.leftSpace;
    let perc = xPos/this.countWidth * 100;
    perc = perc > 50 ? Math.floor(perc) : Math.ceil(perc);
    let index = Math.floor(this.count * (perc * .01));
    if (index >= this.inData.min && index <= this.inData.max) this.onValueChanged.emit(index);
  }
  
  onCircleMouseDown = () => {
    this.dragging = true;
    console.log('onCircleMouseDown');
  }
  onDragging = event => {
    if (this.dragging) this.onCountClick(event);
  }
  onDragStop = () => {
    this.dragging = false;
  }
}
jmsSingleSlider.parameters = [[ElementRef]];
