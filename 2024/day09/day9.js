export default function run(input) {
    let id = 0;
    let places = input.split('').flatMap((p, i) => {
        p = parseInt(p);
        if (i % 2 == 0) {
            return Array(p).fill(id++);
        } else {
            return Array(p).fill(-1);
        }
    });
    places.forEach((element, i) => {
        if (element == -1)
            while (true) {
                let end = places.pop();
                if (end != -1) {
                    places[i] = end;
                    break;
                }
            }
    });
    return places.reduce((sum, val, i) => {
        return sum + (i * val);
    }, 0);
}