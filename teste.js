var Digraph = require('./digraph').Digraph;

var digraph = new Digraph();

digraph.addEdge('A', 'B', 5);
digraph.addEdge('A', 'D', 5);
digraph.addEdge('A', 'E', 7);

var A = digraph.getVertex('A');

console.log(JSON.stringify(A));
//console.log(JSON.stringify(digraph.vertices));