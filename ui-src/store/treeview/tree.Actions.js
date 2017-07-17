import {apiSetTreeData, apiSetTreeDataState} from '../api/api.Actions';

export function saveTreeNew(node, location) {
  return (dispatch, getState) => {
    dispatch({type: 'SaveTreeNew', node, location});
    dispatch(apiSetTreeData(getState().treeState.treeData));
    dispatch(apiSetTreeDataState(getState().treeState.tvState));
  };
}

export function saveTreeEdit(node) {
  return (dispatch, getState) => {
    dispatch({type: 'SaveTreeEdit', node});
    dispatch(apiSetTreeData(getState().treeState.treeData));
  };
}

export function saveTreeState(data) {
  return (dispatch) => {
    dispatch({type: 'SaveTreeState', data});
    dispatch(apiSetTreeDataState(data));
    dispatch({type: 'SelectTreeNode', selectedId: data.selected});
  };
}
export function setCurrentItem(item) { return {type: 'SetCurrentItem', item}; }
export function treeActions(action, node) {
  return (dispatch, getState) => {
    switch (action) {
      case 'moveUp': dispatch({type: 'MoveUp', node});
      case 'moveDown': dispatch({type: 'MoveDown', node});
      case 'remove': dispatch({type: 'Remove', node});
    }
    dispatch(apiSetTreeData(getState().treeState.treeData));
  };
}
