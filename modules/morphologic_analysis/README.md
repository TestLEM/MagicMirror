# morphologic_analysis

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

## Install Mecab ko
`node_modules/mecab-ya/bin/install-mecab ko`

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'morphologic_analysis'
        }
    ]
}
```