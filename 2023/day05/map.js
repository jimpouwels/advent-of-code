import Range from './range.js';

export default class Map {
    inlets = [];
    outlets = [];

    findOutlets(value) {
        let inlet = this.inlets.filter(inlet => value >= inlet.from && value <= inlet.to)[0];
        return inlet ? this.inletToOutlet(value, inlet) : value;
    }

    findOutletsByRanges(ranges) {
        return ranges.flatMap(range => {
            let outRanges = [];
            let inlet = this.inlets.filter(inlet => range.from >= inlet.from && range.from < inlet.to ||
                                                    range.to > inlet.from && range.to <= inlet.to)[0];
            if (!inlet) {
                outRanges.push(new Range(range.from, range.to));
            } else {
                // check range that falls to left of inlet
                if (range.from < inlet.from) {
                    outRanges = outRanges.concat(this.findOutletsByRanges([new Range(range.from, inlet.from - 1)]));
                    range.from = inlet.from;
                }
                // check range that falls to right of inlet
                if (range.to > inlet.to) {
                    outRanges = outRanges.concat(this.findOutletsByRanges([new Range(inlet.to + 1, range.to)]));
                    range.to = inlet.to + 1;
                }

                outRanges.push(new Range(this.inletToOutlet(range.from, inlet), 
                                         this.inletToOutlet(range.to, inlet)));
            }
            return outRanges;
        });
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