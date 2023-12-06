import Range from './range.js';

export default class Map {
    inlets = [];
    outlets = [];

    findOutlets(value) {
        let inlet = this.inlets.filter(inlet => value >= inlet.from && value <= inlet.to)[0];
        if (!inlet) {
            return value;
        } else {
            return value + (this.outlets[inlet.index].from - inlet.from);
        }
    }

    findOutletsByRanges(ranges) {
        return ranges.flatMap(range => {
            let outRanges = [];
            let inlet = this.inlets.filter(inlet => range.from >= inlet.from && range.from < inlet.to ||
                                                    range.to > inlet.from && range.to <= inlet.to)[0];
            if (!inlet) {
                outRanges.push(new Range(range.from, range.to));
            } else {
                // check range that falls to right of inlet
                if (range.from < inlet.from && range.to <= inlet.to) {
                    outRanges = outRanges.concat(this.findOutletsByRanges([new Range(range.from, inlet.from - 1)]));
                    range.from = inlet.from;
                }
                // check range that falls to left of inlet
                if (range.from >= inlet.from && range.to > inlet.to) {
                    outRanges = outRanges.concat(this.findOutletsByRanges([new Range(inlet.to + 1, range.to)]));
                    range.to = inlet.to + 1;
                }

                let outlet = this.outlets[inlet.index];
                outRanges.push(new Range(range.from + (outlet.from - inlet.from), 
                                         range.to + (outlet.to - inlet.to)));
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
}