import Range from './range.js';

export default class Map {
    inlets = [];
    outlets = [];

    findOutlets(value) {
        let inlet = this.findFirstMatchingInlet(value);
        return inlet ? this.inletToOutlet(value, inlet) : value;
    }

    findOutletsByRanges(ranges) {
        return ranges.flatMap(range => {
            let oulets = [];
            let inlet = this.findFirstMatchingInletForRange(range);
            if (!inlet) {
                oulets.push(new Range(range.from, range.to));
            } else {
                if (range.from < inlet.from) {
                    oulets = oulets.concat(this.findOutletsByRanges([new Range(range.from, inlet.from - 1)]));
                    range.from = inlet.from;
                } else if (range.to > inlet.to) {
                    oulets = oulets.concat(this.findOutletsByRanges([new Range(inlet.to + 1, range.to)]));
                    range.to = inlet.to + 1;
                }

                oulets.push(new Range(this.inletToOutlet(range.from, inlet), 
                                      this.inletToOutlet(range.to, inlet)));
            }
            return oulets;
        });
    }

    findFirstMatchingInlet(value) {
        return this.inlets.filter(inlet => value >= inlet.from && value <= inlet.to)[0]
    }

    findFirstMatchingInletForRange(range) {
        return this.inlets.filter(inlet => range.from >= inlet.from && range.from < inlet.to ||
                                           range.to > inlet.from && range.to <= inlet.to)[0];
    }

    addInlet(from, length) {
        this.inlets.push(new Range(from, from + length, this.inlets.length));
    }

    addOutlet(from, length) {
        this.outlets.push(new Range(from, from + length, this.inlets.length));
    }

    inletToOutlet(value, inlet) {
        return value + (this.outlets[inlet.index].from - inlet.from);
    }
}