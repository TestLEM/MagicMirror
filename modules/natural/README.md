# natural

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

{{DESCRIPTION}}

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'natural',
        }
    ]
}
```

## How to use

Using this:
this.sendNotification(notification, payload, sender);

| Option           | Description
|----------------- |-----------
| `notification`        | *Required* Request Type <br><br>**Type** 'REQUEST_TOKENIZING', 'REQUEST_STRING_DISTANCE', 'REQUEST_STRING_MATCH', 'REQUEST_STEMMERS', 'REQUEST_CLASSIFIERS', 'REQUEST_COMPARE_PHONETICS', 'REQUEST_ROW_PHONETICS'
| `payload`        | *Required* data for request type
