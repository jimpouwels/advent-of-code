import { readFile } from '../../common/readlines.js';
import run from './day17.js';

describe('day17', () => {

    it('run1', () => {
        const r1 = run(readFile('2022/day17/testdata.txt'), 2022);
        expect(r1.part1).toEqual(3141);
        // const r2 = run(readFile('2022/day17/testdata.txt'), 1000000000000);
        // expect(r2.part1).toEqual(3141);
    });

});