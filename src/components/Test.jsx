import React from 'react';

// Import shared components
import Icon from './shared/Icon';
import MemberProfile from './MemberProfile';

const Test = props => (
  <main className="container">
    <h1>Test Page</h1>
    <div className="content">
      <MemberProfile memberId="-LDcyPg_LQgDOBQ-wFPi" />
      <MemberProfile memberId="bola" className="pill-test" />
    </div>
  </main>
);

export default Test;
