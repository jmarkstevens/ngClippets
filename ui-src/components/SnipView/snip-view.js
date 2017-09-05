import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { changeCurrentSnipIndex, snipCommentChanged, snipSnipChanged } from '../../store/snipview/snip.Actions';

@Component({
  selector: 'snip-view',
  template: require('./snip-view.html'),
  styles: [require('./snip-view.css')],
})
export default class SnipView implements OnDestroy {
  currentSnips = [{}];
  currentSnip = {
    snip: '',
    comment: '',
  };
  currentSnipIndex = 0;

  constructor(changeDetectorRef, ngRedux) {
    this.changeDetectorRef = changeDetectorRef;
    this.ngRedux = ngRedux;
    this.unsubscribe = this.ngRedux.subscribe(this.subscribeToState);
    this.subscribeToState(1);
  }
  getSnipColor = index => (index === this.currentSnipIndex ? '#cfc' : '#9b9');
  snipClick = (index) => {
    this.noCopyClick(index, true);
  };
  noCopyClick = (index, doCopy) => {
    if (index !== this.currentSnipIndex) {
      this.ngRedux.dispatch(changeCurrentSnipIndex(index));
      if (doCopy) {
        this.onSnipCopy();
      }
    }
  };

  ngOnDestroy() {
    this.unsubscribe();
  }

  onCommentChange = (event) => {
    this.ngRedux.dispatch(snipCommentChanged(event.target.value));
  };

  onSnipChange = (event) => {
    this.ngRedux.dispatch(snipSnipChanged(event.target.value));
  };

  onSnipCopy = () => {
    const copyText = this.currentSnip.snip;
    this.ngRedux.dispatch({ type: 'ApiSetClipboard', copyText });
  };

  subscribeToState = (first) => {
    this.currentSnips = this.ngRedux.getState().snipState.currentSnips;
    this.currentSnipIndex = this.ngRedux.getState().snipState.currentSnipIndex;
    this.currentSnip = this.currentSnips[this.currentSnipIndex];
    if (!first) {
      this.changeDetectorRef.detectChanges();
    }
  };
}

SnipView.parameters = [[ChangeDetectorRef], [NgRedux]];
