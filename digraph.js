'use strict';

/**
 * This data structure represents a directed graph (or digraph) as a adjacence list.
 * 
 * Example usage:
 *
 *        var digraph = new Digraph();
 *        digraph.addEdge('A', 'B', 5);
 *        digraph.addEdge('A', 'D', 5);
 *        digraph.addEdge('A', 'C', 5);
 *        digraph.addEdge('A', 'C', 5);
 *        digraph.addEdge('B', 'A', 2);
 *        digraph.addEdge('C', 'B', 3);
 * 
 * The resultant adjacence list:
 *
 *    [ A: { edges: [ {"vertex":"B","weight":5},{"vertex":"C","weight":5},{"vertex":"D","weight":7} ] },
 *      B: { edges: [ {"vertex":"A","weight":2} ] },
 *      C: { edges: [ {"vertex":"B","weight":3} ] },
 *      D: { edges: [] } ]
 *
 * Author: Rafael Tartalia (rafael.tartalia@gmail.com)
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
    
    //public
    
    /**
     * Take a vertice v and w, create an edge from v to w with weight w, and add the edge to the vertices list.
     * 
     * @v The edge source vertex
     * @w The edge target vertex
     * @weight The edge weight
     *
     */
    addEdge: function(v, w, weight) {
        assert.notEqual(v, '', 'Argument v should be valid');
        assert.notEqual(v, undefined, 'Argument v should be valid');
        assert.notEqual(v, null, 'Argument v should be valid');
        assert.notEqual(w, '', 'Argument w should be valid');
        assert.notEqual(w, undefined, 'Argument w should be valid');
        assert.notEqual(w, null, 'Argument w should be valid');        
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

    /**
     * Return all vertices for a given vertex.
     * 
     * @v The source vertex
     * @return All vertices adjacent to v
     *
     */
    getVerticesFrom: function(v) {
        var ref = this.vertices[v];
        if (ref) {
            return ref.edges;
        }
        return ref;
    },
    
    /**
     * Return the graph itself, or the adjacence list.
     * 
     * @return All vertices and their edges.
     *
     */    
    getVertices: function() {
        return this.vertices;   
    }
}
