export default class Valve {
    name;
    rate = 0;
    targets = [];
    isOpen = false;

    constructor(name, rate) {
        this.name = name;
        this.rate = rate;
    }

    open() {
        this.isOpen = true;
    }

    releasePressure() {
        if (this.isOpen) {
            return this.rate;
        }
        return 0;
    }

    reset() {
        this.isOpen = false;
    }

    findPathTo(otherValve, routes, visited = []) {
        visited.push(this.name);
        if (otherValve !== this) {
            const existingPath = routes.find(r => (r.from === this && r.to === otherValve) || (r.from === otherValve && r.to === this));
            if (existingPath) {
                return [ this, ...existingPath.path ];
            }
            const shortestPath = this.targets.filter(t => !visited.includes(t.name))
                                             .map(t => t.findPathTo(otherValve, routes, [ ...visited ]))
                                             .filter(p => p[p.length - 1] == otherValve)
                                             .sort((a, b) => a.length - b.length)[0];
            return shortestPath ? [ this, ...shortestPath ] : [ this ];
        }
        return [ this ];
    }

}