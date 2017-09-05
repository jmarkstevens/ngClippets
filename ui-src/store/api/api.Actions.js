export function apiSetTreeData(data) {
  return { type: 'ApiSetTreeData', data };
}

export function apiSetTreeDataState(data) {
  return { type: 'ApiSetTreeDataState', data };
}

export function apiGetTreeDataDone(data) {
  return (dispatch) => {
    dispatch({ type: 'ApiGetTreeDataDone', data });
    dispatch({ type: 'ApiGetTreeDataState' });
  };
}

export function apiGetTreeDataStateDone(data) {
  return (dispatch, getState) => {
    dispatch({ type: 'ApiGetTreeDataStateDone', data });
    dispatch({ type: 'SelectTreeNode', selectedId: getState().treeState.currentTreeNode.nodeid });
  };
}

export function apiGetSnipData(data) {
  return { type: 'ApiGetSnipData', data };
}

export function apiSetSnipData(data) {
  return { type: 'ApiSetSnipData', data };
}

export function apiGetSnipDataDone(data) {
  return (dispatch) => {
    dispatch({ type: 'ApiGetSnipDataDone', data });
    dispatch({ type: 'ApiGetTreeData' });
  };
}

let getClipboardPosition;

export function apiGetClipboard(position) {
  getClipboardPosition = position;
  return { type: 'ApiGetClipboard' };
}

export function apiSetClipboard(clip) {
  return { type: 'ApiSetClipboard', clip };
}

export function apiGetClipboardDone(clip) {
  return (dispatch, getState) => {
    dispatch({ type: 'ApiGetClipboardDone', clip, position: getClipboardPosition });
    dispatch({ type: 'ApiSetSnipData', data: getState().snipState.allSnips });
  };
}
