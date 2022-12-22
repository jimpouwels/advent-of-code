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

    distanceTo(otherValve, routes, visited = []) {
        let shortestPath = 0;
        if (otherValve !== this) {
            const knownDistance = routes.find(r => (r.from === this && r.to === otherValve) || (r.from === otherValve && r.to === this));
            if (knownDistance) {
                return knownDistance.length;
            } else {
                const possibleTargets = this.targets.filter(t => !visited.includes(t.name));
                if (possibleTargets.length === 0) {
                    return Infinity;
                }
                return possibleTargets.map(t => t.distanceTo(otherValve, routes, [ ...visited, this.name ]))
                                      .sort((a, b) => a - b)[0] + 1;
            }
        }
        return shortestPath;
    }

}