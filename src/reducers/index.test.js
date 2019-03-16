import { adminOperations, adminTypes } from './admin';
import { appOperations, appTypes } from './app';
import { artistsOperations, artistsTypes } from './artists';
import { authOperations, authTypes } from './auth';
import { distributeOperations, distributeTypes } from './distribute';
import { dbOperations, dbTypes } from './db';
import { syncOperations, syncTypes } from './sync';
import { tempOperations, tempTypes } from './temp';

describe('Reducers', () => {
  it('it has no overlapping types', () => {
    let hasOverlapping = false;
    const typeDict = {};

    const allTypes = [
      adminTypes,
      appTypes,
      artistsTypes,
      authTypes,
      dbTypes,
      distributeTypes,
      syncTypes,
      tempTypes,
    ];

    allTypes.forEach(typeGroup =>
      Object.keys(typeGroup).forEach(type => {
        if (typeDict[type] === undefined) {
          typeDict[type] = true;
        } else {
          console.log(type); //eslint-disable-line
          hasOverlapping = true;
        }
      })
    );

    expect(hasOverlapping).toBeFalsy();
  });

  it('it has no overlapping operatons', () => {
    let hasOverlapping = false;
    const operationsDict = {};

    const allOperations = [
      adminOperations,
      appOperations,
      artistsOperations,
      authOperations,
      dbOperations,
      distributeOperations,
      syncOperations,
      tempOperations,
    ];

    allOperations.forEach(operationGroup =>
      Object.keys(operationGroup).forEach(operation => {
        if (operationsDict[operation] === undefined) {
          operationsDict[operation] = true;
        } else {
          console.log(operation); //eslint-disable-line
          hasOverlapping = true;
        }
      })
    );

    expect(hasOverlapping).toBeFalsy();
  });
});
