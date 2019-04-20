import types from './types';

const initialState = {
  activeMemberPill: '',
  // activeDistribution: {},
  // activeSong: {},
  // activeUnit: {},
  category: 'OFFICIAL',
  distributeView: 'view',
  distributionLines: [],
  rates: {},
  remainder: 100,
  timestampsDict: {
    start: {},
    end: {},
  },

  activeDistribution: {
    id: '-La4TN-3MBxB2pc9DnHC',
    createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
    category: 'WOULD',
    features: [],
    modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
    rates: {
      '-LZJFEse1Y9qr-Zvqs-1': 15.66,
      '-LZJFEskZ-xpLLt44WpV': 22.389999999999997,
      '-LZJFEsrDDhUdTym0GZo': 16.16,
      '-LZJFEstFUh5FQU40RKe': 24.84,
      '-LZJFEsxjzWTx-rET1xE': 27.999999999999996,
      '-LZJFEt1kQzvszYTLrJY': 16.57,
      ALL: 16.25,
      NONE: 4.83,
      max: 27.999999999999996,
      remaining: 0,
      total: 144.7,
    },
    relationships: {
      '1': ['NONE'],
      '2': ['NONE'],
      '3': ['-LZJFEse1Y9qr-Zvqs-1'],
      '4': ['-LZJFEse1Y9qr-Zvqs-1'],
      '5': ['-LZJFEse1Y9qr-Zvqs-1'],
      '6': ['-LZJFEsrDDhUdTym0GZo'],
      '7': ['-LZJFEsrDDhUdTym0GZo'],
      '8': ['-LZJFEsrDDhUdTym0GZo'],
      '9': ['-LZJFEsxjzWTx-rET1xE'],
      '10': ['-LZJFEt1kQzvszYTLrJY'],
      '11': ['-LZJFEt1kQzvszYTLrJY'],
      '12': ['-LZJFEskZ-xpLLt44WpV'],
      '13': ['-LZJFEskZ-xpLLt44WpV'],
      '14': ['-LZJFEsrDDhUdTym0GZo'],
      '15': ['-LZJFEskZ-xpLLt44WpV'],
      '16': ['-LZJFEsxjzWTx-rET1xE'],
      '17': ['-LZJFEsxjzWTx-rET1xE'],
      '18': ['-LZJFEstFUh5FQU40RKe'],
      '19': ['-LZJFEstFUh5FQU40RKe'],
      '20': ['ALL'],
      '21': ['-LZJFEse1Y9qr-Zvqs-1'],
      '22': ['ALL'],
      '23': ['-LZJFEskZ-xpLLt44WpV'],
      '24': ['-LZJFEsrDDhUdTym0GZo'],
      '25': ['-LZJFEt1kQzvszYTLrJY'],
      '26': ['-LZJFEt1kQzvszYTLrJY'],
      '27': ['-LZJFEsxjzWTx-rET1xE'],
      '28': ['-LZJFEsxjzWTx-rET1xE'],
      '29': ['-LZJFEstFUh5FQU40RKe'],
      '30': ['-LZJFEstFUh5FQU40RKe'],
      '31': ['-LZJFEskZ-xpLLt44WpV'],
      '32': ['-LZJFEt1kQzvszYTLrJY'],
      '33': ['-LZJFEt1kQzvszYTLrJY'],
      '34': ['-LZJFEskZ-xpLLt44WpV'],
      '35': ['-LZJFEskZ-xpLLt44WpV'],
      '36': ['-LZJFEsrDDhUdTym0GZo'],
      '37': ['-LZJFEskZ-xpLLt44WpV'],
      '38': ['-LZJFEsxjzWTx-rET1xE'],
      '39': ['-LZJFEsxjzWTx-rET1xE'],
      '40': ['-LZJFEstFUh5FQU40RKe'],
      '41': ['-LZJFEstFUh5FQU40RKe'],
      '42': ['-LZJFEskZ-xpLLt44WpV'],
      '43': ['-LZJFEse1Y9qr-Zvqs-1'],
      '44': ['-LZJFEsrDDhUdTym0GZo'],
      '45': ['-LZJFEsrDDhUdTym0GZo'],
      '46': ['-LZJFEsrDDhUdTym0GZo'],
      '47': ['ALL'],
      '48': ['ALL'],
      '49': ['ALL'],
      '50': ['ALL'],
      '51': ['ALL'],
      '52': ['ALL'],
      '53': ['ALL'],
      '54': ['ALL'],
      '55': ['-LZJFEsxjzWTx-rET1xE'],
      '56': ['-LZJFEsxjzWTx-rET1xE'],
      '57': ['-LZJFEstFUh5FQU40RKe'],
      '58': ['-LZJFEstFUh5FQU40RKe'],
      '59': ['ALL'],
      '60': ['-LZJFEse1Y9qr-Zvqs-1'],
      '61': ['ALL'],
      '62': ['-LZJFEskZ-xpLLt44WpV'],
      '63': ['-LZJFEsxjzWTx-rET1xE'],
    },
    songId: '-La4R2Z9hcKnQCM-KQK_',
    unitId: '-LZJFFC-kZi_o3nehGku',
  },
  activeSong: {
    id: '-La4R2Z9hcKnQCM-KQK_',
    album: "IT'z Different",
    createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
    distribution:
      '[1:25.69:2.42] DDA-DDA-LA-DDA-LA-DDA-LA\n[2:33.41:2.41]  DDA-DDA-LA-DDA-LA-DDA-LA\n\n[3:38.21:1.08]  People look at me, [4:40.15:0.99]  and they tell me\n[5:42.12:3.66]  wemoman bogo naega nallari gattaeyo\n[6:46.34:0.67]  So what? [7:47.8:1.13]  shingyeong an sseo \n[8:49.78:3.31]  I’m sorry I don’t care, don’t care, really don’t care, [9:53.25:1.2]  because\n\n[10:54.57:3.33]  sarang ttawie mongmaeji ana\n[11:58.34:3.29]  sesangen jaeminneun ge deo mana\n[12:61.98:1.32]  eonnideuri malhae [13:63.52:1.97]  cheoldeullyeomyeon meoreottae\n[14:65.58:0.98]  (I’m sorry sorry) [15:66.52:2.37]  cheoldeul saenggak eopseoyo Nope\n\n[16:69.03:3.32]  yeppeugiman hago maeryeogeun eomneun\n[17:72.51:3.5]  aedeulgwa nan dalla dalla dalla\n[18:76.59:3.27]  ni gijune nal matchuryeo haji ma\n[19:79.98:3.8]  nan jigeum naega joa naneun naya\n\n[20:86.23:1.21]  I love myself\n[21:88.15:2.58]  nan mweonga dalla dalla Yeah\n[22:93.88:1.19]  I love myself\n[23:95.81:2.5]  nan mweonga dalla dalla Yeah\n[24:99.69:2.51]  nan neorang dalla dalla Yeah\n\n[25:102.36:1.63]  Bad, bad, I’m sorry I’m bad,\n[26:104.21:1.74]  I’m just the way I am\n[27:106.13:1.78]  nam shingyeong sseugo salgin akkaweo\n[28:108.07:1.62]  hago shipeun il hagido bappa\n[29:109.79:0.82]  My life \n[30:111.65:2.63]  nae mamdaero sal geoya malliji ma\n[31:115.28:2.27]  nan teukbyeolhanikka Yeah\n\n[32:117.96:3.24]  namdeure shiseon jungyochi ana\n[33:121.69:3.34]  nae Style-i joa geuge nanikka\n[34:125.33:1.35]  eonnideuri malhae [35:126.84:2.1]  naega neomu dangdolhadae\n[36:129.05:0.8]  (I’m sorry sorry) [37:129.94:2.15]  bakkeul saenggak eopseoyo Nope\n\n[38:132.33:3.31]  yeppeugiman hago maeryeogeun eomneun\n[39:135.9:3.64]  aedeulgwa nan dalla dalla dalla\n[40:139.9:3.46]  ni gijune nal matchuryeo haji ma\n[41:143.49:3.7]  nan jigeum naega joa naneun naya\n\n[42:150.07:3.7]  Don’t care what people say naneun naega ara\n[43:153.95:4.73]  I’m talking to myself gijukji ma jeolttaero\n[44:158.79:1.42]  gogaereul deulgo [45:160.34:2.15]  ni kkomeul jjocha\n[46:162.58:3.19]  Just keep on dreaming\n\n[47:166.13:1.34]  Keep your chin up, [48:167.8:1.34]  we got your back\n[49:169.88:1.46]  Keep your head up, [50:171.62:1.55]  just keep on dreaming\n[51:173.75:1.41]  Keep your chin up, [52:175.52:1.27]  we got your back\n[53:177.63:1.48]  Keep your head up, [54:179.38:1.5]  just keep on dreaming\n\n[55:182.29:3.29]  yeppeugiman hago maeryeogeun eomneun\n[56:185.73:3.68]  aedeulgwa nan dalla dalla dalla\n[57:189.82:3.34]  ni gijune nal matchuryeo haji ma\n[58:193.28:3.82]  nan jigeum naega joa naneun naya\n\n[59:199.49:1.23]  I love myself\n[60:201.41:2.62]  nan mweonga dalla dalla Yeah\n[61:207.18:1.27]  I love myself\n[62:209.09:2.66]  nan mweonga dalla dalla Yeah\n[63:212.93:2.66]  nan neorang dalla dalla Yeah\n',
    groupSize: 5,
    modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
    originalArtist: 'ITZY',
    originalArtistId: '-L_ul8qKXoH09zK0qo6W',
    private: false,
    query: "dalla dalla itzy it'z different",
    single: true,
    title: 'Dalla Dalla',
    videoId: 'pNfTK39k55U',
  },
  activeUnit: {
    id: '-LZJFFC-kZi_o3nehGku',
    artistId: '-LZJFF1-RtaGtxdWblMo',
    averages: [],
    createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
    debutYear: 2001,
    distributions: [
      {
        id: '-La4TN-3MBxB2pc9DnHC',
        createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
        category: 'WOULD',
        features: [],
        modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
        rates: {
          '-LZJFEse1Y9qr-Zvqs-1': 15.66,
          '-LZJFEskZ-xpLLt44WpV': 22.389999999999997,
          '-LZJFEsrDDhUdTym0GZo': 16.16,
          '-LZJFEstFUh5FQU40RKe': 24.84,
          '-LZJFEsxjzWTx-rET1xE': 27.999999999999996,
          '-LZJFEt1kQzvszYTLrJY': 16.57,
          ALL: 16.25,
          NONE: 4.83,
          max: 27.999999999999996,
          remaining: 0,
          total: 144.7,
        },
        relationships: {
          '1': ['NONE'],
          '2': ['NONE'],
          '3': ['-LZJFEse1Y9qr-Zvqs-1'],
          '4': ['-LZJFEse1Y9qr-Zvqs-1'],
          '5': ['-LZJFEse1Y9qr-Zvqs-1'],
          '6': ['-LZJFEsrDDhUdTym0GZo'],
          '7': ['-LZJFEsrDDhUdTym0GZo'],
          '8': ['-LZJFEsrDDhUdTym0GZo'],
          '9': ['-LZJFEsxjzWTx-rET1xE'],
          '10': ['-LZJFEt1kQzvszYTLrJY'],
          '11': ['-LZJFEt1kQzvszYTLrJY'],
          '12': ['-LZJFEskZ-xpLLt44WpV'],
          '13': ['-LZJFEskZ-xpLLt44WpV'],
          '14': ['-LZJFEsrDDhUdTym0GZo'],
          '15': ['-LZJFEskZ-xpLLt44WpV'],
          '16': ['-LZJFEsxjzWTx-rET1xE'],
          '17': ['-LZJFEsxjzWTx-rET1xE'],
          '18': ['-LZJFEstFUh5FQU40RKe'],
          '19': ['-LZJFEstFUh5FQU40RKe'],
          '20': ['ALL'],
          '21': ['-LZJFEse1Y9qr-Zvqs-1'],
          '22': ['ALL'],
          '23': ['-LZJFEskZ-xpLLt44WpV'],
          '24': ['-LZJFEsrDDhUdTym0GZo'],
          '25': ['-LZJFEt1kQzvszYTLrJY'],
          '26': ['-LZJFEt1kQzvszYTLrJY'],
          '27': ['-LZJFEsxjzWTx-rET1xE'],
          '28': ['-LZJFEsxjzWTx-rET1xE'],
          '29': ['-LZJFEstFUh5FQU40RKe'],
          '30': ['-LZJFEstFUh5FQU40RKe'],
          '31': ['-LZJFEskZ-xpLLt44WpV'],
          '32': ['-LZJFEt1kQzvszYTLrJY'],
          '33': ['-LZJFEt1kQzvszYTLrJY'],
          '34': ['-LZJFEskZ-xpLLt44WpV'],
          '35': ['-LZJFEskZ-xpLLt44WpV'],
          '36': ['-LZJFEsrDDhUdTym0GZo'],
          '37': ['-LZJFEskZ-xpLLt44WpV'],
          '38': ['-LZJFEsxjzWTx-rET1xE'],
          '39': ['-LZJFEsxjzWTx-rET1xE'],
          '40': ['-LZJFEstFUh5FQU40RKe'],
          '41': ['-LZJFEstFUh5FQU40RKe'],
          '42': ['-LZJFEskZ-xpLLt44WpV'],
          '43': ['-LZJFEse1Y9qr-Zvqs-1'],
          '44': ['-LZJFEsrDDhUdTym0GZo'],
          '45': ['-LZJFEsrDDhUdTym0GZo'],
          '46': ['-LZJFEsrDDhUdTym0GZo'],
          '47': ['ALL'],
          '48': ['ALL'],
          '49': ['ALL'],
          '50': ['ALL'],
          '51': ['ALL'],
          '52': ['ALL'],
          '53': ['ALL'],
          '54': ['ALL'],
          '55': ['-LZJFEsxjzWTx-rET1xE'],
          '56': ['-LZJFEsxjzWTx-rET1xE'],
          '57': ['-LZJFEstFUh5FQU40RKe'],
          '58': ['-LZJFEstFUh5FQU40RKe'],
          '59': ['ALL'],
          '60': ['-LZJFEse1Y9qr-Zvqs-1'],
          '61': ['ALL'],
          '62': ['-LZJFEskZ-xpLLt44WpV'],
          '63': ['-LZJFEsxjzWTx-rET1xE'],
        },
        songId: '-La4R2Z9hcKnQCM-KQK_',
        unitId: '-LZJFFC-kZi_o3nehGku',
        distribution:
          '[1:25.69:2.42] DDA-DDA-LA-DDA-LA-DDA-LA\n[2:33.41:2.41]  DDA-DDA-LA-DDA-LA-DDA-LA\n\n[3:38.21:1.08]  People look at me, [4:40.15:0.99]  and they tell me\n[5:42.12:3.66]  wemoman bogo naega nallari gattaeyo\n[6:46.34:0.67]  So what? [7:47.8:1.13]  shingyeong an sseo \n[8:49.78:3.31]  I’m sorry I don’t care, don’t care, really don’t care, [9:53.25:1.2]  because\n\n[10:54.57:3.33]  sarang ttawie mongmaeji ana\n[11:58.34:3.29]  sesangen jaeminneun ge deo mana\n[12:61.98:1.32]  eonnideuri malhae [13:63.52:1.97]  cheoldeullyeomyeon meoreottae\n[14:65.58:0.98]  (I’m sorry sorry) [15:66.52:2.37]  cheoldeul saenggak eopseoyo Nope\n\n[16:69.03:3.32]  yeppeugiman hago maeryeogeun eomneun\n[17:72.51:3.5]  aedeulgwa nan dalla dalla dalla\n[18:76.59:3.27]  ni gijune nal matchuryeo haji ma\n[19:79.98:3.8]  nan jigeum naega joa naneun naya\n\n[20:86.23:1.21]  I love myself\n[21:88.15:2.58]  nan mweonga dalla dalla Yeah\n[22:93.88:1.19]  I love myself\n[23:95.81:2.5]  nan mweonga dalla dalla Yeah\n[24:99.69:2.51]  nan neorang dalla dalla Yeah\n\n[25:102.36:1.63]  Bad, bad, I’m sorry I’m bad,\n[26:104.21:1.74]  I’m just the way I am\n[27:106.13:1.78]  nam shingyeong sseugo salgin akkaweo\n[28:108.07:1.62]  hago shipeun il hagido bappa\n[29:109.79:0.82]  My life \n[30:111.65:2.63]  nae mamdaero sal geoya malliji ma\n[31:115.28:2.27]  nan teukbyeolhanikka Yeah\n\n[32:117.96:3.24]  namdeure shiseon jungyochi ana\n[33:121.69:3.34]  nae Style-i joa geuge nanikka\n[34:125.33:1.35]  eonnideuri malhae [35:126.84:2.1]  naega neomu dangdolhadae\n[36:129.05:0.8]  (I’m sorry sorry) [37:129.94:2.15]  bakkeul saenggak eopseoyo Nope\n\n[38:132.33:3.31]  yeppeugiman hago maeryeogeun eomneun\n[39:135.9:3.64]  aedeulgwa nan dalla dalla dalla\n[40:139.9:3.46]  ni gijune nal matchuryeo haji ma\n[41:143.49:3.7]  nan jigeum naega joa naneun naya\n\n[42:150.07:3.7]  Don’t care what people say naneun naega ara\n[43:153.95:4.73]  I’m talking to myself gijukji ma jeolttaero\n[44:158.79:1.42]  gogaereul deulgo [45:160.34:2.15]  ni kkomeul jjocha\n[46:162.58:3.19]  Just keep on dreaming\n\n[47:166.13:1.34]  Keep your chin up, [48:167.8:1.34]  we got your back\n[49:169.88:1.46]  Keep your head up, [50:171.62:1.55]  just keep on dreaming\n[51:173.75:1.41]  Keep your chin up, [52:175.52:1.27]  we got your back\n[53:177.63:1.48]  Keep your head up, [54:179.38:1.5]  just keep on dreaming\n\n[55:182.29:3.29]  yeppeugiman hago maeryeogeun eomneun\n[56:185.73:3.68]  aedeulgwa nan dalla dalla dalla\n[57:189.82:3.34]  ni gijune nal matchuryeo haji ma\n[58:193.28:3.82]  nan jigeum naega joa naneun naya\n\n[59:199.49:1.23]  I love myself\n[60:201.41:2.62]  nan mweonga dalla dalla Yeah\n[61:207.18:1.27]  I love myself\n[62:209.09:2.66]  nan mweonga dalla dalla Yeah\n[63:212.93:2.66]  nan neorang dalla dalla Yeah\n',
        originalArtist: 'ITZY',
        title: 'Dalla Dalla',
        videoId: 'pNfTK39k55U',
      },
    ],
    distributions_legacy: [],
    members: {
      '-LZJFEse1Y9qr-Zvqs-1': {
        age: 37,
        birthdate: 19810412,
        colorId: 'col000022',
        color: {
          b: 238,
          count: 12,
          g: 104,
          hex: '#7B68EE',
          name: 'purple',
          number: 22,
          r: 132,
          id: 'col000022',
        },
        createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
        gender: 'FEMALE',
        initials: 'MR',
        name: 'Mari',
        modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
        nationality: 'BRAZILIAN',
        positions: ['LEADER', 'RAPPER', 'VISUAL', 'VOCALIST'],
        private: false,
        referenceArtist: 'Banda Vyrus',
        id: '-LZJFEse1Y9qr-Zvqs-1',
      },
      '-LZJFEskZ-xpLLt44WpV': {
        age: 36,
        birthdate: 19820422,
        colorId: 'col000026',
        color: {
          b: 233,
          count: 17,
          g: 107,
          hex: '#FC6BE9',
          name: 'magenta',
          number: 26,
          r: 252,
          id: 'col000026',
        },
        createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
        gender: 'FEMALE',
        initials: 'MB',
        name: 'Mab',
        modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
        nationality: 'BRAZILIAN',
        positions: ['LEAD_VOCALIST', 'VISUAL', 'VOCALIST'],
        private: false,
        referenceArtist: 'Banda Vyrus',
        id: '-LZJFEskZ-xpLLt44WpV',
      },
      '-LZJFEsrDDhUdTym0GZo': {
        age: 36,
        birthdate: 19820911,
        colorId: 'col000020',
        color: {
          b: 255,
          count: 18,
          g: 111,
          hex: '#406FFF',
          name: 'blue',
          number: 20,
          r: 64,
          id: 'col000020',
        },
        createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
        gender: 'FEMALE',
        initials: 'CD',
        name: 'CD',
        modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
        nationality: 'BRAZILIAN',
        positions: ['LEAD_VOCALIST'],
        private: false,
        referenceArtist: 'Banda Vyrus',
        id: '-LZJFEsrDDhUdTym0GZo',
      },
      '-LZJFEstFUh5FQU40RKe': {
        age: 35,
        birthdate: 19830712,
        colorId: 'col000008',
        color: {
          b: 0,
          count: 14,
          g: 228,
          hex: '#FFE400',
          name: 'yellow',
          number: 8,
          r: 255,
          id: 'col000008',
        },
        createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
        gender: 'FEMALE',
        initials: 'PR',
        name: 'Pri',
        modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
        nationality: 'BRAZILIAN',
        positions: ['MAIN_DANCER', 'MAIN_VOCALIST'],
        private: false,
        referenceArtist: 'Banda Vyrus',
        id: '-LZJFEstFUh5FQU40RKe',
      },
      '-LZJFEsxjzWTx-rET1xE': {
        age: 34,
        birthdate: 19840402,
        colorId: 'col000001',
        color: {
          b: 60,
          count: 13,
          g: 31,
          hex: '#D01f3C',
          name: 'red',
          number: 1,
          r: 208,
          id: 'col000001',
        },
        createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
        gender: 'FEMALE',
        initials: 'DE',
        name: 'Deby',
        modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
        nationality: 'BRAZILIAN',
        positions: [
          'CENTER',
          'LEADER',
          'LEAD_DANCER',
          'LEAD_VOCALIST',
          'MAIN_DANCER',
          'MAIN_RAPPER',
        ],
        private: false,
        referenceArtist: 'Banda Vyrus',
        id: '-LZJFEsxjzWTx-rET1xE',
      },
      '-LZJFEt1kQzvszYTLrJY': {
        age: 34,
        birthdate: 19840404,
        colorId: 'col000012',
        color: {
          b: 23,
          count: 16,
          g: 184,
          hex: '#7FB817',
          name: 'green',
          number: 12,
          r: 127,
          id: 'col000012',
        },
        createdBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
        gender: 'FEMALE',
        initials: 'MK',
        name: 'Mika',
        modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
        nationality: 'BRAZILIAN',
        positions: ['LEAD_RAPPER', 'VOCALIST'],
        private: false,
        referenceArtist: 'Banda Vyrus',
        id: '-LZJFEt1kQzvszYTLrJY',
      },
    },
    modifiedBy: 'hbFlRswbZkepQfaONzoyB6EuJSA2',
    name: 'OT6',
    official: true,
    private: false,
    subUnit: false,
    songsDict: {
      '-L_6Dqn4qpx3aru3dSve': '-L_kf2xp4WghvAmkITWa',
      '-La4Lg41emt8zrteENSk': '-La4OusOW1rBOCfksei4',
      '-La4R2Z9hcKnQCM-KQK_': '-La4TN-3MBxB2pc9DnHC',
      '-LaN6osi2gjH03HexnkI': '-LaNA1mVtkUuv5WWBTce',
      '-LawlFAODfAnYrR_TFJd': '-LawtZuumBwhKnO5IZrw',
      '-LbAyzTscIav2rIA1U9n': '-LbB0YsN-yp_CnYjbSEM',
      '-Lbv8GTt4f2SIZVCnPv_': '-LbvCfghH5BvHJx_KkhA',
      '-L_4OOhzdx5L1qgyuyoU': '-Lc9pdm-AHCrt-goKLWq',
      '-L_6KEydsvwa3ckYe4MS': '-LcFaFuxAwuy4CYQSE8X',
      '-LcKAsyX-LPOQT-ikzLS': '-LcKCpoX-Pj3dQWvGl21',
      '-LcKFJWdfalTIo72Ek00': '-LcKHZgV-RZ3Ppan8Ium',
    },
    complete: true,
    artistName: 'Banda Vyrus',
    genre: 'Pop',
  },
};

