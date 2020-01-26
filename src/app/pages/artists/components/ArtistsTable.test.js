import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ArtistsTable from './ArtistsTable';

const mockData = {
  artists: [
    {
      id: '-LZJ7AQQhyOk5w_TAD4u',
      agency: 'CUBE',
      createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
      disbanded: false,
      genre: 'K-POP',
      members: [
        {
          id: '-LZJ7AH22seM59PQ977M',
          name: 'Miyeon',
          color: '23',
        },
        {
          id: '-LZJ7AH7krbGtR-yZyhT',
          name: 'Minnie',
          color: '2',
        },
        {
          id: '-LZJ7AHDQIEw5VM1mI3C',
          name: 'Soojin',
          color: '6',
        },
        {
          id: '-LZJ7AGyuXFDjXz1ECb2',
          name: 'Soyeon',
          color: '18',
        },
        {
          id: '-LZJ7AHM3LgaoxdPJphc',
          name: 'Yuqi',
          color: '14',
        },
        {
          id: '-LZJ7AHNENioOO_v3cE5',
          name: 'Shuhua',
          color: '8',
        },
      ],
      name: '(G)I-DLE',
      modifiedBy: null,
      otherNames: 'gidle g-i-dle g-idle g i dle',
      private: false,
      query:
        '(g)i-dle gidle g-i-dle g-idle g i dle miyeon minnie soojin soyeon yuqi shuhua cube',
      unitIds: ['-LZJ7AZJOR0ehcrPecgO'],
    },
  ],
  userFavoriteArtists: {
    abc123: true,
    def456: true,
  },
};

describe('pages/Artists/ArtistsTable', () => {
  let SPY;
  const NOOP = () => {};

  beforeEach(() => {
    SPY = jest.fn();
  });

  it('renders', () => {
    const { asFragment } = render(
      <ArtistsTable
        artists={mockData.artists}
        favoriteAction={NOOP}
        rowAction={NOOP}
        userFavoriteArtists={mockData.userFavoriteArtists}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
