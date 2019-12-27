import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PositionIcon from './PositionIcon';

import constants from '../../../utils/constants';
import enums from '../../../utils/readable-enums';

describe('common/PositionIcon', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(<PositionIcon position="LEADER" />);
    expect(asFragment()).toMatchSnapshot();
  });

  const listOfPOsitions = Object.entries(constants.POSITIONS_LIST_ICON);

  for (let i = 0; i < listOfPOsitions.length; i++) {
    const [position, classString] = listOfPOsitions[i];
    it(`renders the correct position icon: ${position}`, () => {
      const { getByTestId } = render(<PositionIcon position={position} />);

      const element = getByTestId('position-icon');
      const classList = element.classList.value;
      expect(element).toBeInTheDocument();
      expect(classList.includes('position-icon')).toBe(true);
      expect(classList.includes(`position-icon--${classString}`)).toBe(true);
    });
  }

  for (let i = 0; i < listOfPOsitions.length; i++) {
    const [position, classString] = listOfPOsitions[i];
    it(`renders the correct position icon with display name: ${position}`, () => {
      const { getByTestId, getByText } = render(
        <PositionIcon position={position} displayName />
      );

      const container = getByTestId('position-icon-container');
      const classList = container.classList.value;
      expect(container).toBeInTheDocument();
      expect(classList.includes('position-icon-container')).toBe(true);

      const element = getByTestId('position-icon');
      const classListEl = element.classList.value;
      expect(element).toBeInTheDocument();
      expect(classListEl.includes('position-icon')).toBe(true);
      expect(classListEl.includes(`position-icon--${classString}`)).toBe(true);

      const text = getByText(enums.POSITIONS[position]);
      expect(text).toBeInTheDocument();
    });
  }

  it('renders the unknown icon when position is not in the positions list constant', () => {
    const { getByTestId, getByText } = render(
      <PositionIcon position="BOLA" displayName />
    );

    const container = getByTestId('position-icon-container');
    const classList = container.classList.value;
    expect(container).toBeInTheDocument();
    expect(classList.includes('position-icon-container')).toBe(true);

    const element = getByTestId('position-icon');
    const classListEl = element.classList.value;
    expect(element).toBeInTheDocument();
    expect(classListEl.includes('position-icon')).toBe(true);
    expect(classListEl.includes('position-icon--unknown')).toBe(true);

    const text = getByText('BOLA');
    expect(text).toBeInTheDocument();
  });

  it('renders a display name when a string is passed as the displayName argument', () => {
    const { getByTestId, getByText } = render(
      <PositionIcon position="LEADER" displayName="Custom Display Name" />
    );

    const container = getByTestId('position-icon-container');
    const classList = container.classList.value;
    expect(container).toBeInTheDocument();
    expect(classList.includes('position-icon-container')).toBe(true);

    const element = getByTestId('position-icon');
    const classListEl = element.classList.value;
    expect(element).toBeInTheDocument();
    expect(classListEl.includes('position-icon')).toBe(true);
    expect(classListEl.includes('position-icon--leader')).toBe(true);

    const text = getByText('Custom Display Name');
    expect(text).toBeInTheDocument();
  });
});
