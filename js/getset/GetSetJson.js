
const fs = require('fs');
const config = require('../../config.json');

let configRoot;
switch (process.platform) {
  case 'darwin':
    configRoot = process.env.HOME + config.darwin;
    break;
  case 'linux':
    configRoot = config.linux;
    break;
  case 'win32':
    configRoot = process.env.USERPROFILE + config.win32;
    break;
  default:
    break;
}

const rootDataPath = configRoot;

module.exports.getData = (fileName, event, doneCallBack) => {
  const filePath = `${rootDataPath}/${fileName}.json`;
  const jsonReadCallBack = (err, data) => {
    if (err) doneCallBack(event, { message: 'Data readFile error' });
    else {
      const jsonData = JSON.parse(data.toString());
      doneCallBack(event, jsonData);
    }
  };
  fs.readFile(filePath, jsonReadCallBack);
};

module.exports.setData = (fileName, data, event, doneCallBack) => {
  const filePath = `${rootDataPath}/${fileName}.json`;
  const writeFileCallBack = (err) => {
    if (err) doneCallBack(event, { message: 'Data writeFile error', filePath });
    if (doneCallBack) doneCallBack(event, { setResponse: 'ok' });
  };
  fs.writeFile(filePath, JSON.stringify(data, null, 2), writeFileCallBack);
};
