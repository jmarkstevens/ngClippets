'use strict';

const getSetJson = require('./getset/GetSetJson');

module.exports = function(socket) {
  console.log('mainipc called.');

  const getSnipDataDone = function(event, data){ event.sender.send('server:GetSnipDataDone', data); };
  const onGetSnipData = function(event) { getSetJson.getData('SnipData', event, getSnipDataDone); };
  socket.on('client:GetSnipData', onGetSnipData);

  const onSetSnipData = function(event, data) { getSetJson.setData('SnipData', data); };
  socket.on('client:SetSnipData', onSetSnipData);

  const getTreeDataDone = function(event, data){ event.sender.send('server:GetTreeDataDone', data); };
  const onGetTreeData = function(event){ getSetJson.getData('TreeData', event, getTreeDataDone); };
  socket.on('client:GetTreeData', onGetTreeData);

  const onSetTreeData = function(event, data){ getSetJson.setData('TreeData', data); };
  socket.on('client:SetTreeData', onSetTreeData);

  const getTreeDataStateDone = function(event, data){ event.sender.send('server:GetTreeDataStateDone', data); };
  const onGetTreeDataState = function(event){ getSetJson.getData('TreeDataState', event, getTreeDataStateDone); };
  socket.on('client:GetTreeDataState', onGetTreeDataState);

  const onSetTreeDataState = function(event, data){ getSetJson.setData('TreeDataState', data); };
  socket.on('client:SetTreeDataState', onSetTreeDataState);
};
