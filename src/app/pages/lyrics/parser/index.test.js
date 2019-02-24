import parser from './index';

const MEMBERS = {
  '-LVRFeNAc2nf-uZlIurE': {
    colorId: 'col000020',
    name: 'Kyle',
    id: '-LVRFeNAc2nf-uZlIurE',
  },
  '-LVRFeOG1HJSZSdHbotB': {
    colorId: 'col000002',
    name: 'Anthony',
    id: '-LVRFeOG1HJSZSdHbotB',
  },
  '-LVRFePJxP4fCWgN_Lqf': {
    colorId: 'col000008',
    name: 'Viktor',
    id: '-LVRFePJxP4fCWgN_Lqf',
  },
  '-LVRFeQMJ5rcbg-U-KRY': {
    colorId: 'col000023',
    name: 'Ira',
    id: '-LVRFeQMJ5rcbg-U-KRY',
  },
  '-LVRFeRPTdA6WiOv1CO7': {
    colorId: 'col000012',
    name: 'Seth',
    id: '-LVRFeRPTdA6WiOv1CO7',
  },
};

describe('Lyrics/Parser', () => {
  describe('Single lines', () => {
    describe('Basic parts', () => {
      it('it parses 1 line with 1 part', () => {
        const sample = '[KYLE] I sing';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  line: ['I sing'],
                  adlib: [0],
                },
              ],
            ],
          ],
          uses: { KYLE: 1 },
        });
      });

      it('it parses 1 line with 2 parts', () => {
        const sample = '[KYLE] I sing [ANTHONY] I dance';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  line: ['I sing'],
                  adlib: [0],
                },
                {
                  singers: ['ANTHONY'],
                  colors: ['col000002'],
                  line: ['I dance'],
                  adlib: [0],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, KYLE: 1 },
        });
      });

      it('it parses 1 line with 3 parts', () => {
        const sample = '[KYLE] I sing [ANTHONY] I dance [VIKTOR] I rap';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  line: ['I sing'],
                  adlib: [0],
                },
                {
                  singers: ['ANTHONY'],
                  colors: ['col000002'],
                  line: ['I dance'],
                  adlib: [0],
                },
                {
                  singers: ['VIKTOR'],
                  colors: ['col000008'],
                  line: ['I rap'],
                  adlib: [0],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, KYLE: 1, VIKTOR: 1 },
        });
      });

      it('it parses 1 line with 4 parts', () => {
        const sample =
          '[KYLE] I sing [ANTHONY] I dance [VIKTOR] I rap [IRA] I pose';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  line: ['I sing'],
                  adlib: [0],
                },
                {
                  singers: ['ANTHONY'],
                  colors: ['col000002'],
                  line: ['I dance'],
                  adlib: [0],
                },
                {
                  singers: ['VIKTOR'],
                  colors: ['col000008'],
                  line: ['I rap'],
                  adlib: [0],
                },
                {
                  singers: ['IRA'],
                  colors: ['col000023'],
                  line: ['I pose'],
                  adlib: [0],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, KYLE: 1, VIKTOR: 1, IRA: 1 },
        });
      });

      it('it parses 1 line with 5 parts', () => {
        const sample =
          '[KYLE] I sing [ANTHONY] I dance [VIKTOR] I rap [IRA] I pose [SETH] I talk';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  line: ['I sing'],
                  adlib: [0],
                },
                {
                  singers: ['ANTHONY'],
                  colors: ['col000002'],
                  line: ['I dance'],
                  adlib: [0],
                },
                {
                  singers: ['VIKTOR'],
                  colors: ['col000008'],
                  line: ['I rap'],
                  adlib: [0],
                },
                {
                  singers: ['IRA'],
                  colors: ['col000023'],
                  line: ['I pose'],
                  adlib: [0],
                },
                {
                  singers: ['SETH'],
                  colors: ['col000012'],
                  line: ['I talk'],
                  adlib: [0],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, KYLE: 1, VIKTOR: 1, IRA: 1, SETH: 1 },
        });
      });
    });

    describe('Multiple singers in the same part', () => {
      it('it parses 1 line with 1 part and 2 singers', () => {
        const sample = '[KYLE/ANTHONY] We sing';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE', 'ANTHONY'],
                  colors: ['col000020', 'col000002'],
                  line: ['We sing'],
                  adlib: [0],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, KYLE: 1 },
        });
      });

      it('it parses 1 line with 1 part and 3 singers', () => {
        const sample = '[KYLE/ANTHONY/VIKTOR] We dance';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE', 'ANTHONY', 'VIKTOR'],
                  colors: ['col000020', 'col000002', 'col000008'],
                  line: ['We dance'],
                  adlib: [0],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, KYLE: 1, VIKTOR: 1 },
        });
      });

      it('it parses 1 line with 1 part and 4 singers', () => {
        const sample = '[KYLE/ANTHONY/VIKTOR/IRA] We rap';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE', 'ANTHONY', 'VIKTOR', 'IRA'],
                  colors: ['col000020', 'col000002', 'col000008', 'col000023'],
                  line: ['We rap'],
                  adlib: [0],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, IRA: 1, KYLE: 1, VIKTOR: 1 },
        });
      });

      it('it parses 1 line with 1 part and 5 singers', () => {
        const sample = '[KYLE/ANTHONY/VIKTOR/IRA/SETH] We pose';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE', 'ANTHONY', 'VIKTOR', 'IRA', 'SETH'],
                  colors: [
                    'col000020',
                    'col000002',
                    'col000008',
                    'col000023',
                    'col000012',
                  ],
                  line: ['We pose'],
                  adlib: [0],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, IRA: 1, KYLE: 1, SETH: 1, VIKTOR: 1 },
        });
      });
    });

    describe('Main singers and sub singers ()', () => {
      it('it parses 1 line with 1 main singer and 1 sub singer', () => {
        const sample = '[KYLE (ANTHONY)] I sing (I dance)';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  subSingers: ['ANTHONY'],
                  colors: ['col000020'],
                  subColors: ['col000002'],
                  line: ['I sing', 'I dance'],
                  adlib: [0, 1],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, KYLE: 1 },
        });
      });

      it('it parses 1 line with 1 main singer and 1 sub singer with variable lines', () => {
        const sample = '[KYLE (ANTHONY)] I sing (I dance) I rap (I talk)';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  subSingers: ['ANTHONY'],
                  colors: ['col000020'],
                  subColors: ['col000002'],
                  line: ['I sing', 'I dance', 'I rap', 'I talk'],
                  adlib: [0, 1, 0, 1],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, KYLE: 1 },
        });
      });

      it('it parses 1 line with 1 main singer and 1 sub singer, then another main singer', () => {
        const sample = '[KYLE (ANTHONY)] I sing (I dance) [VIKTOR] I rap';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  subSingers: ['ANTHONY'],
                  colors: ['col000020'],
                  subColors: ['col000002'],
                  line: ['I sing', 'I dance'],
                  adlib: [0, 1],
                },
                {
                  singers: ['VIKTOR'],
                  colors: ['col000008'],
                  line: ['I rap'],
                  adlib: [0],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, KYLE: 1, VIKTOR: 1 },
        });
      });

      it('it parses 1 line with 1 main singer and 1 sub singer, then another main singer (variable lines)', () => {
        const sample =
          '[KYLE (ANTHONY)] I sing (I dance) [VIKTOR] I rap (I dance)';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  subSingers: ['ANTHONY'],
                  colors: ['col000020'],
                  subColors: ['col000002'],
                  line: ['I sing', 'I dance'],
                  adlib: [0, 1],
                },
                {
                  singers: ['VIKTOR'],
                  subSingers: ['ANTHONY'],
                  colors: ['col000008'],
                  subColors: ['col000002'],
                  line: ['I rap', 'I dance'],
                  adlib: [0, 1],
                  omitSub: true,
                },
              ],
            ],
          ],
          uses: { ANTHONY: 2, KYLE: 1, VIKTOR: 1 },
        });
      });

      it('it parses 1 line with 2 pairs of main singer and 1 sub singer', () => {
        const sample =
          '[KYLE (ANTHONY)] I sing (I dance) [VIKTOR (IRA)] I rap (I pose)';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  subSingers: ['ANTHONY'],
                  colors: ['col000020'],
                  subColors: ['col000002'],
                  line: ['I sing', 'I dance'],
                  adlib: [0, 1],
                },
                {
                  singers: ['VIKTOR'],
                  subSingers: ['IRA'],
                  colors: ['col000008'],
                  subColors: ['col000023'],
                  line: ['I rap', 'I pose'],
                  adlib: [0, 1],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, IRA: 1, KYLE: 1, VIKTOR: 1 },
        });
      });

      it('it parses 1 line with 2 pairs of main singer and 1 sub singer (variable lines)', () => {
        const sample =
          '[KYLE (ANTHONY)] I sing (I dance) [VIKTOR (IRA)] I rap (I pose) I walk (I talk)';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  subSingers: ['ANTHONY'],
                  colors: ['col000020'],
                  subColors: ['col000002'],
                  line: ['I sing', 'I dance'],
                  adlib: [0, 1],
                },
                {
                  singers: ['VIKTOR'],
                  subSingers: ['IRA'],
                  colors: ['col000008'],
                  subColors: ['col000023'],
                  line: ['I rap', 'I pose', 'I walk', 'I talk'],
                  adlib: [0, 1, 0, 1],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, IRA: 1, KYLE: 1, VIKTOR: 1 },
        });
      });
    });

    describe('Multiple main singers and multiple sub singers', () => {
      it('it parses 1 line with 2 main singers and 1 sub singer', () => {
        const sample = '[KYLE/ANTHONY (VIKTOR)] I sing (I dance)';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE', 'ANTHONY'],
                  subSingers: ['VIKTOR'],
                  colors: ['col000020', 'col000002'],
                  subColors: ['col000008'],
                  line: ['I sing', 'I dance'],
                  adlib: [0, 1],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, KYLE: 1, VIKTOR: 1 },
        });
      });

      it('it parses 1 line with 1 main singer and 2 sub singers', () => {
        const sample = '[KYLE (ANTHONY/VIKTOR)] I sing (I dance)';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  subSingers: ['ANTHONY', 'VIKTOR'],
                  colors: ['col000020'],
                  subColors: ['col000002', 'col000008'],
                  line: ['I sing', 'I dance'],
                  adlib: [0, 1],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, KYLE: 1, VIKTOR: 1 },
        });
      });

      it('it parses 1 line with 2 main singers and 2 sub singers', () => {
        const sample = '[KYLE/ANTHONY (VIKTOR/IRA)] I sing (I dance)';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE', 'ANTHONY'],
                  subSingers: ['VIKTOR', 'IRA'],
                  colors: ['col000020', 'col000002'],
                  subColors: ['col000008', 'col000023'],
                  line: ['I sing', 'I dance'],
                  adlib: [0, 1],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, KYLE: 1, VIKTOR: 1, IRA: 1 },
        });
      });
    });

    describe('Only sub singers', () => {
      it('it parses 1 line with 1 sub singer', () => {
        const sample = '[(ANTHONY)] (I dance)';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                  line: ['I dance'],
                  adlib: [1],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1 },
        });
      });
    });

    describe('Unassigned sub singers', () => {
      it('it parses 1 line with 1 anon sub singer', () => {
        const sample = '[ANTHONY] I sing (yeah)';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['ANTHONY'],
                  colors: ['col000002'],
                  line: ['I sing', 'yeah'],
                  adlib: [0, 2],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1 },
        });
      });
    });

    describe('Handling ALL', () => {
      it('it parses 1 line with ALL', () => {
        const sample = '[ALL] We sing';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['ALL'],
                  colors: ['col000000'],
                  line: ['We sing'],
                  adlib: [0],
                },
              ],
            ],
          ],
          uses: { ALL: 1 },
        });
      });

      it('it parses 1 line with ALL and a lead singer', () => {
        const sample = '[ALL/KYLE] We sing';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['ALL', 'KYLE'],
                  colors: ['col000000', 'col000020'],
                  line: ['We sing'],
                  adlib: [0],
                },
              ],
            ],
          ],
          uses: { ALL: 1, KYLE: 1 },
        });
      });

      it('it parses 1 line with ALL and a sub singer', () => {
        const sample = '[ALL (KYLE)] We sing (yeah)';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['ALL'],
                  colors: ['col000000'],
                  subSingers: ['KYLE'],
                  subColors: ['col000020'],
                  line: ['We sing', 'yeah'],
                  adlib: [0, 1],
                },
              ],
            ],
          ],
          uses: { ALL: 1, KYLE: 1 },
        });
      });
    });
  });

  describe('Multiple lines', () => {
    describe('Sequential lines and singers state', () => {
      it('it keeps the reference of previous singers when line does not have one', () => {
        const sample = '[KYLE] I sing\nI dance';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  line: ['I sing'],
                  adlib: [0],
                },
              ],
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  line: ['I dance'],
                  adlib: [0],
                  omit: true,
                },
              ],
            ],
          ],
          uses: { KYLE: 2 },
        });
      });

      it('it keeps the reference of previous singers and sub singers when line does not have one', () => {
        const sample = '[KYLE (ANTHONY)] I sing (I rap)\nI dance (I pose)';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                  line: ['I sing', 'I rap'],
                  adlib: [0, 1],
                },
              ],
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                  line: ['I dance', 'I pose'],
                  adlib: [0, 1],
                  omit: true,
                  omitSub: true,
                },
              ],
            ],
          ],
          uses: { ANTHONY: 2, KYLE: 2 },
        });
      });

      it('it keeps the reference of previous singers and sub singers when line does not have one and starts with sub singer', () => {
        const sample = '[KYLE (ANTHONY)] (I dance) I sing\n(I rap) I walk';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                  line: ['I dance', 'I sing'],
                  adlib: [1, 0],
                },
              ],
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                  line: ['I rap', 'I walk'],
                  adlib: [1, 0],
                  omit: true,
                  omitSub: true,
                },
              ],
            ],
          ],
          uses: { ANTHONY: 2, KYLE: 2 },
        });
      });
    });

    describe('Non-sequential lines', () => {
      it('it resets the state when preceeded by an empty line', () => {
        const sample = '[KYLE] I sing\n\nWe sing';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  line: ['I sing'],
                  adlib: [0],
                },
              ],
            ],
            [
              [
                {
                  line: ['We sing'],
                  adlib: [3],
                },
              ],
            ],
          ],
          uses: { KYLE: 1 },
        });
      });

      it('it resets the state when preceeded by an empty line (starting with adlib)', () => {
        const sample = '[(KYLE)] (Oh yeah)\n\nWe dance';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  subSingers: ['KYLE'],
                  subColors: ['col000020'],
                  line: ['Oh yeah'],
                  adlib: [1],
                },
              ],
            ],

            [
              [
                {
                  line: ['We dance'],
                  adlib: [3],
                },
              ],
            ],
          ],
          uses: { KYLE: 1 },
        });
      });

      it('it resets the state when preceeded by an empty line (all adlibs)', () => {
        const sample = '[(KYLE)] (Oh yeah)\n\n(We dance)';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  subSingers: ['KYLE'],
                  subColors: ['col000020'],
                  line: ['Oh yeah'],
                  adlib: [1],
                },
              ],
            ],

            [
              [
                {
                  line: ['We dance'],
                  adlib: [2],
                },
              ],
            ],
          ],
          uses: { KYLE: 1 },
        });
      });
    });

    describe('Unassigned sub singers', () => {
      it('it parses 1 line with 1 anon sub singer', () => {
        const sample = '[KYLE (ANTHONY)] (I dance)\n\n[ANTHONY] I sing (yeah)';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  line: ['I dance'],
                  adlib: [1],
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                },
              ],
            ],
            [
              [
                {
                  singers: ['ANTHONY'],
                  colors: ['col000002'],
                  line: ['I sing', 'yeah'],
                  adlib: [0, 2],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 2, KYLE: 1 },
        });
      });

      it('it parses multiple lines with 1 anon sub singer', () => {
        const sample = '[ANTHONY] I sing (yeah)\nI dance (yeah)';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['ANTHONY'],
                  colors: ['col000002'],
                  line: ['I sing', 'yeah'],
                  adlib: [0, 2],
                },
              ],
              [
                {
                  singers: ['ANTHONY'],
                  colors: ['col000002'],
                  line: ['I dance', 'yeah'],
                  adlib: [0, 2],
                  omit: true,
                },
              ],
            ],
          ],
          uses: { ANTHONY: 2 },
        });
      });
    });
  });

  describe('Third singer {}', () => {
    describe('Unassigned choir', () => {
      it('it parses 1 line with 1 main singer and 1 anon choir singer', () => {
        const sample = '[KYLE] I sing {yeah}';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  line: ['I sing', 'yeah'],
                  adlib: [0, 2],
                },
              ],
            ],
          ],
          uses: { KYLE: 1 },
        });
      });

      it('it parses 1 line with 1 main singer and 1 anon choir singer (variable line)', () => {
        const sample = '[KYLE] I sing {yeah} I dance {yeah}';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  line: ['I sing', 'yeah', 'I dance', 'yeah'],
                  adlib: [0, 2, 0, 2],
                },
              ],
            ],
          ],
          uses: { KYLE: 1 },
        });
      });

      it('it parses 1 line with 1 main singer and 1 anon choir singer (starts with choir)', () => {
        const sample = '[KYLE] {yeah} I sing';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  line: ['yeah', 'I sing'],
                  adlib: [2, 0],
                },
              ],
            ],
          ],
          uses: { KYLE: 1 },
        });
      });

      it('it parses 1 line with 1 main singer, 1 sub singer and 1 anon choir singer', () => {
        const sample = '[KYLE (ANTHONY)] I sing (I dance) {yeah}';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                  line: ['I sing', 'I dance', 'yeah'],
                  adlib: [0, 1, 2],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, KYLE: 1 },
        });
      });

      it('it parses 1 line with 1 main singer, 1 sub singer and 1 anon choir singer (variable line)', () => {
        const sample =
          '[KYLE (ANTHONY)] I sing {yeah} (I dance) {yeah} I rap (I walk)';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                  line: [
                    'I sing',
                    'yeah',
                    'I dance',
                    'yeah',
                    'I rap',
                    'I walk',
                  ],
                  adlib: [0, 2, 1, 2, 0, 1],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, KYLE: 1 },
        });
      });

      it('it parses 1 line with 1 main singer, 1 sub singer and 1 choir singer', () => {
        const sample = '[KYLE (ANTHONY) {VIKTOR}] I sing (I dance) {yeah}';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                  choirSingers: ['VIKTOR'],
                  choirColors: ['col000008'],
                  line: ['I sing', 'I dance', 'yeah'],
                  adlib: [0, 1, 4],
                },
              ],
            ],
          ],
          uses: { ANTHONY: 1, KYLE: 1, VIKTOR: 1 },
        });
      });

      it('it parses multiple lines with 1 main singer, and 1 anon choir singer', () => {
        const sample = '[KYLE] I sing {yeah}\nI dance {yeah}';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  line: ['I sing', 'yeah'],
                  adlib: [0, 2],
                },
              ],
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  line: ['I dance', 'yeah'],
                  adlib: [0, 2],
                  omit: true,
                },
              ],
            ],
          ],
          uses: { KYLE: 2 },
        });
      });

      it('it parses multiple lines with 1 main singer, 1 sub singer, and 1 anon choir singer', () => {
        const sample =
          '[KYLE (ANTHONY)] I sing (I dance) {yeah}\nI rap (I walk) {yeah}';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                  line: ['I sing', 'I dance', 'yeah'],
                  adlib: [0, 1, 2],
                },
              ],
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                  line: ['I rap', 'I walk', 'yeah'],
                  adlib: [0, 1, 2],
                  omit: true,
                  omitSub: true,
                },
              ],
            ],
          ],
          uses: { ANTHONY: 2, KYLE: 2 },
        });
      });

      it('it parses multiple lines with 1 main singer, 1 sub singer, and 1 anon choir singer (variable lines)', () => {
        const sample = '[KYLE (ANTHONY)] I sing {yeah}\n(I dance) {yeah}';
        const result = parser(sample, MEMBERS, 1);
        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                  line: ['I sing', 'yeah'],
                  adlib: [0, 2],
                },
              ],
              [
                {
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                  line: ['I dance', 'yeah'],
                  adlib: [1, 2],
                  omitSub: true,
                },
              ],
            ],
          ],
          uses: { ANTHONY: 2, KYLE: 1 },
        });
      });

      it('it parses multiple lines with 1 main singer and 1 choir singer (variable lines)', () => {
        const sample = '[KYLE {VIKTOR}] I sing {yeah}\nI dance {yeah}';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  choirSingers: ['VIKTOR'],
                  choirColors: ['col000008'],
                  line: ['I sing', 'yeah'],
                  adlib: [0, 4],
                },
              ],
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  choirSingers: ['VIKTOR'],
                  choirColors: ['col000008'],
                  line: ['I dance', 'yeah'],
                  adlib: [0, 4],
                  omit: true,
                  omitChoir: true,
                },
              ],
            ],
          ],
          uses: { KYLE: 2, VIKTOR: 2 },
        });
      });

      it('it parses multiple lines with 1 main singer, 1 sub singer, and 1 choir singer (variable lines)', () => {
        const sample = '[KYLE (ANTHONY) {IRA}] I sing {yeah}\n(I dance) {yeah}';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                  choirSingers: ['IRA'],
                  choirColors: ['col000023'],
                  line: ['I sing', 'yeah'],
                  adlib: [0, 4],
                },
              ],
              [
                {
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                  choirSingers: ['IRA'],
                  choirColors: ['col000023'],
                  line: ['I dance', 'yeah'],
                  adlib: [1, 4],
                  omitSub: true,
                  omitChoir: true,
                },
              ],
            ],
          ],
          uses: { KYLE: 1, ANTHONY: 2, IRA: 2 },
        });
      });

      it('it parses multiple lines with 1 main singer, 1 sub singer, and 1 choir singer (variable lines 2)', () => {
        const sample =
          '[KYLE (ANTHONY) {IRA}] I sing {yeah}\n(I dance) {yeah}\nI rap (yeah)';
        const result = parser(sample, MEMBERS, 1);

        expect(result).toEqual({
          result: [
            [
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                  choirSingers: ['IRA'],
                  choirColors: ['col000023'],
                  line: ['I sing', 'yeah'],
                  adlib: [0, 4],
                },
              ],
              [
                {
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                  choirSingers: ['IRA'],
                  choirColors: ['col000023'],
                  line: ['I dance', 'yeah'],
                  adlib: [1, 4],
                  omitSub: true,
                  omitChoir: true,
                },
              ],
              [
                {
                  singers: ['KYLE'],
                  colors: ['col000020'],
                  subSingers: ['ANTHONY'],
                  subColors: ['col000002'],
                  line: ['I rap', 'yeah'],
                  adlib: [0, 1],
                  omit: true,
                  omitSub: true,
                },
              ],
            ],
          ],
          uses: { KYLE: 2, ANTHONY: 3, IRA: 2 },
        });
      });
    });
    //
  });

  describe('Error Messages', () => {
    it('it does not allow a new open bracket if a bracket is open', () => {
      const sample = '[IRA [';
      const result = parser(sample, MEMBERS, 1);

      expect(result).toEqual({
        errors: [
          'You should not place an opening square bracket inside another square bracket',
        ],
        result: [
          [[{ adlib: [0], line: ['IRA'], omit: true }, { empty: true }]],
        ],
        uses: {},
      });
    });

    it('it does not allow a new closing bracket if a bracket is closed', () => {
      const sample = '[IRA] ]';
      const result = parser(sample, MEMBERS, 1);

      expect(result).toEqual({
        errors: [
          'You should not place an closing square bracket inside another square bracket',
        ],
        result: [
          [
            [
              {
                adlib: [0],
                colors: ['col000023'],
                line: [''],
                singers: ['IRA'],
              },
            ],
          ],
        ],
        uses: { IRA: 1 },
      });
    });

    it('it does not allow a new open parenthesis if a parenthesis is open', () => {
      const sample = '[(IRA (';
      const result = parser(sample, MEMBERS, 1);

      expect(result).toEqual({
        errors: [
          'You should not place a opening parenthesis inside another parenthesis',
        ],
        result: [[[{ colors: ['col000023'], singers: ['IRA'] }]]],
        uses: { IRA: 1 },
      });
    });

    it('it does not allow a new closing parenthesis if a parethesis is closed', () => {
      const sample = '[(IRA))';
      const result = parser(sample, MEMBERS, 1);

      expect(result).toEqual({
        errors: [
          'You should not place a closing parenthesis inside another parenthesis',
        ],
        result: [[[{ subColors: ['col000023'], subSingers: ['IRA'] }]]],
        uses: { IRA: 1 },
      });
    });

    it('it does not allow a new open curly brase if a curly brase is open', () => {
      const sample = '[IRA {{';
      const result = parser(sample, MEMBERS, 1);

      expect(result).toEqual({
        errors: [
          'You should not place a opening curly braces inside another curly braces',
        ],
        result: [[[{ colors: ['col000023'], singers: ['IRA'] }]]],
        uses: { IRA: 1 },
      });
    });

    it('it does not allow a new closing curly brace if a curly brace is close', () => {
      const sample = '[IRA {IRA}}';
      const result = parser(sample, MEMBERS, 1);

      expect(result).toEqual({
        errors: [
          'You should not place a closing curly braces inside another curly braces',
        ],
        result: [
          [
            [
              {
                choirColors: ['col000023'],
                choirSingers: ['IRA'],
                colors: ['col000023'],
                singers: ['IRA'],
              },
            ],
          ],
        ],
        uses: { IRA: 2 },
      });
    });
  });
});
