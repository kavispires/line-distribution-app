import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './Button';

const SIZES = ['default', 'small', 'large'];
const TYPES = ['primary', 'secondary', 'terciary', 'danger'];

describe('common/Button', () => {
  const FALSE = false;
  const NOOP = () => {};
  let SPY;

  beforeAll(() => {});

  beforeEach(() => {
    SPY = jest.fn();
  });

  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(<Button label="Label" onClick={NOOP} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders children as a block', () => {
    const { getByText, asFragment } = render(
      <Button label="Label" onClick={NOOP}>
        <p>Button Name Here</p>
      </Button>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByText('Button Name Here')).toBeInTheDocument();
  });

  it('requires label prop', () => {
    const { getByText } = render(<Button label="hello" onClick={NOOP} />);

    expect(getByText('hello')).toBeInTheDocument();

    const { getByText: getByText2 } = render(
      <Button label="world" onClick={NOOP} />
    );

    expect(getByText2('world')).toBeInTheDocument();
  });

  it('fires onClick prop function when clicked', () => {
    const { getByText } = render(<Button label="Label" onClick={SPY} />);

    expect(SPY).not.toHaveBeenCalled();

    fireEvent.click(getByText('Label'));

    expect(SPY).toHaveBeenCalled();
  });

  it('accepts a icon name as prop', () => {
    const { getByTitle } = render(
      <Button label="Label" onClick={NOOP} icon="lock" />
    );

    expect(getByTitle('lock')).toBeInTheDocument();
  });

  it('has default classes', () => {
    const { container } = render(<Button label="Label" onClick={NOOP} />);

    expect(container.firstChild.classList.value.trim()).toBe(
      'btn btn--default btn--primary'
    );
  });

  it('adds an block class when isBlock flag is true', () => {
    const { container } = render(
      <Button label="Label" onClick={NOOP} isBlock />
    );

    expect(container.firstChild.classList.contains('btn--block')).toBe(true);
  });

  it('adds an hidden class when isVisible flag is false', () => {
    const { container } = render(
      <Button label="Label" onClick={NOOP} isVisible={FALSE} />
    );

    expect(container.firstChild.classList.contains('hidden')).toBe(true);
  });

  for (let i = 0; i < SIZES.length; i++) {
    const size = SIZES[i];
    it(`adds btn--${size} when size argument is "${size}"`, () => {
      const { container } = render(
        <Button label="Label" onClick={NOOP} size={size} />
      );

      expect(container.firstChild.classList.contains(`btn--${size}`)).toBe(
        true
      );
    });
  }

  for (let i = 0; i < TYPES.length; i++) {
    const type = TYPES[i];
    it(`adds btn--${type} when type argument is "${type}"`, () => {
      const { container } = render(
        <Button label="Label" onClick={NOOP} type={type} />
      );

      expect(container.firstChild.classList.contains(`btn--${type}`)).toBe(
        true
      );
    });
  }

  it('accepts custom classes with the className argument"', () => {
    const { container } = render(
      <Button
        label="Label"
        onClick={NOOP}
        className="custom-class extra-class"
      />
    );

    expect(container.firstChild.classList.contains('btn')).toBe(true);
    expect(container.firstChild.classList.contains('custom-class')).toBe(true);
    expect(container.firstChild.classList.contains('extra-class')).toBe(true);
  });
});
