var Digraph = require('./digraph');
var Router = require('./router');

var graph = new Digraph();

graph.addPath('A', 'B', 5);
graph.addPath('A', 'D', 5);
graph.addPath('A', 'E', 7);
graph.addPath('B', 'C', 4);
graph.addPath('C', 'D', 8);
graph.addPath('C', 'E', 2);
graph.addPath('D', 'C', 8);
graph.addPath('D', 'E', 6);
graph.addPath('E', 'B', 3);

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
routes = router.dfs('A', 'C');
routes.forEach(function(route, idx, arr) {
    if (route.path.toString() === 'A,B,C') {
        distance = route.distance;
    }
});
output(1, distance);

//#2
distance = null;
routes = router.dfs('A', 'D');
routes.forEach(function(route, idx, arr) {
    if (route.path.toString() === 'A,D') {
        distance = route.distance;
    }
});
output(2, distance);

//#3
distance = null;
routes = router.dfs('A', 'C');
routes.forEach(function(route, idx, arr) {
    if (route.path.toString() === 'A,D,C') {
        distance = route.distance;
    }
});
output(3, distance);

//#4
distance = null;
routes = router.dfs('A', 'D');
var distance = 0;
routes.forEach(function(route, idx, arr) {
    if (route.path.toString() === 'A,E,B,C,D') {
        distance = route.distance;
    }
});
output(4, distance);

//#5
distance = null;
routes = router.dfs('A', 'D'); 
var distance = undefined;
routes.forEach(function(route, idx, arr) {
    if (route.path.toString() === 'A,E,D') {
        distance = route.distance;
    }
});
output(5, distance);

//#6 
routes = router.dfs('C', 'C');
arr = [];
routes.forEach(function(route, idx, v) {
    if ((route.path.length - 1) <= 3) {
         arr.push(route);
    }
});
output(6, arr.length);

//#7
routes = router.dfs('A', 'C');
arr = [];
routes.forEach(function(route, idx, v) {
    if ((route.path.length) === 5) {
         arr.push(route);
    }
});
output(7, arr.length);

//#8
var shortest;
shortest = router.shortest('A', 'C');
output(8, ((shortest) ? shortest.distance : 0));

//#9
shortest = router.shortest('B', 'B');
output(9, ((shortest) ? shortest.distance : 0));

routes = router.dfs('C', 'C');
arr = [];
routes.forEach(function(route, idx, v) {
    if (route.distance < 30) {
         arr.push(route);
    }
});
output(10, arr.length);