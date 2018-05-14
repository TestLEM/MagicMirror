# speech_recognition

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).
Using google speech reconition api.

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'speech_recognition',
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
<br><br> **Possible values:** `LINEAR16`, `FLAC`, `MULAW`, `AMR` `AMR_WB` `OGG_OPUS` `SPEEX_WITH_HEADER_BYTE` <br> **Default value:** `LINEAR16` <br> If you want to know more, please enter this:  https://cloud.google.com/speech/reference/rpc/google.cloud.speech.v1#google.cloud.speech.v1.RecognitionConfig.AudioEncoding
| `sampleRateHertz`        | *Required* Sample rate in Hertz of the audio data sent in all RecognitionAudio messages. Valid values are: 8000-48000. 16000 is optimal. For best results, set the sampling rate of the audio source to 16000 Hz. If that's not possible, use the native sample rate of the audio source (instead of re-sampling).
| `languageCode`        | *Required* The language of the supplied audio as a BCP-47 language tag. Example: "en-US". See Language Support for a list of the currently supported language codes.
