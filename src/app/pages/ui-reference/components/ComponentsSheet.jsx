import React from 'react';

// Import common components
import { Button } from '../../../common';
// Import components
import ComponentExample from './ComponentExample';
// Import components list
import COMPONENTS_LIST from './components-list';

const scrollToView = id => {
  const anchor = document.getElementById(id);
  if (anchor) {
    anchor.scrollIntoView();
  }
};

const ComponentSheet = () => (
  <main className="container">
    <ul className="component-indices">
      {COMPONENTS_LIST.map(({ name }) => (
        <li key={name}>
          <Button
            type="terciary"
            onClick={() => scrollToView(name)}
            label={name}
          />
        </li>
      ))}
    </ul>
    <ul className="component-list">
      {COMPONENTS_LIST.map(
        ({
          name,
          description,
          requiredArguments,
          optionalArguments,
          example,
        }) => (
          <ComponentExample
            key={name}
            name={name}
            description={description}
            requiredArguments={requiredArguments}
            optionalArguments={optionalArguments}
          >
            {example}
          </ComponentExample>
        )
      )}
    </ul>
  </main>
);

export default ComponentSheet;
