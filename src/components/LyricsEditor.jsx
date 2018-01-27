import React from 'react';

const LyricsEditor = ({placeholder, action, defaultValue}) => {
	return (
		<textarea
			className="editor"
			placeholder={ placeholder }
			onChange={(e) => action(e)}
			defaultValue={ defaultValue } />
	);
};

export default LyricsEditor;
