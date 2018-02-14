/* Magic Mirror
 * Node Helper: natural
 *
 * By L.ego
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const natural = require('natural');

module.exports = NodeHelper.create({

	start: function() {
		console.log('Starting node_helper for module [' + this.name + ']');
	},

	socketNotificationReceived: function(notification, payload) {
		switch (notification) {
			case 'CONNECTED':
				console.log('Google Speech Module connected');
				return;
			case 'REQUEST_TOKENIZING':
				this.sendSocketNotification(
					'FINISH_TOKENIZING', 
					this.tokenize(payload.type, payload.text, payload.regexp));
				return;
			case 'REQUEST_STRING_DISTANCE':
				this.sendSocketNotification(
					'FINISH_STRING_DISTANCE', 
					this.stringDistane(payload.type, payload.text1, payload.text2, payload.option));
				return;
			case 'REQUEST_STRING_MATCH':
				this.sendSocketNotification(
					'FINISH_STRING_MATCH', 
					this.stringMatch(payload.text1, payload.text2));
				return;
			case 'REQUEST_STEMMERS':
				this.sendSocketNotification(
					'FINISH_STEMMERS', 
					this.stemmers(payload.langType, payload.text));
				return;
			case 'REQUEST_CLASSIFIERS':
				this.sendSocketNotification(
					'FINISH_CLASSFIERS', 
					this.classifier(payload.documents, payload.text));
				return;
			case 'REQUEST_COMPARE_PHONETICS':
				this.sendSocketNotification(
					'FINISH_COMPARE_PHONETICS', 
					this.comparePhonetics(payload.text1, payload.text2));
				return;
			case 'REQUEST_ROW_PHONETICS':
				this.sendSocketNotification(
					'FINISH_ROW_PHONETICS', 
					this.rowPhonetics(payload.text, payload.length));
				return;
			default:
				return;
		}
	},

	/**
	 * Word, Regexp, and Treebank tokenizers are provided for breaking text up into arrays of tokens.
	 * @param {string} tokenizationType one of [Word, TreebanWord, Regexp, WordPunct]
	 * @param {strng} text sentence to be tokenized
	 * @param {Object} [regexp] regular expresstion when using the tokenizaion type 'Regexp'
	 * @returns {string[]} arrays of tokens
	 */
	tokenize: function(tokenizationType, text, regexp) {
		var tokenizer;
		switch (tokenizationType) {
			case 'Word':
				tokenizer = new natural.WordTokenizer();
				break;
			case 'TreebanWord':
				tokenizer = new natural.TreebankWordTokenizer();
				break;
			case 'Regexp':
				tokenizer = new natural.RegexpTokenizer(option.regexp);
				break;
			case 'WordPunct':
				tokenizer = new natural.WordPunctTokenizer();
				break;
			default:
				throw 'Unknown tokenization type: ' + tokenizationType;
		}
		return tokenizer.tokenize(text);
	},

	/** 
	 * Natural provides an implementation of the Jaro–Winkler string distance measuring algorithm.
	 * @param {string} distanceType one of [JaroWinkler, Levenshtein, DamerauLevenshtein, DiceCoefficient]
	 * @param {string} text1 sentence to calculate distance
	 * @param {string} text2 sentence to calculate distance
	 * @param {string} [option] option according to distance type.
	 * 						  Levenshtein: insertion_cost, deletion_cost, substitution_cost
	 * 						  DamerauLevenshtein: transposition_cost, restricted
	 * @returns {number} a number between 0 and 1 which tells how closely the strings match (0 = not at all, 1 = exact match)
	 */
	stringDistane: function(distanceType, text1, text2, option) {
		switch (distanceType) {
			case 'JaroWinkler':
				return natural.JaroWinklerDistance(text1, text2);
			case 'Levenshtein':
				return natural.LevenshteinDistance(text1, text2, {
					insertion_cost: option.insertion_cost | 1,
					deletion_cost: option.deletion_cost | 1,
					substitution_cost: option.substitution_cost | 1
				});
			case 'DamerauLevenshtein':
				return natural.DamerauLevenshteinDistance(text1, text2, {
					transposition_cost: option.transposition_cost | 1,
					restricted: option.restricted | true
				});
			case 'DiceCoefficient':
				return natural.DiceCoefficient(text1, text2);
			default:
				throw 'Unknown distance type: ' + tokenizeType;
		}
	},

	/**
	 * Currently matching is supported via the Levenshtein algorithm.
	 * @param {string} text1 sentence to match
	 * @param {string} text2 sentence to match
	 * @returns {Object} object of substring and distance
	 */
	stringMatch: function(text1, text2) {
		return natural.LevenshteinDistance(text1, text2, { search: true });
	},

	/**
	 * Currently stemming is supported via the Porter and Lancaster (Paice/Husk) algorithms.
	 * @param {string} [langType] One of [Es, Fa, Fr, It, No, Pt, Ru]
	 * @param {string} text sentence to stem
	 * @returns {string[]} array of stemmed tokens.
	 */
	stemmers: function(langType, text) {
		switch (langType) {
			case 'Es':
				natural.PorterStemmerEs.attach();
				break;
			case 'Fa':
				natural.PorterStemmerFa.attach();
				break;
			case 'Fr':
				natural.PorterStemmerFr.attach();
				break;
			case 'It':
				natural.PorterStemmerIt.attach();
				break;
			case 'No':
				natural.PorterStemmerNo.attach();
				break;
			case 'Pt':
				natural.PorterStemmerPt.attach();
				break;
			case 'Ru':
				natural.PorterStemmerRu.attach();
				break;
			default:
				natural.PorterStemmer.attach();
				break;
		}
		return text.tokenizeAndStem();
		
	},

	/**
	 * Two classifiers are currently supported, Naive Bayes and logistic regression.
	 * You can train the classifier on sample text. It will use reasonable defaults to tokenize and stem the text.
	 * @param {Object[]} documents sample sentence and label for training.
	 * @param {string} text sentence to classify
	 * @returns {Object[]} array of objects with labels and values.
	 */
	classifier: function(documents, text) {
		const classifier = new natural.BayesClassifier();
		for (index in documents) {
			const document = documents[index];
			classifier.addDocument(document.sentence, document.label);
		}
		classifier.train();
		return classifier.getClassifications(text);
	},

	/**
	 * Phonetic matching (sounds-like) matching can be done with the Metaphone.
	 * @param {string} text1 sentence to compare
	 * @param {string} text2 sentence to compare
	 * @returns {boolean} if they sound alike, return true
	 */
	comparePhonetics: function(text1, text2) {
		const metaphone = natural.Metaphone;
		return metaphone.compare(text1, text2);
	},

	/**
	 * The raw phonetics are obtained.
	 * @param {string} text sentence to get row phonetics
	 * @param {number} [length] maximum code length
	 * @returns {string} raw phonetics
	 */
	rowPhonetics: function(text, length) {
		const metaphone = natural.Metaphone;
		return length ? metaphone.process(text, length) : metaphone.process(text);
	}
});
