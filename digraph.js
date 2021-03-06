'use strict';
module.exports.Digraph = Digraph;

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
 */

var assert = require('assert');

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
     * @param v The edge source vertex
     * @param w The edge target vertex
     * @param weight The edge weight
     */
    addEdge: function(v, w, weight) {
        if (!v) { throw new Error('Argument v should be valid'); }
        if (!w) { throw new Error('Argument w should be valid'); }
        if (!weight) { throw new Error('Argument weight should be a number'); }
        if (!(typeof weight === 'number')) { throw new Error('Argument weight should be a number'); }
        if (weight < 0) { throw new Error('Argument weight should not be negative'); }
        if (v === w) { throw new Error('Argument v and w should not be equal'); }

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
     * @param v The source vertex
     * @return All vertices adjacent to v
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
     * @return All vertices and their edges
     */    
    getVertices: function() {
        return this.vertices;   
    }
}
