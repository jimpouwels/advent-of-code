import { readFile } from '../../common/readlines.js';
import run from './day13.js';

describe('day13', () => {

    it('run1', () => {
        const r = run(readFile('2022/day13/testdata1.txt'));
        expect(r.part1).toEqual(13);
        expect(r.part2).toEqual(140);
    });

    it('run2', () => {
        const r = run(readFile('2022/day13/testdata2.txt'));
        expect(r.part1).toEqual(5684);
        expect(r.part2).toEqual(22932);
    });

});