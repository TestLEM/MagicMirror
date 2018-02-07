/* Magic Mirror
 * Module: MMM-WWI
 * Weather Without Icons
 * By Mykle1 - [Powered by Dark Sky](https://darksky.net/poweredby/)
 * MIT Licensed
 */
Module.register("MMM-WWI", {

    // Module config defaults.
    defaults: {
		apiKey: "",                               // Get FREE API key from https://darksky.net
        lat: "",                                  // latitude
        lng: "",                                  // longitude
		pix: "1",                                 // 1-13
		tempUnits: "C",		                      // C or F 
        useHeader: false,                         // true if you want a header      
        header: "Weather Without Icons",          // Any text you want. useHeader must be true
        maxWidth: "300px",
        animationSpeed: 3000,
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 2 * 60 * 1000,           // 2 minutes is the least you can use for free

    },

    getStyles: function() {
        return ["MMM-WWI.css"];
    },

    getScripts: function() {
        return ["moment.js"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        requiresVersion: "2.1.0",

        //  Set locale.
        this.url = "https://api.darksky.net/forecast/" + this.config.apiKey + "/" + this.config.lat + "," + this.config.lng;
        this.WWI = {};
        this.scheduleUpdate();
    },

    getDom: function() {
		
		
		function to_celcius (t) {
		 	return (t - 32) * 5 / 9;              // convert celcius to fahrenheit
		 }

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.innerHTML = "Not that WWI!";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "light");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }

        var WWI = this.WWI;
		var apiKey = this.config.apiKey;
        var lat = this.config.lat; // latitude
        var lng = this.config.lng; // longitude
		var pix = this.config.pix; // 1-13


        var top = document.createElement("div");
        top.classList.add("list-row");
		
		
		
////////// alerts sre not always in the data /////////////////////////////////
////////// but I want them when they are. How? //////////////////////////////
    //    Alert object does not always appear in data ////////////////////////////////////
		// Can it be done? How do I do it?
		
		// this isn't working. console reports undefined
		// type of warning
    //    var type = document.createElement("div");
    //    type.classList.add("xsmall", "bright", "type");
	//	if (WWI.alerts[0].title != undefined){
	//		type.innerHTML = WWI.alerts[0].title + "!";
	//	}
	//	wrapper.appendChild(type);
	
	
		// summary of weather at this moment
        var summary = document.createElement("div");
        summary.classList.add("small", "bright", "summary");
		
	if (this.config.tempUnits != "F") {
			summary.innerHTML = WWI.currently.summary + " and " + Math.round(to_celcius(WWI.currently.temperature)) + "°C at " + moment(WWI.time).local().format("h:mm A");
			wrapper.appendChild(summary);
		} else {
			summary.innerHTML = WWI.currently.summary + " and " + Math.round(WWI.currently.temperature) + "°F at " + moment(WWI.time).local().format("h:mm A");
			wrapper.appendChild(summary);
		}
		
		
		// summary prediction of weather for coming week
        var summary = document.createElement("div");
        summary.classList.add("small", "bright", "summary");
        summary.innerHTML = WWI.minutely.summary;
        wrapper.appendChild(summary);
		
	
		// How can I rotate the pictures during update interval?
	    // Choose a picture in config 1-13
        var pic = document.createElement("div");
        var img = document.createElement("img");
        img.classList.add("photo");
	if (this.config.pix != ""){
		img.src = "modules/MMM-WWI/pix/" + this.config.pix + ".jpg";
		}
        pic.appendChild(img);
        wrapper.appendChild(pic);
		
		
		// weekly summary
        var summary = document.createElement("div");
        summary.classList.add("xsmall", "bright", "summary");
        summary.innerHTML = WWI.daily.summary;
        wrapper.appendChild(summary);
		
		
		// heat index/wind chill (hard code temp color)
        var temperature = document.createElement("div");
        temperature.classList.add("xsmall", "bright", "chill");
	if (this.config.tempUnits != "F") {
			temperature.innerHTML = "Heat index/Wind chill = " +  Math.round(to_celcius(WWI.currently.apparentTemperature)) + "°C at " + moment(WWI.time).local().format("h:mm A");
			wrapper.appendChild(temperature);
	} else {
			temperature.innerHTML = "Heat index/Wind chill = " +  Math.round(WWI.currently.apparentTemperature) + "°F";
			wrapper.appendChild(temperature); 
		}
		
		
		// ozone at this moment
        var ozone = document.createElement("div");
        ozone.classList.add("xsmall", "bright", "ozone");
        ozone.innerHTML = "Ground-Level Ozone is " + Math.round(WWI.currently.ozone);
        wrapper.appendChild(ozone);
		
		
		// distance of storm weather at this moment
        var distance = document.createElement("div");
        distance.classList.add("xsmall", "bright", "StormDistance");
		if (WWI.currently.nearestStormDistance == 0){
			distance.innerHTML = "";
			wrapper.appendChild(distance);
		} else
        distance.innerHTML = "A storm is " + WWI.currently.nearestStormDistance + " miles away!"; // can I put icon here too?
        wrapper.appendChild(distance);
		
		
		// nearestStormBearing at this moment
        var nearestStormBearing = document.createElement("div");
        nearestStormBearing.classList.add("xsmall", "bright", "StormBearing");
		if (WWI.currently.nearestStormBearin == 0){
			distance.innerHTML = "";
			wrapper.appendChild(nearestStormBearing);
		} else
        nearestStormBearing.innerHTML = "Storm bearing is " + WWI.currently.nearestStormBearing + "°";
        wrapper.appendChild(nearestStormBearing);
		
		
		// windSpeed at this moment
        var windSpeed = document.createElement("div");
        windSpeed.classList.add("xsmall", "bright", "windSpeed");
        windSpeed.innerHTML = "Wind speed is " + Math.round(WWI.currently.windSpeed) + " mph";
        wrapper.appendChild(windSpeed);
		
		
		// windGust at this moment
        var windGust = document.createElement("div");
        windGust.classList.add("xsmall", "bright", "windGust");
        windGust.innerHTML = "Wind gusts to " + Math.round(WWI.currently.windGust) + " mph";
        wrapper.appendChild(windGust);
		
		
		
		// windBearing at this moment
        var windBearing = document.createElement("div");
        windBearing.classList.add("xsmall", "bright", "windBearing");
        windBearing.innerHTML = "Wind bearing is " + WWI.currently.windBearing + "°";
        wrapper.appendChild(windBearing);
		
		
		// visibility at this moment
        var visibility = document.createElement("div");
        visibility.classList.add("xsmall", "bright", "visibility");
        visibility.innerHTML = "Visibility is " + WWI.currently.visibility + " miles";
        wrapper.appendChild(visibility);
		
		
		// cloudCover at this moment
        var cloudCover = document.createElement("div");
        cloudCover.classList.add("xsmall", "bright", "cloudCover");
        cloudCover.innerHTML = "Cloud cover is " + WWI.currently.cloudCover + "%";
        wrapper.appendChild(cloudCover);
		
		
		// pressure at this moment
        var pressure = document.createElement("div");
        pressure.classList.add("xsmall", "bright", "pressure");
        pressure.innerHTML = "Barometer = " + Math.round(WWI.currently.pressure) + " mb";
        wrapper.appendChild(pressure);
		
		
		// humidity at this moment
        var humidity = document.createElement("div");
        humidity.classList.add("xsmall", "bright", "humidity");
        humidity.innerHTML = "Humidity is " + WWI.currently.humidity + "%";
        wrapper.appendChild(humidity);
		
		
		// dewPoint at this moment
        var dewPoint = document.createElement("div");
        dewPoint.classList.add("xsmall", "bright", "dewPoint");
	if (this.config.tempUnits != "F") {
			dewPoint.innerHTML = "Dew point is " + Math.round(to_celcius(WWI.currently.dewPoint)) + "°C";
			wrapper.appendChild(dewPoint);
	} else {
			dewPoint.innerHTML = "Dew point is " + Math.round(WWI.currently.dewPoint) + "°F";
			wrapper.appendChild(dewPoint);
		}
		
		
		// trying icons for the fun of it // WORKING! //
	//	var tryLogo = document.createElement("div");
    //    var tryIcon = document.createElement("img");
    //    tryIcon.classList.add("icon");
    //    tryIcon.src = "modules/MMM-WWI/icons/clear.png";
    //    tryLogo.appendChild(tryIcon);
    //    wrapper.appendChild(tryLogo);
		
		
		// uvIndex at this moment
        var uvIndex = document.createElement("div");
        uvIndex.classList.add("xsmall", "bright", "uvIndex");
        uvIndex.innerHTML = "UV Index is " + WWI.currently.uvIndex;
        wrapper.appendChild(uvIndex);
	
        return wrapper;
		
    },
	

    processWWI: function(data) {
        this.today = data.Today;
        this.WWI = data;
        this.loaded = true;
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getWWI();
        }, this.config.updateInterval);
        this.getWWI(this.config.initialLoadDelay);
    },

    getWWI: function() {
        this.sendSocketNotification('GET_WWI', this.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "WWI_RESULT") {
            this.processWWI(payload);

            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});