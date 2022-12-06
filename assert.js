
export default function assert(expected, actual) {
    const result = actual == expected;
    if (!result) {
        console.log(`FAILED: Expected ${expected}, was ${actual}`);
    } else {
        console.log(`SUCCESS`);
    }
}