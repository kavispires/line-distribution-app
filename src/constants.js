import ARTISTS_DB from './database';

export const COLORS_LIST = ['blood', 'redOrange', 'peach', 'brown', 'orange', 'dirt', 'lightBrown', 'sand', 'gold', 'tan', 'yellow', 'olive', 'pee', 'yellowGreen', 'green', 'darkGreen', 'forest', 'lime', 'teal', 'cyan', 'turquoise', 'navy', 'blue', 'purple', 'violet', 'rose', 'plum', 'pink', 'redViolet', 'hotPink', 'wine', 'salmon', 'red', 'lightGrey', 'grey', 'darkGrey'];

export const KEYS = {
    49: {
        keyCode: 49,
        keyFace: '1',
        id: 0
    },
    50: {
        keyCode: 50,
        keyFace: '2',
        id: 1
    },
    51: {
        keyCode: 51,
        keyFace: '3',
        id: 2
    },
    52: {
        keyCode: 52,
        keyFace: '4',
        id: 3
    },
    53: {
        keyCode: 53,
        keyFace: '5',
        id: 4
    },
    54: {
        keyCode: 54,
        keyFace: '6',
        id: 5
    },
    55: {
        keyCode: 55,
        keyFace: '7',
        id: 6
    },
    56: {
        keyCode: 56,
        keyFace: '8',
        id: 7
    },
    57: {
        keyCode: 57,
        keyFace: '9',
        id: 8
    },
    48: {
        keyCode: 48,
        keyFace: '0',
        id: 9
    },
    81: {
        keyCode: 81,
        keyFace: 'Q',
        id: 10
    },
    87: {
        keyCode: 87,
        keyFace: 'W',
        id: 11
    },
    69: {
        keyCode: 69,
        keyFace: 'E',
        id: 12
    },
    82: {
        keyCode: 82,
        keyFace: 'R',
        id: 13
    },
    84: {
        keyCode: 84,
        keyFace: 'T',
        id: 14
    },
    89: {
        keyCode: 89,
        keyFace: 'Y',
        id: 15
    },
    85: {
        keyCode: 85,
        keyFace: 'U',
        id: 16
    },
    73: {
        keyCode: 73,
        keyFace: 'I',
        id: 17
    },
    79: {
        keyCode: 79,
        keyFace: 'O',
        id: 18
    },
    80: {
        keyCode: 80,
        keyFace: 'P',
        id: 19
    },
    65: {
        keyCode: 65,
        keyFace: 'A',
        id: 20
    },
    83: {
        keyCode: 83,
        keyFace: 'S',
        id: 21
    },
    68: {
        keyCode: 68,
        keyFace: 'D',
        id: 22
    },
    70: {
        keyCode: 70,
        keyFace: 'F',
        id: 23
    },
    71: {
        keyCode: 71,
        keyFace: 'G',
        id: 24
    },
};

export const KEYCODE_LIST = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71];

export const KEY_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G'];

export const ARTISTS = ARTISTS_DB;

export const ARTITST_PLACEHOLDER = {
    bandName: 'No Artists Selected',
    members: [''],
    colors: ['']
};
