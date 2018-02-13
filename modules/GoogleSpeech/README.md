# GoogleSpeech

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

Using google speech api.

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'GoogleSpeech',
			position: 'top_right',
            config: {
                ...
            }
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `encoding`        | *Required* Encoding of audio data sent in all RecognitionAudio messages.
| `sampleRateHertz`        | *Required* Sample rate in Hertz of the audio data sent in all RecognitionAudio messages. Valid values are: 8000-48000. 16000 is optimal. For best results, set the sampling rate of the audio source to 16000 Hz. If that's not possible, use the native sample rate of the audio source (instead of re-sampling).
| `languageCode`        | *Required* The language of the supplied audio as a BCP-47 language tag. Example: "en-US". See Language Support for a list of the currently supported language codes.
