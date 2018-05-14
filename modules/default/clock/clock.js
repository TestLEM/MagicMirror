/* global Log, Module, moment, config */
/* Magic Mirror
 * Module: Clock
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register('clock', {
  // Module config defaults.
  defaults: {
    displayType: 'digital', // options: digital, analog, both

    timeFormat: config.timeFormat,
    displaySeconds: true,
    showPeriod: true,
    showPeriodUpper: false,
    clockBold: false,
    showDate: true,
    showWeek: false,
    dateFormat: 'dddd, LL',

    /* specific to the analog clock */
    analogSize: '200px',
    analogFace: 'simple', // options: 'none', 'simple', 'face-###' (where ### is 001 to 012 inclusive)
    analogPlacement: 'bottom', // options: 'top', 'bottom', 'left', 'right'
    analogShowDate: 'top', // options: false, 'top', or 'bottom'
    secondsColor: '#888888',
    timezone: null,
  },
  // Define required scripts.
  getScripts() {
    return ['moment.js', 'moment-timezone.js'];
  },
  // Define styles.
  getStyles() {
    return ['clock_styles.css'];
  },
  // Define start sequence.
  start() {
    this.fakeTime = { hour24: null, minutes: 0 };
    Log.info(`Starting module: ${this.name}`);

    // Schedule update interval.
    setInterval(() => {
      this.updateDom();
    }, 1000);

    // Set locale.
    moment.locale(config.language);
  },
  // Override dom generator.
  getDom() {
    const wrapper = document.createElement('div');

    /** **********************************
     * Create wrappers for DIGITAL clock
     */

    const dateWrapper = document.createElement('div');
    const timeWrapper = document.createElement('div');
    const secondsWrapper = document.createElement('sup');
    const periodWrapper = document.createElement('span');
    const weekWrapper = document.createElement('div');
    // Style Wrappers
    dateWrapper.className = 'date normal medium';
    timeWrapper.className = 'time bright large light';
    secondsWrapper.className = 'dimmed';
    weekWrapper.className = 'week dimmed medium';

    // Set content of wrappers.
    // The moment().format("h") method has a bug on the Raspberry Pi.
    // So we need to generate the timestring manually.
    // See issue: https://github.com/MichMich/MagicMirror/issues/181
    let timeString;
    var now = moment();
    if (this.config.timezone) {
      now.tz(this.config.timezone);
    }

    if (this.fakeTime.hour24 !== null) {
      const { hour24, minutes } = this.fakeTime;
      if (now.format('ss') === '00') this.fakeTime.minutes += 1;
      now.set({ hours: hour24, minutes });
    }

    let hourSymbol = 'HH';
    if (this.config.timeFormat !== 24) {
      hourSymbol = 'h';
    }
    if (this.config.clockBold === true) {
      timeString = now.format(`${hourSymbol}[<span class="bold">]mm[</span>]`);
    } else {
      timeString = now.format(`${hourSymbol}:mm`);
    }

    if (this.config.showDate) {
      dateWrapper.innerHTML = now.format(this.config.dateFormat);
    }
    if (this.config.showWeek) {
      weekWrapper.innerHTML = this.translate('WEEK', { weekNumber: now.week() });
    }
    timeWrapper.innerHTML = timeString;
    secondsWrapper.innerHTML = now.format('ss');
    if (this.config.showPeriodUpper) {
      periodWrapper.innerHTML = now.format('A');
    } else {
      periodWrapper.innerHTML = now.format('a');
    }
    if (this.config.displaySeconds) {
      timeWrapper.appendChild(secondsWrapper);
    }
    if (this.config.showPeriod && this.config.timeFormat !== 24) {
      timeWrapper.appendChild(periodWrapper);
    }

    /** **************************************************************
     * Create wrappers for ANALOG clock, only if specified in config
     */

    if (this.config.displayType !== 'digital') {
      // If it isn't 'digital', then an 'analog' clock was also requested

      // Calculate the degree offset for each hand of the clock
      var now = moment();
      if (this.config.timezone) {
        now.tz(this.config.timezone);
      }
      let second = now.seconds() * 6,
        minute = now.minute() * 6 + second / 60,
        hour = (now.hours() % 12) / 12 * 360 + 90 + minute / 12;

      // Create wrappers
      var clockCircle = document.createElement('div');
      clockCircle.className = 'clockCircle';
      clockCircle.style.width = this.config.analogSize;
      clockCircle.style.height = this.config.analogSize;

      if (
        this.config.analogFace != '' &&
        this.config.analogFace != 'simple' &&
        this.config.analogFace != 'none'
      ) {
        clockCircle.style.background = `url(${this.data.path}faces/${this.config.analogFace}.svg)`;
        clockCircle.style.backgroundSize = '100%';

        // The following line solves issue: https://github.com/MichMich/MagicMirror/issues/611
        clockCircle.style.border = '1px solid black';
      } else if (this.config.analogFace != 'none') {
        clockCircle.style.border = '2px solid white';
      }
      const clockFace = document.createElement('div');
      clockFace.className = 'clockFace';

      const clockHour = document.createElement('div');
      clockHour.id = 'clockHour';
      clockHour.style.transform = `rotate(${hour}deg)`;
      clockHour.className = 'clockHour';
      const clockMinute = document.createElement('div');
      clockMinute.id = 'clockMinute';
      clockMinute.style.transform = `rotate(${minute}deg)`;
      clockMinute.className = 'clockMinute';

      // Combine analog wrappers
      clockFace.appendChild(clockHour);
      clockFace.appendChild(clockMinute);

      if (this.config.displaySeconds) {
        const clockSecond = document.createElement('div');
        clockSecond.id = 'clockSecond';
        clockSecond.style.transform = `rotate(${second}deg)`;
        clockSecond.className = 'clockSecond';
        clockSecond.style.backgroundColor = this.config.secondsColor;
        clockFace.appendChild(clockSecond);
      }
      clockCircle.appendChild(clockFace);
    }

    /** *****************************************
     * Combine wrappers, check for .displayType
     */

    if (this.config.displayType === 'digital') {
      // Display only a digital clock
      wrapper.appendChild(dateWrapper);
      wrapper.appendChild(timeWrapper);
      wrapper.appendChild(weekWrapper);
    } else if (this.config.displayType === 'analog') {
      // Display only an analog clock

      if (this.config.showWeek) {
        weekWrapper.style.paddingBottom = '15px';
      } else {
        dateWrapper.style.paddingBottom = '15px';
      }

      if (this.config.analogShowDate === 'top') {
        wrapper.appendChild(dateWrapper);
        wrapper.appendChild(weekWrapper);
        wrapper.appendChild(clockCircle);
      } else if (this.config.analogShowDate === 'bottom') {
        wrapper.appendChild(clockCircle);
        wrapper.appendChild(dateWrapper);
        wrapper.appendChild(weekWrapper);
      } else {
        wrapper.appendChild(clockCircle);
      }
    } else {
      // Both clocks have been configured, check position
      const placement = this.config.analogPlacement;

      analogWrapper = document.createElement('div');
      analogWrapper.id = 'analog';
      analogWrapper.style.cssFloat = 'none';
      analogWrapper.appendChild(clockCircle);
      digitalWrapper = document.createElement('div');
      digitalWrapper.id = 'digital';
      digitalWrapper.style.cssFloat = 'none';
      digitalWrapper.appendChild(dateWrapper);
      digitalWrapper.appendChild(timeWrapper);
      digitalWrapper.appendChild(weekWrapper);

      const appendClocks = function (condition, pos1, pos2) {
        const padding = [0, 0, 0, 0];
        padding[placement === condition ? pos1 : pos2] = '20px';
        analogWrapper.style.padding = padding.join(' ');
        if (placement === condition) {
          wrapper.appendChild(analogWrapper);
          wrapper.appendChild(digitalWrapper);
        } else {
          wrapper.appendChild(digitalWrapper);
          wrapper.appendChild(analogWrapper);
        }
      };

      if (placement === 'left' || placement === 'right') {
        digitalWrapper.style.display = 'inline-block';
        digitalWrapper.style.verticalAlign = 'top';
        analogWrapper.style.display = 'inline-block';

        appendClocks('left', 1, 3);
      } else {
        digitalWrapper.style.textAlign = 'center';

        appendClocks('top', 2, 0);
      }
    }

    // Return the wrapper to the dom.
    return wrapper;
  },

  notificationReceived(notification, payload) {
    switch (notification) {
      case 'NOTIFY_FAKE_HOUR24':
        this.fakeTime.hour24 = payload;
        this.fakeTime.minutes = 0;
        break;
      default:
      // do nothing.
    }
  },
});
