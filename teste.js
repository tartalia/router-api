var Digraph = require('./digraph').Digraph;
var Router = require('./router');

var digraph = new Digraph();

digraph.addEdge('A', 'B', 5);
digraph.addEdge('B', 'C', 4);
digraph.addEdge('C', 'D', 8);
digraph.addEdge('D', 'C', 8);
digraph.addEdge('D', 'E', 6);
digraph.addEdge('A', 'D', 5);
digraph.addEdge('C', 'E', 2);
digraph.addEdge('E', 'B', 3);
digraph.addEdge('A', 'E', 7);

var A = digraph.getVerticesFrom('A');
//var B = digraph.getVerticesFrom('B');
//var C = digraph.getVerticesFrom('C');
//var D = digraph.getVerticesFrom('D');
//var E = digraph.getVerticesFrom('E');
//
//console.log(JSON.stringify(A));
//console.log(JSON.stringify(B));
//console.log(JSON.stringify(C));
//console.log(JSON.stringify(D));
//console.log(JSON.stringify(E));

var router = new Router(digraph);
//var routes = router.dfs('C', 'C');
//console.log(routes);

console.log('by distance');
var byDistance = router.searchRoutesByDistance('C', 'C', 29);
console.log(byDistance);

console.log('by stops 1');
var byStops = router.searchRoutesByStops('C', 'C', 3, false);
console.log(byStops);

console.log('by stops 2');
var byStops2 = router.searchRoutesByStops('A', 'C', 4, false);
console.log(byStops2);

console.log('by stops 3');
var byStops3 = router.searchRoutesByStops('A', 'C', 4, true);
console.log(byStops3);