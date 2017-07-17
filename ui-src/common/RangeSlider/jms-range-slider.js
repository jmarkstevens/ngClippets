import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'jms-range-slider',
  template: require('./jms-range-slider.html'),
  styles: [require('./jms-range-slider.css')]
})
export class jmsRangeSlider {
  @Input() inData = {};
  @Input() lowIndex = 0;
  @Input() highIndex = 0;
  @Output() onLowChanged = new EventEmitter();
  @Output() onHighChanged = new EventEmitter();
  dragging = false;

  constructor(elementRef) {
    this.elementRef = elementRef;
  }
  
  ngOnChanges(props) {
    if (props['inData'] && (props['inData'].currentValue !== props['inData'].previousValue)) {
      this.count = this.inData.max - this.inData.min;
    }
    let doLow = (props['lowIndex'] && (props['lowIndex'].currentValue !== props['lowIndex'].previousValue));
    let doHigh = (props['highIndex'] && (props['highIndex'].currentValue !== props['highIndex'].previousValue))
    if (doLow || doHigh) {
      let lowI = this.lowIndex;
      let highI = this.highIndex;
      let percL = lowI/this.count * 100;
      this.indexLeft = percL > 50 ? Math.floor(percL) : Math.ceil(percL);
      let length = highI - lowI;
      let perc = length/this.count * 100;
      this.indexWidth = perc > 50 ? Math.floor(perc) : Math.ceil(perc);
      let percH = highI/this.count * 100;
      this.indexRight = percH > 50 ? Math.floor(percH) : Math.ceil(percH);
      if (this.countWidth) {
        this.lowLeft = Math.floor(this.countWidth * (this.indexLeft * .01));
        this.highLeft = Math.floor(this.countWidth * (this.indexRight * .01));
      }
    }
  }

  ngOnInit() {
    this.countWidth = this.elementRef.nativeElement.clientWidth - 32;
    this.lowLeft = Math.floor(this.countWidth * (this.indexLeft * .01));
    this.highLeft = Math.floor(this.countWidth * (this.indexRight * .01));
    this.leftSpace = this.elementRef.nativeElement.getBoundingClientRect().left + 16;
  }
  
  onCountClick = event => {
    let xPos = event.clientX - this.leftSpace;
    let perc = xPos/this.countWidth * 100;
    if (perc > 50) this.newHighIndex(xPos);
    else this.newLowIndex(xPos);
  }
  newLowIndex = xPos => {
    let perc = xPos/this.countWidth * 100;
    perc = perc > 50 ? Math.floor(perc) : Math.ceil(perc);
    let index = Math.floor(this.count * (perc * .01));
    if (index >= this.inData.min && index <= this.inData.max) this.onLowChanged.emit(index);
  }
  newHighIndex = xPos => {
    let perc = xPos/this.countWidth * 100;
    perc = perc > 50 ? Math.floor(perc) : Math.ceil(perc);
    let index = Math.floor(this.count * (perc * .01));
    if (index >= this.inData.min && index <= this.inData.max) this.onHighChanged.emit(index);
  }
  onLowMouseDown = () => {
    this.draggingLeft = true;
  }
  onHighMouseDown = () => {
    this.draggingRight = true;
  }
  onDragging = event => {
    let xPos = event.clientX - this.leftSpace;
    if (this.draggingLeft) this.newLowIndex(xPos);
    if (this.draggingRight) this.newHighIndex(xPos);
  }
  onDragStop = () => {
    this.draggingLeft = false;
    this.draggingRight = false;
  }
}
jmsRangeSlider.parameters = [[ElementRef]];
