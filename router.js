'use strict';

/**
  * This class provide functionality to search routes between paths in a directed graph.
  *
  * Should inject the graph when creating an instance object. 
  *
  */
module.exports = Router;
var assert = require('assert');
var Queue = require('./priority_queue');

function Router(graph) {

    this.graph = graph;
    this.dfsCache = {};
    this.dfsDistanceCache = {};
    var that = this;
    
    // public methods

    /**
     * Public interface to Depth-First Search algorithm.
     *
     * Search the route target / source in the cache, and if not found, run dfs search. Otherwise return from cache.
     * 
     * @param source - The source destination
     * @target target - The target destination
     * @return An array ou routes from source to target
     *
     */
    this.searchRoutes = function(source, target) {
        assert(source, true, 'source should not be null');
        assert(target, true, 'target should not be null');
        
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
    
    this.searchRoutesByDistance = function(source, target, maxWeight) {
        assert(source, true, 'source should not be null');
        assert(target, true, 'target should not be null');
        assert(maxWeight, true, 'maxWeight should not be null');
        assert(maxWeight > 0 , true, 'maxWeight should be greater than 0');
        
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
    
    this.searchRoutesByStops = function(source, target, maxStops, strictStops) {
        assert(source, true, 'source should not be null');
        assert(target, true, 'target should not be null');
        assert(maxStops, true, 'maxWeight should not be null');
        assert(maxStops > 0 , true, 'maxStop should greater than 1');

        var routes = [];
        var route = new Route();

        dfsSearchByStops(source, target, routes, route, maxStops, strictStops);
        return routes;
    }
    
    this.searchShortest = function(source, target) {
        console.log('searchShortest');
        var route = new Route();
        var explored = [];
        var distanceTo = [];
        assert(source, true, 'source should not be null');
        assert(target, true, 'target should not be null');        
        //bfsSearchShortest(source, target, explored, route);
        dijkstraSearch(source, target, distanceTo);
    }

    function Route() {
        this.path = [];
        this.distance = 0;
        this.stops = -1;
    }

    //source / target
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

    //source / target
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
    
    //source / target
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

    /**
     * Breadth-First Search algorithm to find the shortest path from source to destination.
     *
     */
    function bfsSearchShortest(source, target, explored, route) {
        var queue = [];
        var distances = [];

        queue.push(source);
        route.path.push(source);
        distances[source] = 0;
        
        while (queue.length > 0) {
            var vertex = queue.shift();
            console.log(vertex);
            var edges = that.graph.getVerticesFrom(vertex);    
            edges.forEach(function(edge, idx, arr) {
                if (!explored[edge.vertex]) {
                    queue.push(edge.vertex);
                    explored[edge.vertex] = true;
                    distances[edge.vertex] = distances[vertex] + edge.weight;
                }
            });
        }
        console.log(distances);
    }
    
    function dijkstraSearch(source, target, distanceTo) {
        var distanceTo = [];
        var edgeTo = [];
        var queue = new Queue();
        
        

        distanceTo[source] = 0;
        queue.enqueue(source, distanceTo[source]);
        while(!queue.isEmpty()) {
            var vertex = queue.unqueue();
            var edges = that.graph.getVerticesFrom(vertex.key);
            console.log('vertex: ' + JSON.stringify(vertex));
            edges.forEach(function(edge, idx, arr) {
                console.log('edge: ' + JSON.stringify(edge));
                relax(vertex, edge, distanceTo, edgeTo, queue);
            });
        }
        console.log(distanceTo);
        console.log(edgeTo);
    }

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
