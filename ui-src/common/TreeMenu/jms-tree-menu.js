import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'jms-tree-menu',
  template: require('./jms-tree-menu.html'),
  styles: [require('./jms-tree-menu.css')]
})
export class jmsTreeMenu {
  @Input()menuList = [{}];
  @Input()iconOptions = {};
  @Output()onItemSelected = new EventEmitter();
  @Output()onShowChildren = new EventEmitter();

  constructor(changeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;
  }
  iconClick = item => {
    if (item.children && item.children.length > 0) {
      item.showChildren = item.showChildren ? 0 : 1;
      this.onShowChildren.emit(item);
      this.changeDetectorRef.detectChanges();
    } else {
      this.titleClick(item);
    }
  }
  titleClick = item => {
    this.onItemSelected.emit(item);
  }
  getIconBack = item => {
    if (item.children && item.children.length > 0) {
      let icon = item[this.iconOptions.node];
      let iconBack = this.iconOptions.icons[icon];
      return iconBack;
    } else {
      return './img/1x1TransShim.gif';
    }
  }
}
jmsTreeMenu.parameters = [
  [ChangeDetectorRef]
];
