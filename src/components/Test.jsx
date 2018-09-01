import React from 'react';

// Import shared components
import Icon from './shared/Icon';
import MemberProfile from './MemberProfile';

const Test = props => (
  <main className="container">
    <h1>Test Page</h1>
    <div className="content">
      <p>
        <Icon type="default" size="medium" color="red" />
      </p>
      <button onClick={() => props.testFunction()}>Run test</button>
      <p>{props.test.test1}</p>
    </div>
  </main>
);

export default Test;
