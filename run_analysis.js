var Digraph = require('./digraph').Digraph;
var Router = require('./router');

var graph = new Digraph();

graph.addEdge('A', 'B', 5);
graph.addEdge('A', 'D', 5);
graph.addEdge('A', 'E', 7);
graph.addEdge('B', 'C', 4);
graph.addEdge('C', 'D', 8);
graph.addEdge('C', 'E', 2);
graph.addEdge('D', 'C', 8);
graph.addEdge('D', 'E', 6);
graph.addEdge('E', 'B', 3);

var router = new Router(graph);
var routes;
var distance;
var arr;

function output(n, v) {
    if (!v) {
        v = 'NO SUCH ROUTE';
    }
    console.log('Output ' + n + '#: ' + v);
}

//#1
distance = null;
routes = router.searchRoutes('A', 'C');
routes.forEach(function(route, idx, arr) {
    if (route.path.toString() === 'A,B,C') {
        distance = route.distance;
    }
});
output(1, distance);

//#2
distance = null;
routes = router.searchRoutes('A', 'D');
routes.forEach(function(route, idx, arr) {
    if (route.path.toString() === 'A,D') {
        distance = route.distance;
    }
});
output(2, distance);

//#3
distance = null;
routes = router.searchRoutes('A', 'C');
routes.forEach(function(route, idx, arr) {
    if (route.path.toString() === 'A,D,C') {
        distance = route.distance;
    }
});
output(3, distance);

//#4
distance = null;
routes = router.searchRoutes('A', 'D');
var distance = 0;
routes.forEach(function(route, idx, arr) {
    if (route.path.toString() === 'A,E,B,C,D') {
        distance = route.distance;
    }
});
output(4, distance);

//#5
distance = null;
routes = router.searchRoutes('A', 'D'); 
var distance = undefined;
routes.forEach(function(route, idx, arr) {
    if (route.path.toString() === 'A,E,D') {
        distance = route.distance;
    }
});
output(5, distance);

//#6 
routes = router.searchRoutesByStops('C', 'C', 3);
output(6, routes.length);

//#7
routes = router.searchRoutesByStops('A', 'C', 4, true);
output(7, routes.length);

//#8
var shortest;
shortest = router.searchShortestRouteDistance('A', 'C');
output(8, ((shortest) ? shortest : 0));

//#9
shortest = router.searchShortestRouteDistance('B', 'B');
output(9, ((shortest) ? shortest : 0));

//#10
routes = router.searchRoutesByDistance('C', 'C', 29);
output(10, routes.length);