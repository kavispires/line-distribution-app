// Global variables
const COLOR_BANK = {
  ALL: 'col000000',
};
let latestUnitId = null;
let errors = [];

let lastSingers = [];
let lastColors = [];
let lastSubsingers = [];
let lastSubColors = [];
let lastChoirSingers = [];
let lastChoirColors = [];
let wasLastLineEmpty = false;
let lastLineHadSubSingers = false;
let lastLineHadChoirSings = false;

let uses = {};

const updateUses = entry => {
  function addEntry(name) {
    if (uses[name]) {
      uses[name]++;
    } else {
      uses[name] = 1;
    }
  }

  if (typeof entry === 'string') {
    addEntry(entry.trim().toUpperCase());
  } else if (Array.isArray(entry)) {
    entry.forEach(n => addEntry(n.trim().toUpperCase()));
  }
};

class Part {
  constructor() {
    this.singers = null; // type: array
    this.subSingers = null; // type: array
    this.line = []; // type: array
    this.adlib = []; // type: array
    /**
     * adlib code reference
     * 0: regular line colored
     * 1: surrounded by parenthesis colored
     * 2: italic greyed surrouneded by parenthesis
     * 3: italic greyed
     * 4: italic colored
     */
    this.colors = null; // type: array
    this.subColors = null; // type: array
    this.omit = false; // type: bool
    this.omitSub = false; // type: bool
  }
}

const cleanUpPart = part => {
  if (lastSubsingers.length) lastLineHadSubSingers = true;
  if (lastChoirSingers.length) lastLineHadChoirSings = true;

  // Keep singer state when not preceeded by an empty line
  if (part.adlib.includes(0)) {
    if (!part.singers && wasLastLineEmpty) {
      part.adlib = part.adlib.map(() => 3);
    } else if (!part.singers) {
      updateUses(lastSingers);
      part.singers = [...lastSingers];
      part.colors = [...lastColors];
      part.omit = true;
    }
  }

  // Keep subSinger state when not preceeded by an empty line
  if (part.adlib.includes(1)) {
    if (!part.subSingers && (wasLastLineEmpty || !lastLineHadSubSingers)) {
      part.adlib = part.adlib.map(a => (a === 1 ? 2 : a));
    } else if (!part.subSingers) {
      updateUses(lastSubsingers);
      part.subSingers = [...lastSubsingers];
      part.subColors = [...lastSubColors];
      part.omitSub = true;
      lastLineHadSubSingers = true;
    }
  }

  if (part.adlib.includes(1)) {
    lastLineHadSubSingers = true;
  }

  // Keep choirSinger state when not preceeded by an empty line
  if (part.adlib.includes(4)) {
    if (!part.choirSingers && (wasLastLineEmpty || !lastLineHadChoirSings)) {
      part.adlib = part.adlib.map(a => (a === 4 ? 2 : a));
    } else if (!part.choirSingers && lastChoirSingers.length) {
      updateUses(lastChoirSingers);
      part.choirSingers = [...lastChoirSingers];
      part.choirColors = [...lastChoirColors];
      part.omitChoir = true;
      lastLineHadChoirSings = true;
    }
  }

  if (part.adlib.includes(4)) {
    lastLineHadChoirSings = true;
  }

  // Clean up unused keys
  if (!part.singers) delete part.singers;
  if (Array.isArray(part.singers) && !part.singers.length) delete part.singers;
  if (!part.subSingers) delete part.subSingers;
  if (Array.isArray(part.subSingers) && !part.subSingers.length)
    delete part.subSingers;
  if (!part.line) delete part.line;
  if (Array.isArray(part.line) && !part.line.length) delete part.line;
  if (!part.adlib) delete part.adlib;
  if (Array.isArray(part.adlib) && !part.adlib.length) delete part.adlib;
  if (!part.colors) delete part.colors;
  if (Array.isArray(part.colors) && !part.colors.length) delete part.colors;
  if (!part.subColors) delete part.subColors;
  if (Array.isArray(part.subColors) && !part.subColors.length)
    delete part.subColors;
  if (!part.omit) delete part.omit;
  if (!part.omitSub) delete part.omitSub;

  if (Object.keys(part).length) {
    wasLastLineEmpty = false;
  } else {
    part.empty = true;
    wasLastLineEmpty = true;
    lastLineHadSubSingers = false;
    lastLineHadChoirSings = false;
  }

  // Save last
  if (!part.empty) {
    if (part.singers) lastSingers = [...part.singers];
    if (part.colors) lastColors = [...part.colors];
    if (part.subSingers) lastSubsingers = [...part.subSingers];
    if (part.subColors) lastSubColors = [...part.subColors];
    if (part.choirSingers) lastChoirSingers = [...part.choirSingers];
    if (part.choirColors) lastChoirColors = [...part.choirColors];
  } else {
    lastSingers = [];
    lastColors = [];
    lastSubsingers = [];
    lastSubColors = [];
    lastChoirSingers = [];
    lastChoirSingers = [];
    lastLineHadSubSingers = false;
    lastLineHadChoirSings = false;
  }
  return part;
};

