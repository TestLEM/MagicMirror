const request = require('request');

request(
  {
    uri: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      Authorization: `key=${process.env.LEGO_FCM_SERVER_KEY}`,
    },
    json: {
      to: process.argv[2],
      data: {
        notification: 'data',
        value: {
          temperature: 33.33,
          humidity: 44.44
        },
      },
    },
  },
  (error, response, body) => {
    console.log(body);
  }
);