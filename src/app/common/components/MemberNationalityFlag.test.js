import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MemberNationalityFlag from './MemberNationalityFlag';

const FLAGS = [
  {
    nationality: 'KOREAN',
    flag: 'korea',
  },
  {
    nationality: 'CHINESE',
    flag: 'china',
  },
  {
    nationality: 'AMERICAN',
    flag: 'usa',
  },
  {
    nationality: 'BRAZILIAN',
    flag: 'brazil',
  },
  {
    nationality: 'UNKNOWN',
    flag: 'unknown',
  },
];

describe('common/MemberNationalityFlag', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(
      <MemberNationalityFlag nationality="KOREAN" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  for (let i = 0; i < FLAGS.length; i++) {
    const { nationality, flag } = FLAGS[0];
    it(`renders the correct flag: ${nationality}`, () => {
      const { getByTitle } = render(
        <MemberNationalityFlag nationality={nationality} />
      );

      const element = getByTitle(nationality);
      const classList = element.classList.value;
      expect(element).toBeInTheDocument();
      expect(classList.includes('member-nationality-flag')).toBe(true);
      expect(classList.includes(`member-nationality-flag--${flag}`)).toBe(true);
    });
  }

  it('renders as unknown when nationality is not in the flags list constant', () => {
    const { getByTitle } = render(<MemberNationalityFlag nationality="BOLA" />);

    const element = getByTitle('BOLA');
    const classList = element.classList.value;
    expect(element).toBeInTheDocument();
    expect(classList.includes('member-nationality-flag')).toBe(true);
    expect(classList.includes('member-nationality-flag--unknown')).toBe(true);
  });
});