const parseLine = line => {
  const result = [];
  let insideBracket = false;
  let insideParentheses = false;
  let insideCurly = false;

  let names = [];
  let colors = [];

  let currentString = '';
  let lastCharacter = '';
  let currentPart = new Part();
  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    // Analyse each character
    switch (char) {
      case '[':
        if (insideBracket) {
          errors.push(
            'You should not place an opening square bracket inside another square bracket'
          );
        }
        insideBracket = true;
        // Push Part and reset variabes
        if (i !== 0) {
          if (currentString.trim()) {
            currentPart.line.push(currentString.trim());
            currentPart.adlib.push(0);
          }
          result.push(cleanUpPart(currentPart));
          insideParentheses = false;
          names = [];
          colors = [];
          currentString = '';
          lastCharacter = '';
        }
        // Start new Part
        currentPart = new Part();
        break;

      case ']':
        if (!insideBracket) {
          errors.push(
            'You should not place an closing square bracket inside another square bracket'
          );
        }
        if (insideBracket && lastCharacter !== ')' && lastCharacter !== '}') {
          const entry = currentString.trim().toUpperCase();
          names.push(entry);
          colors.push(COLOR_BANK[entry] || 'col000000');
          updateUses(names);
          currentPart.singers = names;
          currentPart.colors = colors;
          names = [];
          colors = [];
          currentString = '';
        }
        insideBracket = false;
        break;

      case '(':
        if (insideParentheses) {
          errors.push(
            'You should not place a opening parenthesis inside another parenthesis'
          );
        }
        if (insideBracket) {
          if (currentString.trim()) {
            const entry = currentString.trim().toUpperCase();
            names.push(entry);
            colors.push(COLOR_BANK[entry] || 'col000000');
            currentString = '';
            updateUses(names);
            currentPart.singers = names;
            currentPart.colors = colors;
            names = [];
            colors = [];
          }
        } else if (currentString.trim()) {
          currentPart.line.push(currentString.trim());
          currentPart.adlib.push(0);
          currentString = '';
        }
        insideParentheses = true;
        break;

      case ')':
        if (!insideParentheses) {
          errors.push(
            'You should not place a closing parenthesis inside another parenthesis'
          );
        }
        if (insideBracket) {
          if (currentString.trim()) {
            const entry = currentString.trim().toUpperCase();
            names.push(entry);
            colors.push(COLOR_BANK[entry] || 'col000000');
            currentString = '';
            updateUses(names);
            currentPart.subSingers = names;
            currentPart.subColors = colors;
            names = [];
            colors = [];
          }
        } else if (currentString.trim()) {
          currentPart.line.push(currentString.trim());
          currentPart.adlib.push(1);
          currentString = '';
        }
        insideParentheses = false;
        break;

      case '{':
        if (insideCurly) {
          errors.push(
            'You should not place a opening curly braces inside another curly braces'
          );
        }
        if (insideBracket) {
          if (currentString.trim()) {
            const entry = currentString.trim().toUpperCase();
            names.push(entry);
            colors.push(COLOR_BANK[entry] || 'col000000');
            currentString = '';
            updateUses(names);
            currentPart.singers = names;
            currentPart.colors = colors;
            names = [];
            colors = [];
          }
        } else if (currentString.trim()) {
          currentPart.line.push(currentString.trim());
          currentPart.adlib.push(0);
          currentString = '';
        }
        insideCurly = true;
        break;

      case '}':
        if (!insideCurly) {
          errors.push(
            'You should not place a closing curly braces inside another curly braces'
          );
        }
        if (insideBracket) {
          if (currentString.trim()) {
            const entry = currentString.trim().toUpperCase();
            names.push(entry);
            colors.push(COLOR_BANK[entry] || 'col000000');
            currentString = '';
            updateUses(names);
            currentPart.choirSingers = names;
            currentPart.choirColors = colors;
            names = [];
            colors = [];
          }
        } else if (currentString.trim()) {
          currentPart.line.push(currentString.trim());
          currentPart.adlib.push(4);
          currentString = '';
        }
        insideCurly = false;
        break;

      case '/':
        // TO-DO
        if (insideBracket) {
          const entry = currentString.trim().toUpperCase();
          names.push(entry);
          colors.push(COLOR_BANK[entry] || 'col000000');
          currentString = '';
        } else {
          currentString += char;
        }
        break;
      default:
        currentString += char;
      // do nothing
    }
    lastCharacter = char;
  }
  // Push the last part to the result
  if (currentString) {
    currentPart.line.push(currentString.trim());
    currentPart.adlib.push(0);
  }
  result.push(cleanUpPart(currentPart));

  if (result.length === 1 && result[0].empty) {
    return null;
  }
  return result;
};

const parseLyrics = (input, members, unitId) => {
  const result = [];

  // Build member color bank if it's a new unitId
  if (unitId !== latestUnitId) {
    Object.values(members).forEach(member => {
      COLOR_BANK[member.name.toUpperCase()] = member.color || 'col000000';
    });
    latestUnitId = unitId;
  }

  // Split in linebreaks
  const lines = input.split('\n').map(l => l.trim());
  // Keep track of previous information

  // Iterate through lines
  for (let i = 0; i < lines.length; i++) {
    result.push(parseLine(lines[i]));
  }

  // Reset all variabes
  lastSingers = [];
  lastColors = [];
  lastSubsingers = [];
  lastSubColors = [];
  lastChoirSingers = [];
  lastChoirSingers = [];
  wasLastLineEmpty = false;
  lastLineHadSubSingers = false;
  lastLineHadChoirSings = false;

  // Group lyrics in paragraphs
  const paragraphedResult = [[]];
  let paragraphIndex = 0;
  result.forEach(currentLine => {
    if (!currentLine) {
      paragraphedResult.push([]);
      paragraphIndex++;
    } else {
      paragraphedResult[paragraphIndex].push(currentLine);
    }
  });

  const response = {
    result: paragraphedResult,
    uses: { ...uses },
  };

  // Add any errors
  if (errors.length) {
    response.errors = [...errors];
  }

  errors = [];
  uses = [];

  return response;
};

export default parseLyrics;
