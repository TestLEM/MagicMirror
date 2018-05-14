# push_receiver

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).
Using electron-push-receiver libarary.

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'push_receiver',
        }
    ]
}
```

### Push Test

1. Set the fcm server key to an environment variable : `LEGO_FCM_SERVER_KEY`
2. Run `npm start dev`
3. Find log: `fcm token: [TOKEN]` or `fcm token updated: [TOKEN]`
4. `cd modules/push_receiver`
5. `node push_test.js [TOKEN]`