import Lens from "./lens";

export default class Box {
    lenses = [];

    insert(label, focalLength) {
        let existingLens = this.lenses.filter(l => l.label === label);
        if (existingLens.length == 0) {
            this.lenses.push(new Lens(label, focalLength));
        } else {
            existingLens[0].focalLength = focalLength;
        }
    }

    remove(label) {
        this.lenses = this.lenses.filter(l => l.label !== label);
    }
}