import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FavoriteIcon from './FavoriteIcon';

describe('common/FavoriteIcon', () => {
  const ID = 'abc';
  const NOOP = () => {};
  let SPY;

  beforeAll(() => {});

  beforeEach(() => {
    SPY = jest.fn();
  });

  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(<FavoriteIcon action={NOOP} id={ID} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('fires action prop function when clicked', () => {
    const { getByTestId } = render(<FavoriteIcon action={SPY} id={ID} />);

    expect(SPY).not.toHaveBeenCalled();

    fireEvent.click(getByTestId('favorite-icon'));

    expect(SPY).toHaveBeenCalledWith(ID);
  });

  it('changes the icon based on the state argument', () => {
    const { getByTitle } = render(<FavoriteIcon action={SPY} id={ID} />);

    expect(getByTitle('heart-hollow')).toBeInTheDocument();

    const { getByTitle: getByTitleWithState } = render(
      <FavoriteIcon action={SPY} id={ID} state />
    );

    expect(getByTitleWithState('heart')).toBeInTheDocument();
  });

  it('accepts custom classes with the className argument', () => {
    const { container } = render(
      <FavoriteIcon action={SPY} id={ID} className="custom-class" />
    );

    expect(container.firstChild.classList.value.trim()).toBe(
      'btn btn--transparent custom-class'
    );
  });
});
