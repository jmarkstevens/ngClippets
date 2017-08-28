import * as apiActions from '../api/api.Actions';

export function snipCommentChanged(comment) {
  return (dispatch, getState) => {
    dispatch({type: 'SnipCommentChanged', comment});
    dispatch(apiActions.apiSetSnipData(getState().snipState.allSnips));
  };
}

export function snipSnipChanged(snip) {
  return (dispatch, getState) => {
    dispatch({type: 'SnipSnipChanged', snip});
    dispatch(apiActions.apiSetSnipData(getState().snipState.allSnips));
  };
}

export function changeCurrentSnipIndex(index) { return {type: 'ChangeCurrentSnipIndex', index}; }

export function snipActions(action) {
  return (dispatch, getState) => {
    if (action.startsWith('paste')) {
      switch (action) {
        case 'paste':
        case 'pasteBefore': dispatch(apiActions.apiGetClipboard('PasteSnipBefore')); break;
        case 'pasteAfter': dispatch(apiActions.apiGetClipboard('PasteSnipAfter')); break;
      }
    } else {
      switch (action) {
        case 'new':
        case 'newBefore': dispatch({type: 'NewSnipBefore'}); break;
        case 'newAfter': dispatch({type: 'NewSnipAfter'}); break;
        case 'move':
        case 'moveUp': dispatch({type: 'MoveSnipUp'}); break;
        case 'moveDown': dispatch({type: 'MoveSnipDown'}); break;
        case 'remove': dispatch({type: 'RemoveSnip'}); break;
      }
      dispatch(apiActions.apiSetSnipData(getState().snipState.allSnips));
    }
  };
}
