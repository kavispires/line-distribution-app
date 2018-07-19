import React from 'react';
import PropTypes from 'prop-types';

const LyricsEditor = ({ placeholder, action, defaultValue }) => (
  <textarea
    id="lyrics-editor"
    className="editor"
    placeholder={placeholder}
    onChange={e => action(e)}
    defaultValue={defaultValue}
  />
);

LyricsEditor.propTypes = {
  action: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default LyricsEditor;
