import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

let colorDict = null;
let keyNumber = 0;

const LyricsOutput = ({ lyrics, colorsDB }) => {
  if (!colorDict || !Object.keys(colorDict).length) {
    colorDict = colorsDB;
    colorDict.col000000 = {
      number: 0,
      hex: '#b1b1b1',
    };
  }

  return (
    <div className="lyrics__output">
      {lyrics.map(verse => {
        keyNumber++;
        return <Verse key={`verse-${keyNumber}`} verse={verse} />;
      })}
    </div>
  );
};

LyricsOutput.propTypes = {
  lyrics: PropTypes.array.isRequired,
  colorsDB: PropTypes.object.isRequired,
};

const Verse = ({ verse }) => (
  <p className="lyrics__verse">
    {verse.map(line => {
      keyNumber++;
      return (
        <Fragment key={`line-${keyNumber}`}>
          <Line line={line} />
          <br />
        </Fragment>
      );
    })}
  </p>
);

Verse.propTypes = {
  verse: PropTypes.array.isRequired,
};

const Line = ({ line }) => (
  <span className="lyrics__line">
    {line.map(part => {
      keyNumber++;
      if (!part.line || !part.line[0] || !part.adlib) return null;

      return (
        <Fragment key={`part-${keyNumber}`}>
          <Bracket part={part} />
          <Part part={part} />
        </Fragment>
      );
    })}
  </span>
);

Line.propTypes = {
  line: PropTypes.array.isRequired,
};

const Part = ({ part }) => (
  <Fragment>
    {part.adlib.map((type, index) => {
      keyNumber++;

      const bitStyle = getBitStyle(part, type, index);

      switch (type) {
        case 0:
          // colored line (colors)
          return (
            <span
              key={`bit-${keyNumber}`}
              className="lyrics__bit-normal"
              style={bitStyle}
            >
              {part.line[index]}
            </span>
          );
        case 1:
          // colored line with parentheses (subColors)
          return (
            <Fragment key={`bit-${keyNumber}`}>
              {' '}
              (
              <span className="lyrics__bit-sub" style={bitStyle}>
                {part.line[index]}
              </span>
              )
            </Fragment>
          );
        case 2:
          // greyed italic line with parentheses
          return (
            <Fragment key={`bit-${keyNumber}`}>
              {' '}
              <i>(</i>
              <span className="lyrics__bit-grey">{part.line[index]}</span>
              <i>)</i>
            </Fragment>
          );
        case 3:
          // greyed italitc line
          return (
            <span key={`bit-${keyNumber}`} className="lyrics__bit-all">
              {part.line[index]}
            </span>
          );
        case 4:
          // colored line with parentheses (choirColors)
          return (
            <Fragment key={`bit-${keyNumber}`}>
              {' '}
              <i>(</i>
              <span className="lyrics__bit-choir" style={bitStyle}>
                {part.line[index]}
              </span>
              <i>)</i>
            </Fragment>
          );
        default:
          return (
            <span
              key={`bit-${keyNumber}`}
              className="lyrics__bit-normal"
              style={bitStyle}
            >
              {part.line[index]}
            </span>
          );
      }
    })}
  </Fragment>
);

Part.propTypes = {
  part: PropTypes.object.isRequired,
};

const Bracket = ({ part }) => {
  if (part.omit) return null;

  const hasSingers = part.singers && !part.omit;
  const hasSubSingers = part.subSingers && !part.omitSub;
  const hasChoirSingers = part.choirSingers && !part.omitChoir;

  if (!hasSingers && !hasSubSingers && !hasChoirSingers) return null;

  return (
    <span className="lyrics__bracket">
      {' ['}
      {hasSingers && part.singers.join('/')}
      {hasSubSingers && (
        <span className="lyrics__parenthesis">
          {' ('}
          {part.subSingers.join('/')}
          {')'}
        </span>
      )}
      {hasChoirSingers && (
        <span className="lyrics__braces">
          {' {'}
          {part.choirSingers.join('/')}
          {'}'}
        </span>
      )}
      {'] '}
    </span>
  );
};

Bracket.propTypes = {
  part: PropTypes.object.isRequired,
};

const getBitStyle = (part, type) => {
  const BASE_COLOR = '#b5b5ba';
  const styles = {
    background: '#b1b1b1',
  };

  if (type === 0 && part.colors && part.colors.length) {
    if (part.colors.length > 1) {
      const colorHexes = part.colors.map(
        c => (colorDict[c] ? colorDict[c].hex : BASE_COLOR)
      );
      styles.background = `linear-gradient(${colorHexes.join(', ')})`;
    } else {
      styles.background = colorDict[part.colors[0]].hex || BASE_COLOR;
    }
  }

  if (type === 1 && part.subColors && part.subColors.length) {
    if (part.subColors.length > 1) {
      const colorHexes = part.subColors.map(
        c => (colorDict[c] ? colorDict[c].hex : BASE_COLOR)
      );
      styles.background = `linear-gradient(${colorHexes.join(', ')})`;
    } else {
      styles.background = colorDict[part.subColors[0]].hex || BASE_COLOR;
    }
  }

  if (type === 4 && part.choirColors && part.choirColors.length) {
    if (part.choirColors.length > 1) {
      const colorHexes = part.choirColors.map(
        c => (colorDict[c] ? colorDict[c].hex : BASE_COLOR)
      );
      styles.background = `linear-gradient(${colorHexes.join(', ')})`;
    } else {
      styles.background = colorDict[part.choirColors[0]].hex || BASE_COLOR;
    }
  }

  return styles;
};

export default LyricsOutput;
