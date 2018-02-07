/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "localhost", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "", "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out, is "localhost"
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	language: "en",
	timeFormat: 24,
	units: "metric",
	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "US Holidays",
			position: "top_left",
			config: {
				calendars: [
					{
						symbol: "calendar-check-o ",
						url: "webcal://www.calendarlabs.com/templates/ical/US-Holidays.ics"
					}
				]
			}
		},
		{
			module: "compliments",
			position: "lower_third"
		},
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "Seoul",
				locationID: "1835848",
				appid: "270367c3265f92394c0d5e8d810ae9d2",
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				location: "Seoul",
				locationID: "1835848",
				appid: "270367c3265f92394c0d5e8d810ae9d2",
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "JTBC News",
						url: "http://fs.jtbc.joins.com//RSS/newsflash.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true
			}
		},
		{
			module: 'MMM-ImageSlideshow',
			position: 'bottom_left',
			config: {
				// Array value containing strings. Each string should be a path to a directory where image files can be found.
				imagePaths: ['modules/MMM-ImageSlideshow/exampleImages'],
				// Integer value, the length of time to show one image before switching to the next, in milliseconds.
				slideshowSpeed: 10000,
				//Integer value, sets a fixed pixel width for all the images to be shown. If set to 0, the image's actual width is used.
				fixedImageWidth: 0,
				// Integer value, sets a fixed pixel height for all the images to be shown. If set to 0, the image's actual height is used.
				fixedImageHeight: 0,
				// if true will randomize the order of the images, if false will use an alphabetical sorting by filename.
				randomizeImageOrder: false,
				// if true will treat all the paths specified in imagePaths as one path. Otherwise, if false, images will only be shown from one path at a time in the order of imagePaths, until all the images in that path are exhausted, before continuing to the next path.
				treatAllPathsAsOne: false,
				// if true images will be rendered in grayscale (i.e black and white) instead of color. If false they will be rendered as just they are without change.
				makeImagesGrayscale: false,
				// A list of image file extensions, seperated by commas, that should be included. Files found without one of the extensions will be ignored.
				validImageFileExtensions: 'bmp,jpg,gif,png'
			}
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
