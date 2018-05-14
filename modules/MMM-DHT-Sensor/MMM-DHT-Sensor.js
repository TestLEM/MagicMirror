/* global Module, config, Log */

/* Magic Mirror
 * Module: MMM-DHT-Sensor
 *
 * By L.EGO
 * Based on Ricardo Gonzalez http://www.github.com/ryck/MMM-DHT-Sensor
 * MIT Licensed.
 */

Module.register('MMM-DHT-Sensor', {
  defaults: {
    updateInterval: 60 * 60 * 1000, // Every hour.
    initialLoadDelay: 0, // No delay
    animationSpeed: 1000, // One second.
    units: config.units, // Celsius
    relativeScale: 30,
    debug: false,
    sensorPin: 2,
    sensorType: 22,
  },

  start() {
    this.temperature = null;
    this.humidity = null;
    this.loaded = false;
    this.updateTimer = null;
    Log.info(`Starting module: ${this.name}`);
  },

  getStyles() {
    return ['MMM-DHT-Sensor.css', 'font-awesome.css'];
  },

  getHeader() {
    return this.config.header;
  },

  updateSensorData() {
    if (this.config.debug) {
      Log.info('sendSocketNotification: GET_SENSOR_DATA');
    }
    const { sensorPin, sensorType } = this.config;
    this.sendSocketNotification('GET_SENSOR_DATA', { sensorPin, sensorType });
  },

  processSensorData(data) {
    if (this.config.debug) {
      Log.info(data);
    }

    this.loaded = true;
    // Convert C to F
    if (this.config.units === 'imperial') {
      this.temperature = data.temperature * 9 / 5 + 32; // eslint-disable-line no-mixed-operators
    } else {
      this.temperature = data.temperature;
    }
    this.humidity = data.humidity;

    this.updateDom(this.config.animationSpeed);
  },

  getDom() {
    const wrapper = document.createElement('div');

    if (this.config.sensorPin === '') {
      wrapper.innerHTML = 'Please set the GPIO pin number.';
      wrapper.className = 'dimmed light small';
      return wrapper;
    }

    if (this.config.sensorType === '') {
      wrapper.innerHTML = 'Please set the sensor type (11 / 22).';
      wrapper.className = 'dimmed light small';
      return wrapper;
    }

    if (!this.loaded) {
      wrapper.innerHTML = 'Loading sensor data...';
      wrapper.className = 'dimmed light small';
      return wrapper;
    }

    // Start building table.
    const dataTable = document.createElement('table');
    dataTable.className = 'small';

    const tempRow = document.createElement('tr');
    const humidRow = document.createElement('tr');

    if (this.temperature != null && this.humidity != null) {
      tempRow.appendChild(this.getTemperatureCellElement());
      humidRow.appendChild(this.getHumidityCellElement());

      dataTable.appendChild(tempRow);
      dataTable.appendChild(humidRow);
    } else {
      const row1 = document.createElement('tr');
      dataTable.appendChild(row1);

      const messageCell = document.createElement('td');
      messageCell.innerHTML = 'No data returned';
      messageCell.className = 'bright';
      row1.appendChild(messageCell);
    }
    wrapper.appendChild(dataTable);
    return wrapper;
  },

  getTemperatureCellElement() {
    const temperatureCell = document.createElement('td');
    temperatureCell.className = 'data temperature ';

    // Get a 40C ratio value to set the thermometer icon scale.
    const temperatureRatio = this.temperature / this.config.relativeScale;

    let degreeLabel = '';
    switch (this.config.units) {
      case 'metric':
        degreeLabel = 'C';
        break;
      case 'imperial':
        degreeLabel = 'F';
        break;
      case 'default':
        degreeLabel = 'C';
        break;
      default:
        break;
    }

    if (temperatureRatio < 0) {
      if (this.config.debug) {
        Log.info(`thermometer-empty ${this.temperature} - ${temperatureRatio}`);
      }
      temperatureCell.className += 'thermometer-empty';
    } else if (temperatureRatio < 0.25) {
      if (this.config.debug) {
        Log.info(`thermometer-quarter ${this.temperature} - ${temperatureRatio}`);
      }
      temperatureCell.className += 'thermometer-quarter';
    } else if (temperatureRatio < 0.5) {
      if (this.config.debug) {
        Log.info(`thermometer-half ${this.temperature} - ${temperatureRatio}`);
      }
      temperatureCell.className += 'thermometer-half';
    } else if (temperatureRatio < 0.75) {
      if (this.config.debug) {
        Log.info(`thermometer-three-quarters ${this.temperature} - ${temperatureRatio}`);
      }
      temperatureCell.className += 'thermometer-three-quarters';
    } else {
      if (this.config.debug) {
        Log.info(`thermometer-full ${this.temperature} - ${temperatureRatio}`);
      }
      temperatureCell.className += 'thermometer-full';
    }

    temperatureCell.innerHTML = ` ${this.temperature} ${degreeLabel}`;

    return temperatureCell;
  },

  getHumidityCellElement() {
    const humidityCell = document.createElement('td');
    humidityCell.className = 'data humidity';
    humidityCell.innerHTML = ` ${this.humidity} %`;
    return humidityCell;
  },

  notificationToLegoClient({ temperature, humidity }) {
    this.sendNotification('REQUEST_SEND_TOPIC_DATA_TO_GATEWAY', {
      topic: 'indoor-temperature',
      data: {
        indoorTemperature: temperature,
      },
    });

    this.sendNotification('REQUEST_SEND_TOPIC_DATA_TO_GATEWAY', {
      topic: 'indoor-humidity',
      data: {
        indoorHumidity: humidity,
      },
    });
  },

  socketNotificationReceived(notification, payload) {
    switch (notification) {
      case 'SENSOR_DATA':
        this.processSensorData(payload);
        this.notificationToLegoClient(payload);
        break;
      case 'REQUEST_SEND_DATA_TO_SERVER':
        this.updateSensorData();
        break;
      default:
        throw new Error(`Unknown notification: ${notification}`);
    }
  },
});
