/* global Module Log */

/* Magic Mirror
 * Module: keyword
 *
 * By L.EGO
 * MIT Licensed.
 */

Module.register('keyword', {
  start() {
    Log.info(`Start module [${this.name}]`);
  },

  /**
   * REQUEST_SEND_DATA_TO_SERVER
   * 이 notification을 받은 모듈은 서버로 자신이 맡은 항목의 데이터를 전송하게 됩니다.
   *
   * weatherForecast에서는 outdoorTemperature, weatherType
   * MMM-DHT-Sensor에서는 indoorTemperature, indoorHumidity
   * face_detection에서는 detectedFaceCount
   * lego_client에서는 dust api를 통해 얻은 microDust
   * keyword 모듈에서는 이 notification일때 사용자가 말한 keyword
   *
   * 들을 전송합니다.
   */

  parseText(str) {
    let action = '';
    let param = '';

    const trimmedStr = str.split(' ').join('');
    if (trimmedStr.includes('화장조명')) {
      action = 'REQUEST_LIGHTING';
      param = '화장조명';
    } else if (trimmedStr.includes('사무실조명')) {
      action = 'REQUEST_LIGHTING';
      param = '사무실조명';
    } else if (trimmedStr.includes('야외조명')) {
      action = 'REQUEST_LIGHTING';
      param = '야외조명';
    } else if (trimmedStr.includes('오늘날씨')) {
      action = 'REQUEST_SEND_DATA_TO_SERVER';
      param = '오늘날씨';
    } else if (trimmedStr.includes('빨래')) {
      action = 'REQUEST_SEND_DATA_TO_SERVER';
      param = '빨래';
    } else if (trimmedStr.includes('보여')) {
      action = 'REQUEST_SEND_DATA_TO_SERVER';
      param = '보여';
    } else if (trimmedStr.includes('먼지')) {
      action = 'REQUEST_SEND_DATA_TO_SERVER';
      param = '먼지';
    }

    return { action, param };
  },

  notificationReceived(notification, payload) {
    switch (notification) {
      case 'REQUEST_PARSE_TEXT': {
        const { action, param } = this.parseText(payload);
        if (!action) return;

        this.sendNotification(action, param);

        if (action === 'REQUEST_SEND_DATA_TO_SERVER') {
          this.sendNotification('REQUEST_SEND_TOPIC_DATA_TO_GATEWAY', {
            topic: 'keyword',
            data: {
              word: param,
            },
          });
        }
        break;
      }
      default:
      // Do nothing.
    }
  },
});
