![MagicMirror²: The open source modular smart mirror platform. ](.github/header.png)

### Prerequisite

1. Install Homebrew `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
2. Install npm `brew install npm`

### Installation

1. Download and install the latest Node.js version.
2. Clone the repository and check out the master branch: `git clone https://github.com/TestLEM/MagicMirror.git`
3. Enter the repository: `cd MagicMirror`
4. Install the app: `npm install`
5. Run the app: `npm start`

### Update to latest version

1. Open `Terminal` app
2. Enter the repository: `cd MagicMirror`
3. Pull it!: `git pull`
4. Install node packages: `npm install`

### Configuration

1. Open config/config.js file with text editor.
2. Select the module to test, and then change 'disabled' option to false.
3. Edit sub-options in 'config' option.
4. Run the app, and you can see changed UI: `npm start`

Note: You can check validity of your configuration running the follow command:
```bash
npm run config:check
```

The following properties can be configured:

| **Option** | **Description** |
| --- | --- |
| `port` | The port on which the MagicMirror² server will run on. The default value is `8080`. |
| `address` | The ip address the accept connections. The  default open bind `localhost`.  Example config: `192.168.10.100`. |
| `ipWhitelist` | The list of IPs from which you are allowed to access the MagicMirror². The default value is `["127.0.0.1", "::ffff:127.0.0.1", "::1"]`. It is possible to specify IPs with subnet masks (`["127.0.0.1", "127.0.0.1/24"]`) or define ip ranges (`["127.0.0.1", ["192.168.0.1", "192.168.0.100"]]`). Set `[]` to allow all IP addresses. For more information about how configure this directive see the [follow post ipWhitelist HowTo](https://forum.magicmirror.builders/topic/1326/ipwhitelist-howto) |
| `zoom` | This allows to scale the mirror contents with a given zoom factor. The default value is `1.0`|
| `language` | The language of the interface. (Note: Not all elements will be localized.) Possible values are `en`, `nl`, `ru`, `fr`, etc., but the default value is `en`. |
| `timeFormat` | The form of time notation that will be used. Possible values are `12` or `24`. The default is `24`. |
| `units` | The units that will be used in the default weather modules. Possible values are `metric` or `imperial`. The default is `metric`. |
| `modules` | An array of active modules. **The array must contain objects. See the next table below for more information.** |
| `electronOptions` | An optional array of Electron (browser) options. This allows configuration of e.g. the browser screen size and position (example: `electronOptions: { fullscreen: false, width: 800, height: 600 }`). Kiosk mode can be enabled by setting `kiosk = true`, `autoHideMenuBar = false` and `fullscreen = false`. More options can be found [here](https://github.com/electron/electron/blob/master/docs/api/browser-window.md). |
| `customCss` | The path of the `custom.css` stylesheet. The default is `css/custom.css`. |

Module configuration:

| **Option** | **Description** |
| --- | --- |
| `module` | The name of the module. This can also contain the subfolder. Valid examples include `clock`, `default/calendar` and `custommodules/mymodule`. |
| `position` | The location of the module in which the module will be loaded. Possible values are `top_ bar`, `top_left`, `top_center`, `top_right`, `upper_third`, `middle_center`, `lower_third`, `bottom_left`, `bottom_center`, `bottom_right`, `bottom_bar`, `fullscreen_above`, and `fullscreen_below`. This field is optional but most modules require this field to set. Check the documentation of the module for more information. Multiple modules with the same position will be ordered based on the order in the configuration file. |
| `classes` | Additional classes which are passed to the module. The field is optional. |
| `header` | To display a header text above the module, add the header property. This field is optional. |
| `disabled` | Set disabled to `true` to skip creating the module. This field is optional. |
| `config` | An object with the module configuration properties. Check the documentation of the module for more information. This field is optional, unless the module requires extra configuration. |
