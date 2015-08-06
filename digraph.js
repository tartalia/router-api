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

module.exports.Digraph = Digraph;
module.exports.Vertex = Vertex; 

function Vertex() {
    this.edges = [];
}

function Edge(v, weight) {
    this.vertex = v;
    this.weight = weight
}

function Digraph() {    
    this.vertices = [];
}

Digraph.prototype = {
    
    addEdge: function(v, w, weight) {
        assert(v, true, 'Argument v is not valid');
        assert(w, true, 'Argument w is not valid');
        assert.equal(typeof weight, 'number', 'Argument weight should be a number');
        assert.equal(true, (weight >= 0), 'Argument weight should not be negative');
        assert.notStrictEqual(v, w, 'Argument v and w should not be equal');
        
        var self = this;
        var vRef = self.vertices[v];
        var wRef = self.vertices[w];

        if (!vRef) {
            var vRef = new Vertex();
            self.vertices[v] = vRef;
        }
        if (!wRef) {
            var wRef = new Vertex();
            self.vertices[w] = wRef;
        }
        var e = new Edge(w, weight);
        vRef.edges.push(e);
    },

    getVerticesFrom: function(v) {
        var ref = this.vertices[v];
        if (ref) {
            return ref.edges;
        }
        return ref;
    },
    
    getVertices: function() {
        return this.vertices;   
    }
}
