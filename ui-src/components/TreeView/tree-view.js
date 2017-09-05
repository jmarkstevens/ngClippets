import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { saveTreeState, setCurrentItem } from '../../store/treeview/tree.Actions';

@Component({
  selector: 'tree-view',
  template: require('./tree-view.html'),
  styles: [require('./tree-view.css')],
})
export default class TreeView implements OnDestroy {
  currentItem = {};
  iconOptions = { icons: { dev: './img/sun.ico', sys: './img/leaf.ico', home: './img/snow.ico' }, node: 'type' };
  titleColors = { normal: '#9b9', selected: '#cfc' };
  tvState = {};

  constructor(changeDetectorRef, ngRedux) {
    this.changeDetectorRef = changeDetectorRef;
    this.ngRedux = ngRedux;
    this.unsubscribe = this.ngRedux.subscribe(this.subscribeToState);
    this.subscribeToState(1);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  onItemSelected = (item) => {
    this.ngRedux.dispatch(setCurrentItem(item));
    this.ngRedux.dispatch(saveTreeState(this.tvState));
  };

  subscribeToState = (first) => {
    this.treeList = this.ngRedux.getState().treeState.treeData;
    this.tvState = this.ngRedux.getState().treeState.tvState;
    this.currentItem = this.ngRedux.getState().treeState.currentTreeNode;
    if (!first) this.changeDetectorRef.detectChanges();
  };
}
TreeView.parameters = [[ChangeDetectorRef], [NgRedux]];
