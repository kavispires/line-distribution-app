import { appOperations, appTypes } from './app';
import { adminOperations, adminTypes } from './admin';
import { artistsOperations, artistsTypes } from './artists';
import { authOperations, authTypes } from './auth';
import { syncOperations, syncTypes } from './sync';
import { tempOperations, tempTypes } from './temp';

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

  it('it has no overlapping operatons', () => {
    let hasOverlapping = false;
    const operationsDict = {};

    const allOperations = [
      appOperations,
      adminOperations,
      artistsOperations,
      authOperations,
      syncOperations,
      tempOperations,
    ];

    allOperations.forEach(operationGroup =>
      Object.keys(operationGroup).forEach(operation => {
        if (operationsDict[operation] === undefined) {
          operationsDict[operation] = true;
        } else {
          hasOverlapping = true;
        }
      })
    );

    expect(hasOverlapping).toBeFalsy();
  });
});
