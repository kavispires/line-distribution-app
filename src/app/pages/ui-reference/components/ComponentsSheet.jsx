import React from 'react';

// Import components
import ComponentExample from './ComponentExample';
// Import common components
import {
  Button,
  Collapsible,
  FavoriteIcon,
  Icon,
  LoadingIcon,
  Switch,
  Tabs,
  Typeahead,
} from '../../../common';

const NOOP = () => {};

const ComponentSheet = () => (
  <main className="container">
    <ul className="component-list">
      <ComponentExample
        name="Button"
        description="Button tag wrapper"
        requiredArguments={[
          'label: the text displayed in the button',
          'onClick: the action performed when the button is clicked',
        ]}
        optionalArguments={[
          'className: additional classname',
          'icon: icon type that is placed on the left of the label',
          'isBlock: flag indication a button has full width',
          'isDisabled: flag indicating if the button is disabled',
          'isVisible: flag indication if the button is visible',
          'size: accepts small, default, or large',
          'type: accepts primary, secondary, terciary, danger',
          'accepts blocked elemements',
        ]}
      >
        <Button label="primary" onClick={NOOP} />
        <Button label="secondary" onClick={NOOP} type="secondary" />
        <Button label="terciary" onClick={NOOP} type="terciary" />
        <Button label="danger" onClick={NOOP} type="danger" />
        <Button label="icon" onClick={NOOP} icon="lock" />
        <Button label="disabled" onClick={NOOP} isDisabled />
        <Button label="block" onClick={NOOP} isBlock />
      </ComponentExample>

      <ComponentExample
        name="Collapsible"
        description="Collapsible panel with children content"
        requiredArguments={[
          'title: the header of the panel',
          'children elements to be rendered when expanded',
        ]}
        optionalArguments={[
          'collapsed: makes panel collapse (default)',
          'expanded: makes panel expand',
          'locked: locks panel action keeping it expanded or collapsed',
        ]}
      >
        <Collapsible title="Locked Collapsible" locked>
          Content
        </Collapsible>
        <Collapsible title="Locked Expanded Collapsible" locked expanded>
          Content
        </Collapsible>
        <Collapsible title="Collapsed Collapsible">Content</Collapsible>
        <Collapsible title="Expanded Collapsible" expanded>
          Content
        </Collapsible>
      </ComponentExample>

      <ComponentExample
        name="Favorite Icon"
        description="Heart shaped favorite icon"
        requiredArguments={[
          'action: onClick function',
          'id: value the action function calls',
        ]}
        optionalArguments={[
          'className: additional classes (default: &#39;&#39;)',
          'size: string or number (default: 12)',
          'state: boolean that determines if heart is red or gray (default: false)',
        ]}
      >
        <FavoriteIcon action={NOOP} id="1" />
        <FavoriteIcon action={NOOP} id="2" state />
      </ComponentExample>

      <ComponentExample
        name="Icon"
        description="See Icon tab for list of icons"
        optionalArguments={[
          'className: additional classes (default: &#39;&#39;)',
          'type: the name of the icon (default: default)',
          'size: string or number (default: 12)',
          'inline: boolean that determines if icon will be inline with text (default: false)',
        ]}
      >
        <Icon size={36} />
      </ComponentExample>

      <ComponentExample
        name="Loading Icon"
        description="Colored loading icon"
        requiredArguments={['']}
        optionalArguments={['size: tiny, small, medium (Default), large']}
      >
        <LoadingIcon />
      </ComponentExample>

      <ComponentExample
        name="Switch"
        description="Switch button to indicate if a feature is on"
        requiredArguments={[
          'action: function to be exectued when switch is triggers',
        ]}
        optionalArguments={[
          'labels: object with left and right values',
          'checked: boolean that determines if switch is on',
        ]}
      >
        <Switch action={NOOP} /> <Switch action={NOOP} checked />
      </ComponentExample>

      <ComponentExample
        name="Tabs"
        description="Wrapper component with selectable tabs"
        requiredArguments={[
          'tabs: array of tabs strings',
          'action: the function triggered when a tab is clicked',
          'children: the content to be displayed by the tab content div',
        ]}
        optionalArguments={[
          'active: what tab is active (default: the first tab)',
          'icons: object with a contition key and an icon component value',
        ]}
      >
        <Tabs action={NOOP} tabs={['Tab 1', 'Tab 2', 'Tab 3']} active="Tab 1">
          Content goes here as a component child
        </Tabs>
      </ComponentExample>

      <ComponentExample
        name="Typeahead"
        description="Input field with autocomplete datalist option"
        requiredArguments={[
          'action: function trigged when input is selected',
          'name: name of the datalist/input',
        ]}
        optionalArguments={[
          'className: additional classes (default: &#39;&#39;)',
          'placeholder: input field placeholder (default: Searching...)',
          'suggestions: list of suggestions to autocomplete in the datalist (default: [])',
        ]}
      >
        <Typeahead
          action={NOOP}
          name="example"
          suggestions={['Avocado', 'Banana', 'Cranberry']}
        />
      </ComponentExample>

      <ComponentExample
        name=""
        description=""
        requiredArguments={['']}
        optionalArguments={['']}
      >
        a
      </ComponentExample>
    </ul>
  </main>
);

export default ComponentSheet;
