import React from 'react';

import pos1 from '../../images/icon-leader.svg';
import pos2 from '../../images/icon-main-vocalist.svg';
import pos3 from '../../images/icon-main-rapper.svg';
import pos4 from '../../images/icon-main-dancer.svg';
import pos5 from '../../images/icon-lead-vocalist.svg';
import pos6 from '../../images/icon-lead-rapper.svg';
import pos7 from '../../images/icon-lead-dancer.svg';
import pos8 from '../../images/icon-vocalist.svg';
import pos9 from '../../images/icon-dancer.svg';
import pos10 from '../../images/icon-rapper.svg';
import pos11 from '../../images/icon-center.svg';
import pos12 from '../../images/icon-visual.svg';
import pos13 from '../../images/icon-maknae.svg';

const PositionIcons = ({positions, memberId, iconClass = 'icon-positions'}) => (
  <span className={iconClass}>
    {
      positions.map((pos) => {
        let img;
        switch (pos) {
          case 'pos000001':
            img = pos1;
            break;
          case 'pos000002':
            img = pos2;
            break;
          case 'pos000003':
            img = pos3;
            break;
          case 'pos000004':
            img = pos4;
            break;
          case 'pos000005':
            img = pos5;
            break;
          case 'pos000006':
            img = pos6;
            break;
          case 'pos000007':
            img = pos7;
            break;
          case 'pos000008':
            img = pos8;
            break;
          case 'pos000009':
            img = pos9;
            break;
          case 'pos000010':
            img = pos10;
            break;
          case 'pos000011':
            img = pos11;
            break;
          case 'pos000012':
            img = pos12;
            break;
          case 'pos000013':
            img = pos13;
            break;
          default:
            img = pos8;
        }

        return (
          <img
            key={`${memberId}-${pos}`}
            className="icon icon-pos"
            src={img}
            alt="Position Icon"
          />
        );
      })
    }
  </span>
);

export default PositionIcons;
