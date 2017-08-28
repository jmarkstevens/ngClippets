import lodash from 'lodash';

let _snipsIndex = 0;

function _setCurrentSnips(selectedId, _snipData) {
  let snipsRecord = lodash.find(_snipData.allSnips, {nodeid: selectedId});
  _snipsIndex = lodash.indexOf(_snipData.allSnips, snipsRecord);
  if (snipsRecord.snips.length < 1) _snipData.currentSnips = [{snip: '', comment: ''}];
  else _snipData.currentSnips = snipsRecord.snips;
  _snipData.currentSnipIndex = 0;
  return _snipData;
}

function _selectSnipItem(snipItem, _snipData) {
  _snipData.currentSnipIndex = lodash.indexOf(_snipData.currentSnips, snipItem);
  return _snipData;
}

function _newSnip(action, clip, _snipData) {
  let newSnip = {snip: clip, comment: ''};
  if (action == 'NewSnipAfter' || action == 'PasteSnipAfter') _snipData.currentSnipIndex += 1;
  _snipData.currentSnips.splice(_snipData.currentSnipIndex, 0, newSnip);
  _snipData.allSnips[_snipsIndex].snips = _snipData.currentSnips;
  return _snipData;
}

function _moveSnipItem(action, _snipData) {
  let tIndex = _snipData.currentSnipIndex;
  switch (action) {
    case 'MoveSnipUp': tIndex = tIndex > 0 ? tIndex - 1 : 0; break;
    case 'MoveSnipDown': {let cLength = _snipData.currentSnips.length - 1;
      tIndex = tIndex < cLength ? tIndex + 1 : cLength;
      break;}
    case 'RemoveSnip': tIndex = tIndex > 0 ? tIndex - 1 : 0; break;
  }
  if (tIndex != _snipData.currentSnipIndex || action == 'RemoveSnip') {
    let data = _snipData.currentSnips.splice(_snipData.currentSnipIndex, 1);
    if (action != 'RemoveSnip') _snipData.currentSnips.splice(tIndex, 0, data[0]);
    _snipData.allSnips[_snipsIndex].snips = _snipData.currentSnips;
    _snipData.currentSnipIndex = tIndex;
  }
  return _snipData;
}

function _newTreeNode(newNodeID, _snipData) {
  let newSnips = {nodeid: newNodeID, snips: []};
  _snipData.allSnips.push(newSnips);

  const snipsRecord = lodash.find(_snipData.allSnips, {nodeid: newNodeID});
  _snipsIndex = lodash.indexOf(_snipData.allSnips, snipsRecord);
  if (snipsRecord.snips.length < 1) _snipData.currentSnips = [{snip: '', comment: ''}];
  else _snipData.currentSnips = snipsRecord.snips;
  _snipData.currentSnipIndex = 0;
  return _snipData;
}

function _removeSnips(nodeID, _snipData) {
  let snipsRecord = lodash.find(_snipData.allSnips, {nodeid: nodeID});
  let snipsIndex = lodash.indexOf(_snipData.allSnips, snipsRecord);
  _snipData.allSnips.splice(snipsIndex, 1);
  return _snipData;
}

function _snipCommentChanged(comment, _snipData) {
  _snipData.currentSnips[_snipData.currentSnipIndex].comment = comment;
  _snipData.allSnips[_snipsIndex].snips = _snipData.currentSnips;
  return _snipData;
}

function _snipSnipChanged(snip, _snipData) {
  _snipData.currentSnips[_snipData.currentSnipIndex].snip = snip;
  _snipData.allSnips[_snipsIndex].snips = _snipData.currentSnips;
  return _snipData;
}

const initialSnipState = {
  allSnips: [],
  currentSnips: [{snip: '', comment: ''}],
  currentSnipIndex: 0
};

export default function handleActions(state = initialSnipState, action) {
  let _snipData = Object.assign({}, state);
  switch (action.type) {
    case 'ApiGetSnipDataDone':
      return {
        ...state,
        allSnips: action.data.slice(0)
      };
    case 'ChangeCurrentSnipIndex':
      return {
        ...state,
        currentSnipIndex: action.index
      };
    case 'ApiGetClipboardDone': return _newSnip(action.position, action.clip, _snipData);
    case 'NewSnipAfter':
    case 'NewSnipBefore': return _newSnip(action.type, '', _snipData);
    case 'MoveSnipUp':
    case 'MoveSnipDown':
    case 'RemoveSnip': return _moveSnipItem(action.type, _snipData);
    case 'RemoveSnips': return _removeSnips(action.nodeid, _snipData);
    case 'SelectTreeNode': return _setCurrentSnips(action.selectedId, _snipData);
    case 'SelectSnipItem': return _selectSnipItem(action.item, _snipData);
    case 'SnipCommentChanged': return _snipCommentChanged(action.comment, _snipData);
    case 'SnipSnipChanged': return _snipSnipChanged(action.snip, _snipData);
    case 'NewTreeNode': return _newTreeNode(action.nodeid, _snipData);
    default: return state;
  }
}
