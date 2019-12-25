import React from 'react';

// Import commmon components
import {
  Button,
  Collapsible,
  FavoriteIcon,
  Icon,
  LoadingIcon,
  MemberNationalityFlag,
  PageTitle,
  PositionIcon,
  Switch,
  Tabs,
  Typeahead,
} from '../../../common';

const NOOP = () => {};

const COMPONENTS_LIST = [
  {
    name: '<Button>',
    description: 'Button tag wrapper',
    requiredArguments: [
      'label: the text displayed in the button',
      'onClick: the action performed when the button is clicked',
    ],
    optionalArguments: [
      'className: additional classname',
      'icon: icon type that is placed on the left of the label',
      'isBlock: flag indication a button has full width',
      'isDisabled: flag indicating if the button is disabled',
      'isVisible: flag indication if the button is visible',
      'size: accepts small, default, or large',
      'type: accepts primary, secondary, terciary, danger',
      'accepts blocked elemements',
    ],
    example: (
      <>
        <Button label="primary" onClick={NOOP} />
        <Button label="secondary" onClick={NOOP} type="secondary" />
        <Button label="terciary" onClick={NOOP} type="terciary" />
        <Button label="danger" onClick={NOOP} type="danger" />
        <Button label="icon" onClick={NOOP} icon="lock" />
        <Button label="disabled" onClick={NOOP} isDisabled />
        <Button label="block" onClick={NOOP} isBlock />
      </>
    ),
  },
  {
    name: '<Collapsible>',
    description: 'Collapsible panel with children content',
    requiredArguments: [
      'title: the header of the panel',
      'children elements to be rendered when expanded',
    ],
    optionalArguments: [
      'collapsed: makes panel collapse (default)',
      'expanded: makes panel expand',
      'locked: locks panel action keeping it expanded or collapsed',
    ],
    example: (
      <>
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
      </>
    ),
  },
  {
    name: '<FavoriteIcon>',
    description: 'Heart shaped favorite icon',
    requiredArguments: [
      'action: onClick function',
      'id: value the action function calls',
    ],
    optionalArguments: [
      'className: additional classes (default: &#39;&#39;)',
      'size: string or number (default: 12)',
      'state: boolean that determines if heart is red or gray (default: false)',
    ],
    example: (
      <>
        <FavoriteIcon action={NOOP} id="1" />
        <FavoriteIcon action={NOOP} id="2" state />
      </>
    ),
  },
  {
    name: '<Icon>',
    description: 'See Icon tab for list of icons',
    requiredArguments: [],
    optionalArguments: [
      'className: additional classes (default: &#39;&#39;)',
      'type: the name of the icon (default: default)',
      'size: string or number (default: 12)',
      'inline: boolean that determines if icon will be inline with text (default: false)',
    ],
    example: (
      <>
        <Icon size={36} />
      </>
    ),
  },
  {
    name: '<LoadingIcon>',
    description: 'Colored loading icon',
    requiredArguments: [],
    optionalArguments: ['size: tiny, small, medium (Default), large'],
    example: (
      <>
        <LoadingIcon />
      </>
    ),
  },
  {
    name: '<NationalityFlag>',
    description: 'Adds nationality flag image',
    optionalArguments: [
      'nationality: one of the acceptable nationalities or it is defaulted to unknown',
      'className: any custom classname to be added to component',
    ],
    example: (
      <>
        <MemberNationalityFlag />
        <MemberNationalityFlag nationality="AMERICAN" />
        <MemberNationalityFlag nationality="BRAZILIAN" />
        <MemberNationalityFlag nationality="BRITISH" />
        <MemberNationalityFlag nationality="CANADIAN" />
        <MemberNationalityFlag nationality="CHINESE" />
        <MemberNationalityFlag nationality="JAPANESE" />
        <MemberNationalityFlag nationality="KOREAN" />
        <MemberNationalityFlag nationality="TAIWANESE" />
        <MemberNationalityFlag nationality="THAI" />
        <MemberNationalityFlag nationality="VIETNAMISE" />
        <MemberNationalityFlag nationality="PLANTIAN" />
        <MemberNationalityFlag nationality="UNKNOWN" />
      </>
    ),
  },
  {
    name: '<PageTitle>',
    description:
      'Adds an H1 to the page and uses its title as the browser page title',
    requiredArguments: ['title: the title of the page'],
    optionalArguments: [
      'isAdmin: adds flag indication that the page has admin features',
      'isBeta: adds flag indication that the page has beta features',
    ],
    example: (
      <>
        <PageTitle title="Page" />
        <PageTitle title="Page" isAdmin />
        <PageTitle title="Page" isBeta />
        <PageTitle title="Page" isBeta isAdmin />
      </>
    ),
  },
  {
    name: '<PositionIcon>',
    description: 'Position icon with optional inline name',
    requiredArguments: [
      'position: the standarized all caps position name (see constants)',
    ],
    optionalArguments: [
      'displayName: a boolean indicating that the position name should be displayed or a string to be displayed as the position name',
      'className: any custom class names',
    ],
    example: (
      <>
        <PositionIcon position="LEADER" displayName />
        <PositionIcon position="MAIN_VOCALIST" displayName />
        <PositionIcon position="MAIN_RAPPER" displayName />
        <PositionIcon position="MAIN_DANCER" displayName />
        <PositionIcon position="LEAD_VOCALIST" displayName />
        <PositionIcon position="LEAD_RAPPER" displayName />
        <PositionIcon position="LEAD_DANCER" displayName />
        <PositionIcon position="VOCALIST" displayName />
        <PositionIcon position="RAPPER" displayName />
        <PositionIcon position="DANCER" displayName />
        <PositionIcon position="CENTER" displayName />
        <PositionIcon position="FACE_OF_THE_GROUP" displayName />
        <PositionIcon position="VISUAL" displayName />
        <PositionIcon position="MAKNAE" displayName />
        <PositionIcon position="ALL" displayName />
        <PositionIcon position="NONE" displayName />
        <PositionIcon position="UNKNOWN" displayName />
        <PositionIcon position="" displayName="Custom Display Name" />
      </>
    ),
  },
  {
    name: '<Switch>',
    description: 'Switch button to indicate if a feature is on',
    requiredArguments: [
      'action: function to be exectued when switch is triggers',
    ],
    optionalArguments: [
      'labels: object with left and right values',
      'checked: boolean that determines if switch is on',
    ],
    example: (
      <>
        <Switch action={NOOP} /> <Switch action={NOOP} checked />
      </>
    ),
  },
  {
    name: '<Tabs>',
    description: 'Wrapper component with selectable tabs',
    requiredArguments: [
      'tabs: array of tabs strings',
      'action: the function triggered when a tab is clicked',
      'children: the content to be displayed by the tab content div',
    ],
    optionalArguments: [
      'active: what tab is active (default: the first tab)',
      'icons: object with a contition key and an icon component value',
    ],
    example: (
      <>
        <Tabs action={NOOP} tabs={['Tab 1', 'Tab 2', 'Tab 3']} active="Tab 1">
          Content goes here as a component child
        </Tabs>
      </>
    ),
  },
  {
    name: '<Typeahead>',
    description: 'Input field with autocomplete datalist option',
    requiredArguments: [
      'action: function trigged when input is selected',
      'name: name of the datalist/input',
    ],
    optionalArguments: [
      'className: additional classes (default: &#39;&#39;)',
      'placeholder: input field placeholder (default: Searching...)',
      'suggestions: list of suggestions to autocomplete in the datalist (default: [])',
    ],
    example: (
      <>
        <Typeahead
          action={NOOP}
          name="example"
          suggestions={['Avocado', 'Banana', 'Cranberry']}
        />
      </>
    ),
  },
  {
    name: '+',
    description: 'string',
    requiredArguments: [],
    optionalArguments: [],
    example: <></>,
  },
];

export default COMPONENTS_LIST;
