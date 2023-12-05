import { readLines } from '../../common/readlines.js';
import run from './day10.js';

describe('day10', () => {

    it('runs', () => {
        let result = run(readLines('2022/day10/testdata.txt'));
        expect(result.part1).toEqual(16880);
        expect(result.part2).toEqual(
            "###..#..#..##..####..##....##.###..###..\n" +
            "#..#.#.#..#..#....#.#..#....#.#..#.#..#.\n" +
            "#..#.##...#..#...#..#..#....#.###..#..#.\n" +
            "###..#.#..####..#...####....#.#..#.###..\n" +
            "#.#..#.#..#..#.#....#..#.#..#.#..#.#.#..\n" +
            "#..#.#..#.#..#.####.#..#..##..###..#..#.\n"
        );
    });

});