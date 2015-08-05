var expect = require('chai').expect;

var Digraph = require('../digraph');
var Router = require('../router');

describe('router', function() {

    before(function() {

    });

    describe('routes', function() {

        var graph = new Digraph();
        graph.addOrFindVertex('A');
        graph.addOrFindVertex('B');
        graph.addOrFindVertex('C');
        graph.addOrFindVertex('D');
        graph.addOrFindVertex('E');

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

        it('should return distance 9 when route is A-B-C', function() {
            var routes = router.dfs('A', 'C');
            var distance = 0;
            routes.forEach(function(route, idx, arr) {
                if (route.path.toString() === 'A,B,C') {
                    distance = route.distance;
                }
            });
            expect(distance).to.equal(9);
        });

        it('should return distance 5 when route is A-D', function() {
            var routes = router.dfs('A', 'D');
            var distance = 0;
            routes.forEach(function(route, idx, arr) {
                if (route.path.toString() === 'A,D') {
                    distance = route.distance;
                }
            });
            expect(distance).to.equal(5);
        });

        it('should return distance 13 when route is A-D-C', function() {
            var routes = router.dfs('A', 'C');
            var distance = 0;
            routes.forEach(function(route, idx, arr) {
                if (route.path.toString() === 'A,D,C') {
                    distance = route.distance;
                }
            });
            expect(distance).to.equal(13);
        });

        it('should return distance 22 when route is A-E-B-C-D', function() {

            var routes = router.dfs('A', 'D');
            var distance = 0;
            routes.forEach(function(route, idx, arr) {
                if (route.path.toString() === 'A,E,B,C,D') {
                    distance = route.distance;
                }
            });
            expect(distance).to.equal(22);
        });

        it('should not return route A-E-D when route is A-D', function() {
            var routes = router.dfs('A', 'D');
            var distance = undefined;
            routes.forEach(function(route, idx, arr) {
                if (route.path.toString() === 'A,E,D') {
                    distance = route.distance;
                }
            });
            expect(distance).to.equal(undefined);
        });

        it('should return 2 trips with maximum of 3 stops when route is C-C', function() {
            var routes = router.dfs('C', 'C');
            var arr = [];
            routes.forEach(function(route, idx, v) {
                if ((route.path.length - 1) <= 3) {
                     arr.push(route);
                }
            });
            expect(arr.length).to.equal(2);
        });

        it('should return 3 trips with 4 stops when route is A-C', function() {
            var routes = router.dfs('A', 'C');
            var arr = [];
            routes.forEach(function(route, idx, v) {
                if ((route.path.length) === 5) {
                     arr.push(route);
                }
            });
            expect(arr.length).to.equal(3);
        });

        it('should return shortest distance 9 when route is A-C', function() {
            var shortest = router.shortest('A', 'C');
            expect(shortest.distance).to.equal(9);
        });

        it('should return shortest distance 9 when route is B-B', function() {
            var shortest = router.shortest('B', 'B');
            expect(shortest.distance).to.equal(9);
        });

        it('should return 7 routes with distance less than 30 when route is C-C', function(done) {
            var routes = router.dfs('C', 'C');
            var arr = [];
            routes.forEach(function(route, idx, v) {
                if (route.distance < 30) {
                     arr.push(route);
                }
            });
            expect(arr.length).to.equal(7);
            done();
        });
    });
});
