/* global Module */

/* Magic Mirror
 * Module: natural
 *
 * By L.ego
 * MIT Licensed.
 */

Module.register("natural", {

	requiresVersion: "2.1.0", // Required version of MagicMirror

	resultText: "입력된 텍스트가 없습니다.",

	start: function() {
	},

	getDom: function() {
		const wrapper = document.createElement("div");
		const label = document.createElement("label");
		label.innerText = this.resultText;
		wrapper.appendChild(label);
		return wrapper;
	},

	testNotification: function(notification) {
		let payload;
		switch(notification) {
			case 'REQUEST_TOKENIZING':
				payload = {
					type: 'Word',
					text: 'your dog has fleas.'	
				};
				break;
			case 'REQUEST_STRING_DISTANCE':
				payload = {
					type: 'JaroWinkler',
					text1: 'dixonabccdafe',
					text2: 'ditonafefads'
				};
				break;
			case 'REQUEST_STRING_MATCH':
				payload = {
					text1: 'The RainCoat BookStore',
					text2: 'All the best books are here at the Rain Coats Book Store',
				}
				break;
			case 'REQUEST_STEMMERS':
				payload = {
					text: 'i am waking up to the sounds of chainsaws',
				}
				break;
			case 'REQUEST_CLASSIFIERS':
				payload = {
					documents: [
						{ sentence: 'i am long qqqq', label: 'buy' },
						{ sentence: 'buy the q\'s', label: 'buy' },
						{ sentence: 'short gold', label: 'sell' },
						{ sentence: 'sell gold', label: 'sell' },
					],
					text: 'i am short silver'
				}
				break;
			case 'REQUEST_COMPARE_PHONETICS':
				payload = {
					text1: 'phonetics',
					text2: 'fonetix'
				}
				break;
			case 'REQUEST_ROW_PHONETICS':
				payload = {
					text: 'phonetics'
				}
				break;
			default:
				return;
		}
		this.sendSocketNotification(notification, payload);
	},

	socketNotificationReceived: function (notification, payload) {
		switch(notification) {
			case 'FINISH_TOKENIZING':
			case 'FINISH_STRING_DISTANCE':
			case 'FINISH_STRING_MATCH':
			case 'FINISH_STEMMERS':
			case 'FINISH_CLASSFIERS':
			case 'FINISH_COMPARE_PHONETICS':
			case 'FINISH_ROW_PHONETICS':
			console.log(payload);
				this.resultText = payload;
				this.updateDom();
				this.sendNotification(notification, payload, 'natural');
			default:
				break;
		}
	},

	notificationReceived: function(notification, payload, sender) {
		switch(notification) {
			case 'REQUEST_TOKENIZING':
			case 'REQUEST_STRING_DISTANCE':
			case 'REQUEST_STRING_MATCH':
			case 'REQUEST_STEMMERS':
			case 'REQUEST_CLASSIFIERS':
			case 'REQUEST_COMPARE_PHONETICS':
			case 'REQUEST_ROW_PHONETICS':
				this.sendSocketNotification(notification, payload);
			default:
				return;
		}
	},
});
