
const getSetJson = require('./getset/GetSetJson');

module.exports = (socket) => {
  console.log('mainipc called.');

  const getSnipDataDone = (event, data) => {
    event.sender.send('server:GetSnipDataDone', data);
  };
  const onGetSnipData = (event) => {
    getSetJson.getData('SnipData', event, getSnipDataDone);
  };
  socket.on('client:GetSnipData', onGetSnipData);

  const onSetSnipData = (event, data) => {
    getSetJson.setData('SnipData', data);
  };
  socket.on('client:SetSnipData', onSetSnipData);

  const getTreeDataDone = (event, data) => {
    event.sender.send('server:GetTreeDataDone', data);
  };
  const onGetTreeData = (event) => {
    getSetJson.getData('TreeData', event, getTreeDataDone);
  };
  socket.on('client:GetTreeData', onGetTreeData);

  const onSetTreeData = (event, data) => {
    getSetJson.setData('TreeData', data);
  };
  socket.on('client:SetTreeData', onSetTreeData);

  const getTreeDataStateDone = (event, data) => {
    event.sender.send('server:GetTreeDataStateDone', data);
  };
  const onGetTreeDataState = (event) => {
    getSetJson.getData('TreeDataState', event, getTreeDataStateDone);
  };
  socket.on('client:GetTreeDataState', onGetTreeDataState);

  const onSetTreeDataState = (event, data) => {
    getSetJson.setData('TreeDataState', data);
  };
  socket.on('client:SetTreeDataState', onSetTreeDataState);
};
