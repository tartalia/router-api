'use strict';
module.exports = Router;

/**
 * This class provide functionality to search routes between source and targets in a directed graph, using 
 * Depth-Search First variations to search routes by distance, number of stops, and the DFS itself with backtracking
 * functionality, searching for all routes between two nodes in the graph. 
 * 
 * This class also provide functionality to search the shortest route between two nodes, using Dijkstra algorithm.
 *
 * Author: Rafael Tartalia (rafael.tartalia@gmail.com)
 */

var assert = require('assert');
var Queue = require('./priority_queue');

function Router(graph) {

    this.graph = graph;
    this.dfsCache = {};
    this.dfsDistanceCache = {};
    var that = this;
    
    // public methods

    /**
     * Depth-First Search algorithm with back tracking to seach all routes between source and target. This algorithm does not
     * run on O(M+N).
     *
     * Search the route target / source in the cache, and if not found, run dfs search. Otherwise return from cache.
     * 
     * @param source - The source destination
     * @target target - The target destination
     * @return An array ou routes from source to target
     */
    this.searchRoutes = function(source, target) {
        if (!source) { throw new Error('source should not be null'); }
        if (!target) { throw new Error('target should not be null'); }

        var k = source + target;
        if (that.dfsCache[k]) {
            return that.dfsCache[k];
        }

        var routes = [];
        var explored = [];
        var route = new Route();
        
        dfsSearch(source, target, explored, routes, route, 0, null);
        that.dfsCache[k] = routes; 
        return routes;
    }
    
    /**
     * Depth-First Search algorithm with cyclic route search. The search don't stop until the maxWeight is reached.
     * A very high maxWeight can cause problem. 
     *
     * Search the route target / source in the cache, and if not found, run dfs search. Otherwise return from cache.
     * 
     * @param source The source destination
     * @param target target The target destination
     * @param maxWeight The maximum weight route to search
     * @return An array ou routes from source to target with weight <= maxWeight
     */
    this.searchRoutesByDistance = function(source, target, maxWeight) {
        if (!source) { throw new Error('source should not be null'); }
        if (!target) { throw new Error('target should not be null'); }
        if (!maxWeight) { throw new Error('maxWeight should not be null'); }
        if (maxWeight <= 0) { throw new Error('maxWeight should be greater than 1'); }
        
        var k = source + target;
        if (that.dfsDistanceCache[k]) {
            return that.dfsDistanceCache[k];
        }

        var routes = [];
        var route = new Route();

        dfsSearchByDistance(source, target, routes, route, 0, maxWeight);
        that.dfsDistanceCache[k] = routes;
        return routes;
    }
    

    /**
     * Depth-First Search algorithm with cyclic route search. The search don't stop until the maxStops is reached.
     * A very high maxStops can cause problem. If strictStops true, the search will return only routes with exactly 
     * maxStops. 
     *
     * Search the route target / source in the cache, and if not found, run dfs search. Otherwise return from cache.
     * 
     * @param source The source destination
     * @param target target The target destination
     * @param maxStops The maximum stops route to search
     * @param strictStops Restrict the search to find only routes with exactly maxStops stops
     * @return An array ou routes from source to target with stops <= maxStops, or stops === maxStops, if strictStops === true
     */
    this.searchRoutesByStops = function(source, target, maxStops, strictStops) {
        if (!source) { throw new Error('source should not be null'); }
        if (!target) { throw new Error('target should not be null'); }
        if (!maxStops) { throw new Error('maxStops should not be null'); }
        if (maxStops <= 0 ) { throw new Error('maxStops should be greater than 1'); }

        var routes = [];
        var route = new Route();

        dfsSearchByStops(source, target, routes, route, maxStops, strictStops);
        return routes;
    }
    
    /**
     * Dijkstra Search algorithm. The algorith will search all routes from a source, and will return only the distance
     * to the target. Run in O(|V|log|V|). 
     *
     * @param source The source destination
     * @param target target The target destination
     * @return The shortest path from source to target
     */
    this.searchShortestRouteDistance = function(source, target) {
        if (!source) { throw new Error('source should not be null'); }
        if (!target) { throw new Error('target should not be null'); }

        var route = new Route();        
        var explored = [];
        var distanceTo = [];
        assert(source, true, 'source should not be null');
        assert(target, true, 'target should not be null');        
        dijkstraSearch(source, target, distanceTo);
        return distanceTo[target];
    }

    //private methods and objects

    function Route() {
        this.path = [];
        this.distance = 0;
        this.stops = -1;
    }

    // DFS search
    function dfsSearch(source, target, explored, routes, route, weight) {
        if (source !== target) {
            explored[source] = true;
        }

        route.path.push(source);
        route.distance = route.distance + weight;

        // get into target if no cycle route?
        if (source === target && weight > 0) {
            routes.push(JSON.parse(JSON.stringify(route)));
        }

        var edges = that.graph.getVerticesFrom(source);
        edges.forEach(function(edge, idx, arr) {
            if (!explored[edge.vertex]) {
                dfsSearch(edge.vertex, target, explored, routes, route, edge.weight);
            }
        });
        
        //back track route
        route.path.pop();
        route.distance = route.distance - weight;
        explored[source] = false;        
    }

    //DFS cyclic search by distance
    function dfsSearchByDistance(source, target, routes, route, distance, maxDistance) {
        route.path.push(source);
        route.distance = route.distance + distance;

        // get into target if no cycle route?
        if (source === target && distance > 0 && route.distance <= maxDistance) {
            routes.push(JSON.parse(JSON.stringify(route)));
        }

        var edges = that.graph.getVerticesFrom(source);
        edges.forEach(function(edge, idx, arr) {
            if (route.distance <= maxDistance) {
                dfsSearchByDistance(edge.vertex, target, routes, route, edge.weight, maxDistance);
            }
        });

        route.path.pop();
        route.distance = route.distance - distance;
    }
    
    //DFS cyclic search by stops
    function dfsSearchByStops(source, target, routes, route, maxStops, strictStops) {
        route.path.push(source);
        route.stops = route.stops + 1;
        
        // get into target if no cycle route?
        if (strictStops && source === target && route.stops > 0 && route.stops === maxStops) {
            routes.push(JSON.parse(JSON.stringify(route)));
        }

        if (!strictStops && source === target && route.stops > 0 && route.stops <= maxStops) {
            routes.push(JSON.parse(JSON.stringify(route)));
        }

        var edges = that.graph.getVerticesFrom(source);
        edges.forEach(function(edge, idx, arr) {
            if (route.stops <= maxStops) {
                dfsSearchByStops(edge.vertex, target, routes, route, maxStops, strictStops);
            }
        });

        route.path.pop();
        route.stops = route.stops - 1;
    }

    function dijkstraSearch(source, target, distanceTo) {
        var edgeTo = [];
        var queue = new Queue();

        distanceTo[source] = 0;
        queue.enqueue(source, distanceTo[source]);
        while(!queue.isEmpty()) {
            var vertex = queue.unqueue();
            var edges = that.graph.getVerticesFrom(vertex.key);
            edges.forEach(function(edge, idx, arr) {
                relax(vertex, edge, distanceTo, edgeTo, queue);
            });
        }
    }

    //relaxation method for dijkstra algorithm
    function relax(source, edge, distanceTo, edgeTo, queue) {
        var vertex = source.key;

        if (!distanceTo[edge.vertex] || (distanceTo[edge.vertex] > (distanceTo[vertex] + edge.weight))) {
            distanceTo[edge.vertex] = distanceTo[vertex] + edge.weight;
            edgeTo[edge.vertex] = vertex;
            if (queue.hasItem(edge.vertex)) {
                queue.decreasePriority(edge.vertex, distanceTo[edge.vertex]);
            } else {
                queue.enqueue(edge.vertex, edge.weight);
            }
        }
    }
}
