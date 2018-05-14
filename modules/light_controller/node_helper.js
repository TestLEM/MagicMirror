/* Magic Mirror
 *
 * By L.EGO
 * MIT Licensed.
 */

const NodeHelper = require('../../js/node_helper');
const PythonShell = require('python-shell');

module.exports = NodeHelper.create({
  start() {
    console.info(`Starting node_helper for module [${this.name}]`);
  },

  socketNotificationReceived(notification, payload) {
    switch (notification) {
      case 'REQUEST_LIGHTING':
        this.changeLightColor(payload);
        break;
      default:
        throw new Error('Invalid socket notification');
    }
  },

  // TODO (wonjerry): color 변경 파이썬 스크립트를 하나로 합치고 option으로 color 정보 넘기기
  changeLightColor(lightType) {
    let fileName = '';
    switch (lightType) {
      case 'warm':
        fileName = 'warmColor.py';
        break;
      case 'cool':
        fileName = 'coolColor.py';
        break;
      case 'red':
        fileName = 'redColor.py';
        break;
      case 'blue':
        fileName = 'blueColor.py';
        break;
      default:
        throw new Error('Invalid color type');
    }

    console.log(`Running ${fileName}`);

    const options = {
      scriptPath: 'modules/lib/lighting',
    };

    PythonShell.run(fileName, options, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('results: %j', results);
    });
  },
});
