import MD5 from "crypto-js/md5";

export default function day4(input, expectedZeroes) {
    let zeroes = Array(expectedZeroes).fill().reduce(sum => sum + '0', '');
    let i = 0;
    while (i++ >= 0) {
        if (MD5(`${input}${i}`).toString().startsWith(zeroes)) {
            return i;
        }
    }
}