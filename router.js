'use strict';

/**
  * This class provide functionality to search routes between paths in a directed graph.
  *
  * Should inject the graph when creating an instance object. 
  *
  */
module.exports = Router;

function Router(graph) {

    this.graph = graph;
    this.dfsCache = {};
    var that = this;

    function Route() {
        this.path = [];
        this.distance = 0;
    }

    /**
     * Public interface to Depth-First Search algorithm.
     *
     * Find the route vi - vf in the cache, and if not found, run dfs search. Otherwise return from cache.
     *
     */
    this.dfs = function(vi, vf) {
        //cache key
        var k = vi + vf;

        if (that.dfsCache[k]) {
            return that.dfsCache[k];
        }

        var routes = [];
        var explored = {};
        var route = new Route();
        var endRoutes = [];

        dfsSearch(vi, vf, explored, routes, route, 0);
        that.dfsCache[k] = routes;

        return routes;
    }

    /**
     * Public interface to find the shortes path. Uses Depth-First Search algorithm to compute all paths.
     *
     * TODO - Implement Dijkstra
     */
    this.shortest = function(vi, vf) {
        var routes = this.dfs(vi, vf);
        var shortest;

        routes.forEach(function(route, idx, arr) {
            if (!shortest) {
                shortest = route;
            } else {
                if (route.distance < shortest.distance) {
                    shortest = route;
                }
            }
        });
        return shortest;
    }

    /**
     * Depht-first search variation to find all possible paths from a source to destination. Not best at all,
     * because an node could be visited more than once.
     *
     * TODO - Implement DFS without visiting an node more than once
     */
    function dfsSearch(vi, vf, explored, routes, route, weight) {
        if (vi !== vf) {
            explored[vi] = true;
        }

        route.path.push(vi);
        route.distance = route.distance + weight;

        if (vi === vf && weight > 0) {
            routes.push(JSON.parse(JSON.stringify(route)));
        }

        var paths = that.graph.getPathsFrom(vi);

        paths.forEach(function(el, idx, arr) {
            var vName = that.graph.getVertexName(el.vertex);
            //console.log('vertex: ' + vName);
            //console.log('');
            if (!explored[vName]) {
                dfsSearch(vName, vf, explored, routes, route, el.weight);
            }
        });
        route.path.pop()
        route.distance = route.distance - weight;
        explored[vi] = false;
    }

    /**
     * TODO: Dijkstra algorithm to find the shortets path between two nodes.
     *
     */
    function dijkstraSearch(vi, vf, explored, weight, queue) {

    }
}
