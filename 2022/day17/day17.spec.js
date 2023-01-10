import { readFile } from '../../common/readlines.js';
import run from './day17.js';

describe('day17', () => {

    it('run1', () => {
        const r = run(readFile('2022/day17/testdata.txt'));
        expect(r.part1).toEqual(3068);
    });

});