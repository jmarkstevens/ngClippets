import {Component, EventEmitter, Output} from '@angular/core';
import {NgRedux} from '@angular-redux/store';

import {snipActions} from '../../../store/snipview/snip.Actions';
import {actionData} from './sv-action.data';

@Component({
  selector: 'sv-actions',
  template: require('./sv-actions.html'),
  styles: [require('./sv-actions.css')]
})
export class SnipViewActions {
  @Output()onSnipCopy = new EventEmitter();
  btns = actionData.btns;

  constructor(ngRedux) {
    this.ngRedux = ngRedux;
  }
  clickHandler = buttonid => {
    this.ngRedux.dispatch(snipActions(buttonid));
  };
  copyClick = () => { this.onSnipCopy.emit(); }
}
SnipViewActions.parameters = [
  [NgRedux]
];
