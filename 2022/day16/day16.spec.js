import { readLines } from '../../common/readlines.js';
import run from './day16.js';

describe('day16', () => {

    // it('run1-small', () => {
    //     const r = run(readLines('2022/day16/testdata-small.txt'));
    //     expect(r.part1).toEqual(1651);
    // });

    // Takes around 25 seconds to run, uncomment if you want
    it('run1-big', () => {
        const r = run(readLines('2022/day16/testdata-big.txt'));
        expect(r.part1).toEqual(2114);
    });

});