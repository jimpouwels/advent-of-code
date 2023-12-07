import { readLines } from '../../common/readlines.js';
import run from './day7.js';

import HandParser from './hand_parser.js';

describe('day7', () => {

    it('runs', () => {
        expect(run(readLines('2023/day07/testdata.txt'), false)).toEqual(249638405);
        expect(run(readLines('2023/day07/testdata.txt'), true)).toEqual(249776650);
    });
});