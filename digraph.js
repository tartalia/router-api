'use strict';

/**
 * This data structure represents a directed graph (or digraph) as a adjacence list.
 *
 * The vertices in the adjacence list are represented by their index, that could be found in the
 * verticesIndex hash object. The verticesName obj hold vertices name.
 *
 * The digraph itself) is contained in the variable paths.
 *
 */

var assert = require('assert');

module.exports = Digraph;

function Digraph() {

    //vertices hash obj - find an element should be constant O(1)
    this.verticesIndex = {};
    this.verticesName = {};

    // the paths in the digraph obj
    this.paths = [];
}

Digraph.prototype = {

    /**
     * This function add a path to the digraph from starting point to ending point with a weight, asserting graph
     * constraints and param types.
     *
     * Starting and ending point should be a valid string and weight should be a not negative number.
     * The starting and ending point can not be equal (there's no cyclic paths by definition, eg. A to A).
     *
     */
    addPath: function(startingPoint, endingPoint, weight) {

        assert.equal(typeof startingPoint, 'string', 'Argument startingPoint should be a string');
        assert.notStrictEqual(startingPoint, '', 'Argument startingPoint should be a valid string');

        assert.equal(typeof endingPoint, 'string', 'Argument endingPoint should be a string');
        assert.notStrictEqual(endingPoint, '', 'Argument ending should be a valid string');

        assert.equal(typeof weight, 'number', 'Argument weight should be a number');
        assert.equal(true, (weight >= 0), 'Argument weight should not be negative');

        //digraph constraint
        assert.notStrictEqual(startingPoint, endingPoint, 'Argument startingPoint and ending should not be equal');

        var sidx = this.addOrFindVertex(startingPoint);
        var eidx = this.addOrFindVertex(endingPoint);

        // paths from startingPoint
        var p = this.paths[sidx];

        p.push({ 'vertex': eidx, 'weight': weight });
        return p;
    },

    addOrFindVertex: function(vertexName) {

        assert.equal(typeof vertexName, 'string', 'Argument vertexName should be a string');
        assert.notStrictEqual(vertexName, '', 'Argument vertexName should be a valid string');

        var idx = this.verticesIndex[vertexName];

        if (idx === undefined) {
            idx = this.paths.push([]);
            idx--;
            this.verticesIndex[vertexName] = idx;
            this.verticesName[idx] = vertexName;
            return idx;
        }
        return idx;
    },

    getVertexIndex: function(vertexName) {
        var idx = this.verticesIndex[vertexName];
        if (idx === undefined) {
            return -1;
        }
        return idx;
    },

    getVertexName: function(idx) {
        return this.verticesName[idx];
    },

    getPathsFrom: function(startingPoint) {
        var idx = this.getVertexIndex(startingPoint);
        return (idx === undefined) ? undefined : this.paths[idx];
    }
}
