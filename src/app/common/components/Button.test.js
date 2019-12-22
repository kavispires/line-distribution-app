import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './Button';

describe('Common/Button', () => {
  let NOOP;
  const FALSE = false;
  const TRUE = true;

  beforeAll(() => {});

  beforeEach(() => {
    NOOP = jest.fn();
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
    const { getByText } = render(<Button label="Label" onClick={NOOP} />);

    expect(NOOP).not.toHaveBeenCalled();

    fireEvent.click(getByText('Label'));

    expect(NOOP).toHaveBeenCalled();
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
      <Button label="Label" onClick={NOOP} isBlock={TRUE} />
    );

    expect(container.firstChild.classList.contains('btn--block')).toBe(true);
  });

  it('adds an hidden class when isVisible flag is false', () => {
    const { container } = render(
      <Button label="Label" onClick={NOOP} isVisible={FALSE} />
    );

    expect(container.firstChild.classList.contains('hidden')).toBe(true);
  });

  it('adds btn--default when size argument is "default" or omitted', () => {
    const { container } = render(
      <Button label="Label" onClick={NOOP} size="default" />
    );

    expect(container.firstChild.classList.contains('btn--default')).toBe(true);
  });

  it('adds btn--small class when size argument is "small"', () => {
    const { container } = render(
      <Button label="Label" onClick={NOOP} size="small" />
    );

    expect(container.firstChild.classList.contains('btn--small')).toBe(true);
  });

  it('adds btn--large class when size argument is "large"', () => {
    const { container } = render(
      <Button label="Label" onClick={NOOP} size="large" />
    );

    expect(container.firstChild.classList.contains('btn--large')).toBe(true);
  });

  it('adds btn--primary class when type argument is "primary" or omitted', () => {
    const { container } = render(
      <Button label="Label" onClick={NOOP} type="primary" />
    );

    expect(container.firstChild.classList.contains('btn--primary')).toBe(true);
  });

  it('adds btn--secondary class when type argument is "secondary"', () => {
    const { container } = render(
      <Button label="Label" onClick={NOOP} type="secondary" />
    );

    expect(container.firstChild.classList.contains('btn--secondary')).toBe(
      true
    );
  });

  it('adds btn--terciary class when type argument is "terciary"', () => {
    const { container } = render(
      <Button label="Label" onClick={NOOP} type="terciary" />
    );

    expect(container.firstChild.classList.contains('btn--terciary')).toBe(true);
  });

  it('adds btn--danger class when type argument is "danger"', () => {
    const { container } = render(
      <Button label="Label" onClick={NOOP} type="danger" />
    );

    expect(container.firstChild.classList.contains('btn--danger')).toBe(true);
  });

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
