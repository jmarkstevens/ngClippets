import lodash from 'lodash';
import traverse from 'traverse';

function _gotTreeViewState(treedata, tvState) {
  let _currentTreeNode = _getSelected(treedata, tvState.selected);
  if (_currentTreeNode == null) _currentTreeNode = treedata[0];
  return { tvState, currentTreeNode: _currentTreeNode };
}

function _getSelected(tree, nodeid) {
  let result = null;
  lodash.each(tree, (node) => {
    if (node.nodeid === nodeid) result = node;
    if (result == null && node.children && node.children.length > 0) result = _getSelected(node.children, nodeid);
  });
  return result;
}

function _saveTreeNew(_treeData, treeNode, location, tvState) {
  const newNode = treeNode;
  const nodeIndex = _getNodeIndex(_treeData, tvState.selected);

  const nextNodeID = tvState.nextid + 1;
  tvState.nextid = nextNodeID;
  let newNodeID;
  const isRoot = !tvState.selected.includes('.');
  if (location === 'saveNewChild') {
    newNodeID = `${tvState.selected}.${nextNodeID.toString()}`;
  } else if (isRoot) {
    newNodeID = nextNodeID.toString();
  } else {
    const nodeIdArray = tvState.selected.split('.');
    nodeIdArray.pop();
    newNodeID = `${nodeIdArray.join('.')}.${nextNodeID.toString()}`;
  }
  newNode.nodeid = newNodeID;

  let tIndex;
  let children;
  let isNotRoot = nodeIndex.length > 1;
  if (location === 'saveNewChild') {
    tvState.showChildren[tvState.selected] = 1;
    nodeIndex.push('children');
    children = traverse(_treeData).get(nodeIndex);
    isNotRoot = true;
  } else if (isNotRoot) {
    tIndex = nodeIndex.pop();
    children = traverse(_treeData).get(nodeIndex);
  } else {
    tIndex = nodeIndex[0];
    children = _treeData;
  }
  switch (location) {
    case 'saveNewBefore':
      break;
    case 'saveNewAfter': {
      const cLength = children.length;
      tIndex = tIndex < cLength ? tIndex + 1 : cLength;
      break;
    }
    case 'saveNewChild':
      tIndex = 0;
      break;
    default: break;
  }
  children.splice(tIndex, 0, Object.assign({}, newNode));
  if (isNotRoot) traverse(_treeData).set(nodeIndex, children);
  else _treeData = children;
  tvState.selected = newNode.nodeid;
  return { treeData: _treeData, currentTreeNode: newNode, tvState };
}

function _saveTreeEdit(_treeData, treeNode) {
  const nodeIndex = _getNodeIndex(_treeData, treeNode.nodeid);
  traverse(_treeData).set(nodeIndex, Object.assign({}, treeNode));
  return { treeData: _treeData, currentTreeNode: treeNode };
}

function _moveTreeItem(_treeData, _currentTreeNode, action) {
  const nodeIndex = _getNodeIndex(_treeData, _currentTreeNode.nodeid);
  let tIndex;
  let children;
  const isNotRoot = nodeIndex.length > 1;
  if (isNotRoot) {
    tIndex = nodeIndex.pop();
    children = traverse(_treeData).get(nodeIndex);
  } else {
    tIndex = nodeIndex[0];
    children = _treeData;
  }
  const currentIndex = tIndex;
  switch (action) {
    case 'MoveUp':
      tIndex = tIndex > 0 ? tIndex - 1 : 0;
      break;
    case 'MoveDown': {
      const cLength = children.length;
      tIndex = tIndex < cLength ? tIndex + 1 : cLength;
      break;
    }
    case 'Remove':
      tIndex = tIndex > 0 ? tIndex - 1 : 0;
      break;
    default: break;
  }
  if (tIndex !== currentIndex || action === 'Remove') {
    const data = children.splice(currentIndex, 1);
    if (action === 'Remove') {
      const newNode = children[tIndex];
      if (newNode != null) _currentTreeNode = newNode;
    } else children.splice(tIndex, 0, data[0]);
  }
  if (isNotRoot) traverse(_treeData).set(nodeIndex, children);
  else _treeData = children;

  return { treeData: _treeData };
}

function _getNodeIndex(_treeData, nodeid) {
  let treeData = _treeData;
  const nodeID = nodeid;
  if (lodash.isEmpty(nodeID)) {
    return [];
  }

  const nodeIdArray = nodeID.split('.');
  let searchID = nodeIdArray.shift();
  const nodeIndex = [];
  let index = -1;
  let nextSearchID = -1;
  while (searchID) {
    if (!treeData) {
      return [];
    }
    const treeItem = lodash.find(treeData, { nodeid: searchID });
    index = lodash.indexOf(treeData, treeItem);
    if (index < 0) {
      return [];
    }
    nodeIndex.push(index);
    nextSearchID = nodeIdArray.shift();
    if (nextSearchID) {
      searchID += `.${nextSearchID}`;
      treeData = treeData[index].children;
      if (treeData) {
        nodeIndex.push('children');
      }
    } else searchID = nextSearchID;
  }

  return nodeIndex;
}

const initialState = {
  treeData: [{}],
  currentTreeNode: {
    title: 'not selected',
  },
  tvState: {
    id: 'nodeid',
    selected: '',
    showChildren: {},
  },
};

export default function handleActions(state = initialState, action) {
  const treeCopy = state.treeData.slice(0);
  switch (action.type) {
    case 'ApiGetTreeDataStateDone': {
      if (action.data.selected) {
        const tvData = _gotTreeViewState(treeCopy, action.data);
        return {
          ...state,
          ...tvData,
        };
      }
      break;
    }
    case 'SaveTreeState':
      return {
        ...state,
        tvState: action.data,
      };
    case 'SetCurrentItem':
      return {
        ...state,
        currentTreeNode: action.item,
      };
    case 'ApiGetTreeDataDone':
      return {
        ...state,
        treeData: action.data.slice(0),
      };
    case 'MoveUp':
    case 'MoveDown':
    case 'Remove': {
      const moveTreeData = _moveTreeItem(treeCopy, action.node, action.type);
      return {
        ...state,
        ...moveTreeData,
      };
    }
    case 'SaveTreeEdit': {
      const editTreeData = _saveTreeEdit(treeCopy, action.node);
      return {
        ...state,
        ...editTreeData,
      };
    }
    case 'SaveTreeNew': {
      const _tvState = Object.assign({}, state.tvState);
      const newTreeData = _saveTreeNew(treeCopy, action.node, action.location, _tvState);
      newTreeData.showTreeNew = false;
      return {
        ...state,
        ...newTreeData,
      };
    }
    default:
      break;
  }
  return state;
}
