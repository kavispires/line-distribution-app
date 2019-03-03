import { appTypes } from './app';
import { adminTypes } from './admin';
import { artistsTypes } from './artists';
import { authTypes } from './auth';
import { syncTypes } from './sync';
import { tempTypes } from './temp';

describe('Reducers', () => {
  it('it has no overlapping types', () => {
    let hasOverlapping = false;
    const typeDict = {};

    const allTypes = [
      appTypes,
      adminTypes,
      artistsTypes,
      authTypes,
      syncTypes,
      tempTypes,
    ];

    allTypes.forEach(typeGroup =>
      Object.keys(typeGroup).forEach(type => {
        if (typeDict[type] === undefined) {
          typeDict[type] = true;
        } else {
          hasOverlapping = true;
        }
      })
    );

    expect(hasOverlapping).toBeFalsy();
  });
});
