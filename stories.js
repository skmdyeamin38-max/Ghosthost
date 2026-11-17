(function () {
  "use strict";

  var OPENINGS = {
    hostel: [
      "It was {time} at {place}. {name} was alone in the room, revising for an exam, while the rest of the floor slept.",
      "At {time}, the whole of {place} had gone quiet. {name} sat up late, waiting for the Wi-Fi to come back.",
      "{name} had been warned never to stay up past {time} at {place}. Tonight, a late assignment made that impossible.",
      "The power cut came at {time}, and {place} sank into darkness. {name} lit a phone torch and stayed seated.",
      "Everyone at {place} had left for the weekend except {name}. At {time}, the empty rooms felt louder than ever."
    ],
    college: [
      "It was {time} at {place}, long after the last bell. {name} had stayed back to finish a lab record.",
      "{name} lost a notebook at {place} and went back for it at {time}, when no one else was left.",
      "The guard at {place} locked the gate at {time}, not knowing {name} was still inside.",
      "Exams were close, so {name} studied alone at {place} until {time}, surrounded by empty benches.",
      "At {time}, the corridors of {place} were silent. {name} waited for a late bus that never came."
    ],
    village: [
      "It was {time} near {place}. {name} was walking home from the market on a road with no lights.",
      "The elders of {place} never spoke about the night road. At {time}, {name} took it anyway.",
      "{name} stayed late at {place} to fix a broken lamp. By {time}, the whole village was asleep.",
      "Under a starless sky at {place}, {name} watched the fields at {time} and heard something walking in the crops.",
      "A lost goat led {name} away from {place} at {time}, deeper into the dark than anyone should go."
    ],
    home: [
      "It was {time} at {place}. {name} was home alone, watching a movie with the volume low.",
      "{name} was cleaning up late in {place} when the clock showed {time}.",
      "Everyone in {place} was asleep by {time}, except {name}, who could not stop thinking about a strange sound.",
      "{name} was playing a game alone at {place} when the clock struck {time} and the house went cold.",
      "The family had gone out, leaving {name} alone at {place} until {time}."
    ],
    other: [
      "It was {time} at {place}. {name} was waiting for a friend who was already very late.",
      "{name} took a shortcut through {place} at {time}, ignoring the strange silence.",
      "At {time}, {name} reached {place} and found it completely empty, though the lights were still on.",
      "A message from an unknown number sent {name} to {place} at {time}.",
      "Looking for a place to rest, {name} entered {place} at {time}, where nothing had changed in years."
    ]
  };

  var SCREEN_MESSAGES = [
    "{name}, why are you still awake?",
    "{name}, we have been waiting for you.",
    "{name}, don't turn around.",
    "{name}, you should not be at {place}.",
    "Welcome back, {name}. We kept your seat.",
    "{name}, count the footsteps.",
    "It is {time}, {name}. They are coming.",
    "{name}, look behind the door.",
    "Did you really think you were alone, {name}?",
    "{name}, your turn is next."
  ];

  var MIDDLES = {
    mild: [
      "Somewhere near {spot}, a door creaked softly. Probably just the wind, {name} told themselves.",
      "A faint cold breeze passed by, carrying the smell of old flowers. {name} shivered and kept still.",
      "A soft tapping came from {spot}, like fingers on wood. It stopped whenever {name} listened closely.",
      "The lights dimmed for a moment, and {name} thought they saw a pale shape near {spot}. It was probably a trick of the eye.",
      "A faint whisper drifted from {spot}. It was too quiet to understand, but it sounded like {name}'s name.",
      "The air grew a little colder, and a curtain moved though no window was open at {place}.",
      "Far away, someone laughed softly. {name} looked toward {spot}, but nobody was there.",
      "A clock somewhere began ticking again after years of silence. {name} counted each tick.",
      "Something small rolled across the floor and stopped at {name}'s feet. Nothing had been dropped.",
      "The smell of rain and old dust filled the air, though it had been dry all week at {place}."
    ],
    scary: [
      "Footsteps echoed from {spot}, slow and heavy. They stopped right outside, and the air turned ice cold.",
      "A shadow crawled across the wall near {spot}, even though nothing was there to cast it.",
      "The doors at {place} began to open and close on their own, one by one, moving closer to {name}.",
      "A cold hand of fog slid out from {spot} and curled around {name}'s ankles, then slowly pulled back.",
      "A voice from {spot} began to hum a tune {name} knew from childhood, though {name} had never told anyone.",
      "Every light went out at once. In the dark, {name} could hear slow breathing right behind them.",
      "The phone buzzed with a message from {name}'s own number: \"I'm already inside.\"",
      "Scratches started on the wall near {spot}, slowly spelling out {name}'s name.",
      "A pale figure stood very still at the end of {spot}, facing the wall, and {name} could not tell how long it had been there.",
      "The whole room shook once, and from {spot} came the sound of something heavy being dragged toward {name}."
    ],
    extreme: [
      "Every door at {place} locked itself at once. The footsteps came from inside the walls, and a whisper repeated {name}'s name in {name}'s own voice.",
      "The temperature dropped, the mirror fogged over, and a long wet handprint slid slowly down the glass near {spot}.",
      "Hundreds of whispers filled {place} at the same time, all saying {name}'s name, all coming closer.",
      "The floor near {spot} began to ripple like dark water, and pale hands pressed up from beneath it, reaching for {name}.",
      "Every clock stopped at {time}. In the silence, something with {name}'s face looked out from {spot}, smiling too wide.",
      "The walls of {place} began to breathe, slowly in and out, and the shadows leaned toward {name}.",
      "A hundred pale faces appeared in the windows, all staring at {name}, all silent, none blinking.",
      "The lights burned red, and from {spot} a tall figure unfolded itself, taller than the ceiling should allow.",
      "A cold voice spoke from every corner: \"{name}, you were never supposed to find {place}.\"",
      "Chains rattled in {spot}, getting louder, while the whole of {place} shook as if it wanted to wake up."
    ]
  };

  var TRANSITIONS = [
    "Then everything went silent. {name} had one choice to make.",
    "The sound stopped. {name} knew the next move had to be decided right now.",
    "In the sudden stillness, {name} heard their own heartbeat and understood there were only three options.",
    "The silence was worse than the noise. {name} had to choose, and quickly.",
    "Something waited just beyond the dark. {name} could run, stay still, or answer.",
    "Time seemed to stop at {place}. {name} knew whatever happened next was up to them.",
    "The air held its breath, and so did {name}. It was time to decide.",
    "A single candle flame appeared and trembled. {name} had one moment to make a choice.",
    "The whisper paused as if it were waiting for {name}'s answer.",
    "The door to {spot} slowly opened an inch. {name} had to decide what to do next.",
    "The lights steadied, but nothing felt safe. {name} had seconds to choose.",
    "Everything stopped, even the wind. {name} felt the darkness waiting for a decision.",
    "A cold calm settled over {place}. {name} knew this was the moment to act.",
    "The ghost, or whatever it was, stepped closer and waited. {name} had to choose.",
    "Quiet fell like a curtain. {name} had a choice to make, and no time to make it."
  ];

  var ENDINGS = [
    {
      label: "Run",
      texts: [
        "{name} ran for the exit and never looked back. At sunrise the doors opened by themselves, but {name}'s shadow stayed behind at {place}, smiling.",
        "{name} burst through the door and kept running until the first light. Behind them, {place} stood empty, and one window waved like a hand.",
        "{name} ran so fast that the footsteps behind faded away. By morning {name} was safe, but every mirror afterwards showed one extra person standing behind.",
        "Without a word, {name} sprinted into the night. The whispers stopped at the gate of {place}, as if they were not allowed to follow.",
        "{name} ran and ran, and when the sun rose, the road led straight back to {place}. It was {time} again.",
        "{name} escaped and told everyone. Nobody believed it, until they checked {place} and found muddy footprints leading inside, but none coming out.",
        "{name} fled down the stairs three at a time. The next day, {place} looked completely normal, except for {name}'s name carved on the door.",
        "{name} ran out into the cold air and finally breathed. Far behind, a soft voice said, \"See you tomorrow.\"",
        "{name} reached home and locked every door. Only later did {name} notice a cold handprint on the inside of the window.",
        "{name} ran past the gate of {place} and the lights went out behind them. Since that night, {name} never goes anywhere alone after {time}."
      ]
    },
    {
      label: "Stay",
      texts: [
        "{name} stayed perfectly still. The footsteps passed by and morning came. On the wall, a new handprint was drying, shaped exactly like {name}'s.",
        "{name} closed both eyes and stayed silent. After a long time the cold lifted, and when {name} looked up, every chair at {place} had turned to face the corner.",
        "{name} sat quietly and waited. At dawn, a soft voice said, \"Thank you for listening,\" and the room was warm again.",
        "{name} held their breath until the sounds faded. In the morning, a note lay on the floor of {place}: \"Good choice.\"",
        "{name} refused to move. The shadow stood over them all night, and at sunrise it bowed once and vanished.",
        "{name} stayed in place and counted to a hundred. When the count ended, {place} was silent, but the clock still showed {time}.",
        "{name} sat very still, and the presence slowly sat down beside them. Neither moved until morning, and then only one of them left.",
        "{name} stayed put, and the lights returned. Everything looked normal, except every photo at {place} now had an extra face in the background.",
        "{name} did not move even when something touched their shoulder. It tapped twice, then went away, and the cold went with it.",
        "{name} stayed seated until the birds started singing. Only then did {name} notice how long the shadow on the wall had been waiting too."
      ]
    },
    {
      label: "Answer",
      texts: [
        "{name} whispered back: \"Who is there?\" The voice laughed softly and said, \"Your turn to stay outside tonight.\"",
        "\"What do you want?\" {name} asked. The voice answered, \"Just someone to tell my story.\" And so {name} listened until dawn.",
        "{name} answered, and the whole room sighed as if it had waited a hundred years. From then on, {place} was a little less cold.",
        "\"I'm here,\" {name} said. Every light came back on, and a thousand whispers said, \"Finally.\"",
        "{name} replied politely, and the voice replied politely back. They talked until sunrise, and {name} left with a strange new friend.",
        "{name} shouted back: \"Leave me alone!\" The ghost went quiet, then said sadly, \"That is what everyone says.\"",
        "{name} said \"Hello,\" and the voice said, \"Hello, {name}. We have a lot to talk about.\" The night was very long.",
        "\"Who are you?\" {name} asked. The reply came from right behind: \"I am whoever sits in your chair at {time}.\"",
        "{name} answered the call, and the doors of {place} all opened at once, as if inviting {name} to stay forever.",
        "{name} asked the ghost its name. It thought for a long time, then wrote it in the dust: {name}'s own name, in older handwriting."
      ]
    }
  ];

  var SPOTS = {
    hostel:  ["the long corridor", "the warden's locked gate", "the dark stairwell", "the water tank room"],
    college: ["the empty lab", "the library stacks", "the dark classroom", "the old staircase"],
    village: ["the old well", "the banyan tree", "the empty fields", "the broken bridge"],
    home:    ["the attic", "the staircase", "the locked store room", "the balcony"],
    other:   ["the hallway", "the cellar door", "the basement", "the empty road"]
  };

  var TIMES = ["3:30 AM", "midnight", "2:13 AM", "1:07 AM", "3:03 AM"];

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function placeKind(place) {
    var p = place.toLowerCase();
    if (/hostel|dorm|\bpg\b|mess/.test(p)) return "hostel";
    if (/college|school|class|campus|university|lab|library/.test(p)) return "college";
    if (/village|farm|forest|wood|jungle|river|field/.test(p)) return "village";
    if (/home|house|flat|apartment|room/.test(p)) return "home";
    return "other";
  }

  function fill(text, vars) {
    return text.replace(/\{(name|place|spot|time)\}/g, function (match, key) {
      return vars[key];
    });
  }

  function countTemplates() {
    var total = SCREEN_MESSAGES.length + TRANSITIONS.length;
    Object.keys(OPENINGS).forEach(function (k) { total += OPENINGS[k].length; });
    Object.keys(MIDDLES).forEach(function (k) { total += MIDDLES[k].length; });
    ENDINGS.forEach(function (e) { total += e.texts.length; });
    return total;
  }

  function build(name, place, fear) {
    var kind = placeKind(place);
    var level = MIDDLES[fear] ? fear : "scary";
    var vars = {
      name: name,
      place: place,
      spot: pick(SPOTS[kind]),
      time: pick(TIMES)
    };
    var shortPlace = place.split(",")[0].trim();

    var paragraphs = [
      fill(pick(OPENINGS[kind]), vars),
      "Suddenly the lights flickered. The screen glowed and showed: \"" + fill(pick(SCREEN_MESSAGES), vars) + "\"",
      fill(pick(MIDDLES[level]), vars),
      fill(pick(TRANSITIONS), vars)
    ];

    var endings = ENDINGS.map(function (e) {
      return { label: e.label, text: fill(pick(e.texts), vars) };
    });

    return {
      title: "The Night " + name + " Stayed at " + shortPlace,
      paragraphs: paragraphs,
      endings: endings
    };
  }

  window.GhostStories = { build: build, count: countTemplates() };
})();