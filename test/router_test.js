var expect = require('chai').expect;

var Digraph = require('../digraph').Digraph;
var Router = require('../router');

describe('router', function() {

    describe('routes', function() {

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

        it('should return distance 9 when route is A-B-C', function() {
            var routes = router.searchRoutes('A', 'C');
            var distance = 0;
            routes.forEach(function(route, idx, arr) {
                if (route.path.toString() === 'A,B,C') {
                    distance = route.distance;
                }
            });
            expect(distance).to.equal(9);
        });

        it('should return distance 5 when route is A-D', function() {
            var routes = router.searchRoutes('A', 'D');
            var distance = 0;
            routes.forEach(function(route, idx, arr) {
                if (route.path.toString() === 'A,D') {
                    distance = route.distance;
                }
            });
            expect(distance).to.equal(5);
        });

        it('should return distance 13 when route is A-D-C', function() {
            var routes = router.searchRoutes('A', 'C');
            var distance = 0;
            routes.forEach(function(route, idx, arr) {
                if (route.path.toString() === 'A,D,C') {
                    distance = route.distance;
                }
            });
            expect(distance).to.equal(13);
        });

        it('should return distance 22 when route is A-E-B-C-D', function() {

            var routes = router.searchRoutes('A', 'D');
            var distance = 0;
            routes.forEach(function(route, idx, arr) {
                if (route.path.toString() === 'A,E,B,C,D') {
                    distance = route.distance;
                }
            });
            expect(distance).to.equal(22);
        });

        it('should not return route A-E-D when route is A-D', function() {
            var routes = router.searchRoutes('A', 'D');
            var distance = undefined;
            routes.forEach(function(route, idx, arr) {
                if (route.path.toString() === 'A,E,D') {
                    distance = route.distance;
                }
            });
            expect(distance).to.equal(undefined);
        });

        it('should return 2 trips with maximum of 3 stops when route is C-C', function() {
            var routes = router.searchRoutesByStops('C', 'C', 3);
            expect(routes.length).to.equal(2);
        });

        it('should return 3 trips with 4 stops when route is A-C', function() {
            var routes = router.searchRoutesByStops('A', 'C', 4, true);
            expect(routes.length).to.equal(3);
        });

        it('should return shortest distance 9 when route is A-C', function() {
            var shortest = router.searchShortestRouteDistance('A', 'C');
            expect(shortest).to.equal(9);
        });

        it('should return shortest distance 9 when route is B-B', function() {
            var shortest = router.searchShortestRouteDistance('B', 'B');
            expect(shortest).to.equal(9);
        });

        it('should return 7 routes with distance less than 30 when route is C-C', function(done) {
            var routes = router.searchRoutesByDistance('C', 'C', 29);
            expect(routes.length).to.equal(7);
            done();
        });
    });
});
