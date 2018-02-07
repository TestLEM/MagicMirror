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
		// Display the title of the source.
		showSourceTitle: true,
		// Display the publish date of an headline.
		showPublishDate: true,
		// Display the description of an item.
		showDescription: true,
		// Wrap the title of the item to multiple lines.
		wrapTitle: true,
		// Wrap the description of the item to multiple lines.
		wrapDescription: true,
		// Truncate description?
		truncDescription: true,
		// How many characters to be displayed for a truncated description?
		// Possible values: 1 - 500
		lengthDescription: 500,
		// Hide module instead of showing LOADING status.
		hideLoading: false,
		// How often does the content needs to be fetched? (Milliseconds)
		// Possible values: 1000 - 86400000
		reloadInterval: 300000, // 5 minutes
		// How often do you want to display a new headline? (Milliseconds)
		// Possible values:1000 - 60000
		updateInterval: 10000, // 10 seconds
		// Speed of the update animation. (Milliseconds)
		// Possible values:0 - 5000
		animationSpeed: 2500, // 2.5 seconds
		// Total amount of news items to cycle through. (0 for unlimited)
		// Possible values:0 - ...
		maxNewsItems: 0,
		// Ignore news items that are outdated.
		ignoreOldItems: false,
		// How old should news items be before they are considered outdated? (Milliseconds)
		// Possible values:1 - ...
		ignoreOlderThan: 86400000, // 1 day
		//
		// Some newsfeeds feature tags at the beginning of their titles or descriptions, such as [VIDEO]. This setting allows for the removal of specified tags from the beginning of an item's description and/or title.
		// Possible values:'title', 'description', 'both'
		// removeStartTags: value,
		//
		// List the tags you would like to have removed at the beginning of the feed item
		// Possible values: ['TAG'] or ['TAG1','TAG2',...]
		// startTags: value,
		//
		// Remove specified tags from the end of an item's description and/or title.
		// Possible values:'title', 'description', 'both'
		// removeEndTags: value,
		//
		// List the tags you would like to have removed at the end of the feed item
		// Possible values: ['TAG'] or ['TAG1','TAG2',...]
		// endTags: value,
		//
		// Remove news feed item if one of these words is found anywhere in the title (case insensitive and greedy matching)
		// Possible values: ['word'] or ['word1','word2',...]
		// prohibitedWords: value,
	}
},