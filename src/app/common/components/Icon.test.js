import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Icon from './Icon';

import constants from '../../../utils/constants';
import ICONS from '../../../utils/icons';

describe('common/Icon', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(<Icon />);
    expect(asFragment()).toMatchSnapshot();
  });

  const iconsList = Object.keys(ICONS);
  for (let i = 0; i < iconsList.length; i++) {
    const icon = iconsList[i];
    it('accepts a valid type from the ICONS svg object', () => {
      const { getByTitle } = render(<Icon type={icon} />);
      expect(getByTitle(icon).firstChild.classList.value.trim()).toBe(
        `icon-${icon}`
      );
    });
  }

  const colorsList = Object.entries(constants.DEFAULT_COLORS);
  for (let i = 0; i < colorsList.length; i++) {
    const { color, hex } = colorsList[i];
    it('accepts a color argument from the colors constant', () => {
      const { getByTestId } = render(<Icon color={color} />);
      expect(getByTestId('icon-path')).toHaveAttribute('style', hex);
    });
  }

  it('accepts a size argument', () => {
    const { getByTitle } = render(<Icon size="10" />);
    expect(getByTitle('default')).toHaveAttribute('width', '10px');
    expect(getByTitle('default')).toHaveAttribute('height', '10px');
  });

  it('accepts a title argument', () => {
    const { getByTitle } = render(<Icon title="Custom Title" />);
    expect(getByTitle('Custom Title')).toBeInTheDocument();
  });

  it('accepts an inline flag', () => {
    const { getByTitle } = render(<Icon inline />);
    expect(getByTitle('default')).toHaveAttribute(
      'style',
      'display: inline-block; vertical-align: middle; margin: 0px 3px; transform: translateY(-1px);'
    );
  });
});
