import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageTitle from './PageTitle';

describe('common/PageTitle', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(<PageTitle title="Page Title" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the admin banner', () => {
    const { getByText } = render(<PageTitle title="Page Title" isAdmin />);
    expect(getByText('Admin')).toBeInTheDocument();
  });

  it('renders the beta banner', () => {
    const { getByText } = render(<PageTitle title="Page Title" isBeta />);
    expect(getByText('Beta')).toBeInTheDocument();
  });
});