export default function reducer(prevState = initialState, action) {
  let newState = Object.assign({}, prevState);

  switch (action.type) {
    case types.RESET_DISTRIBUTE:
      newState = Object.assign({}, initialState);
      break;

    case types.RESET_DISTRIBUTE_SONG:
      newState = Object.assign({}, initialState);
      newState.activeUnit = Object.assign({}, prevState.activeUnit);
      break;

    case types.SET_ACTIVE_DISTRIBUTION:
      newState.activeDistribution = action.payload;
      break;

    case types.SET_ACTIVE_MEMBER_PILL:
      newState.activeMemberPill = action.payload;
      break;

    case types.SET_ACTIVE_SONG:
      newState.activeSong = action.payload;
      break;

    case types.SET_ACTIVE_UNIT:
      newState.activeUnit = action.payload;
      break;

    case types.SET_DISTRIBUTE_VIEW:
      newState.distributeView = action.payload;
      break;

    case types.SET_DISTRIBUTION_CATEGORY:
      newState.category = action.payload;
      break;

    case types.SET_DISTRIBUTION_LINES:
      newState.distributionLines = action.payload;
      break;

    case types.SET_DISTRIBUTION_REMAINDER:
      newState.remainder = action.payload;
      break;

    case types.SET_RATES:
      newState.rates = action.payload;
      break;

    case types.SET_TIMESTAMPS_DICT:
      newState.timestampsDict = action.payload;
      break;

    default:
      return prevState;
  }

  return newState;
}
