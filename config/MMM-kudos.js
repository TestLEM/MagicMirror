{
  module: 'MMM-kudos',
  position: "middle_center",
  config: {
    // A map which defines the start hours of kudos sets.
    hourmap: {
       5: "morning",
      11: "lunch",
      15: "afternoon",
      19: "evening",
      23: "night",
    },
    // Length of kudo at which a smaller font is used to display it.
    shrinkLimit: 35,
    // Optional CSS classes used to display the kudo.
    // classes:
    // Optional CSS classes used to shrink the kudo.
    // shrinkClasses:
    // The list of kudos.
    kudos: {
      anytime: [
        "Und jetzt einen Kaffee!",
        "Dem Kühnen lächeln die Götter zu!",
        "Herkules war auch mal schwach.",
      ],
      morning: [
        "Guten Morgen, Sonnenschein!",
        "Genieße den Tag",
        "Gut geschlafen?",
        "Der frühe Vogel ...",
      ],
      lunch: [
        "Mahlzeit!",
        "Gibt's was zu Essen?",
        "Wer kocht heute?",
        "Mittagsschlaf?",
      ],
      afternoon: [
        "Wow, sexy!",
        "Du siehst gut aus!",
        "Heute ist Dein Tag!",
        "Schon Feierabend?",
      ],
      evening: [
        "Eine Augenweide!",
        "Bettzeit?",
        "Was für ein Tag ...",
        "Es ist ein Genuß dich zu sehen!",
        "Wie war dein Tag?",
        "Meine Augen befinden sich bereits im Zustand seeliger Vorfreude!",
      ],
      night: [
        "Noch nicht müde?",
        "Nu aber ab ins Bett!",
        "Wird wohl wieder spät heute?",
        "Schlaf schön!",
        "Kannst du nicht schlafen?",
      ]
    },
    // How often does the kudo have to change? (Milliseconds)
    // Possible values: 1000 - 86400000
    updateInterval: 30000,
    // External file from which to load the kudos
    // Possible values: Path to a JSON file containing kudos, configured as per the value of the kudos configuration (see below).
    remoteFile: null,
    // Speed of the update animation. (Milliseconds)
    // Possible values:0 - 5000
    fadeSpeed: 4000
 }
},
