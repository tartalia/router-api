var Digraph = require('../digraph').Digraph;
var expect = require('chai').expect;

var digraph = new Digraph();

describe('digraph', function() {
    describe('addEdge', function() {

        describe('invalid starting point', function() {
            it('should throw exception when starting point is null', function() {
                expect(function() {
                    digraph.addEdge(null, 'A', 1)
                }).to.throw(/should be valid/);
            });

            it('should throw exception when starting point is \'\'', function() {
                expect(function() {
                    digraph.addEdge('', 'A', 1)
                }).to.throw(/should be valid/);
            });

            it('should throw exception when starting point is undefined', function() {
                expect(function() {
                    digraph.addEdge(undefined, 'A', 1)
                }).to.throw(/should be valid/);
            });
        });

        describe('invalid ending point', function() {
            it('should throw exception when ending point is null', function() {
                expect(function() {
                    digraph.addEdge('A', null, 1)
                }).to.throw(/should be valid/);
            });

            it('should throw exception when ending point is \'\'', function() {
                expect(function() {
                    digraph.addEdge('A', '', 1)
                }).to.throw(/should be valid/);
            });

            it('should throw exception when ending point is undefined', function() {
                expect(function() {
                    digraph.addEdge('A', undefined, 1)
                }).to.throw(/should be valid/);
            });
        });

        describe('invalid weight', function() {
            it('should throw exception when weight is a string', function() {
                expect(function() {
                    digraph.addEdge('A', 'B', '1')
                }).to.throw(/should be a number/);
            });

            it('should throw exception when weight is null', function() {
                expect(function() {
                    digraph.addEdge('A', 'B', null)
                }).to.throw(/should be a number/);
            });

            it('should throw exception when weight is \'\'', function() {
                expect(function() {
                    digraph.addEdge('A', 'B', '')
                }).to.throw(/should be a number/);
            });

            it('should throw exception when weight is undefined', function() {
                expect(function() {
                    digraph.addEdge('A', 'B', undefined)
                }).to.throw(/should be a number/);
            });

            it('should throw exception when weight is negative', function() {
                expect(function() {
                    digraph.addEdge('A', 'B', -1)
                }).to.throw(/should not be negative/);
            });
        });

        describe('valid params', function() {
            it('shouldn\'t throw exception when all input data is valid', function() {
                expect(function() {
                    digraph.addEdge('A', 'B', 1)
                }).to.not.throw(Error);
            });

            it('should throw exception when starting point is equal to ending point', function() {
                expect(function() {
                    digraph.addEdge('A', 'A', 1)
                }).to.throw(/should not be equal/);
            });
        });

        describe('data structure', function() {
            it('should create an adjacence list', function() {
                var dg = new Digraph();
                dg.addEdge('A', 'B', 5);
                dg.addEdge('A', 'D', 5);
                dg.addEdge('A', 'E', 7);
                dg.addEdge('B', 'D', 2);
                dg.addEdge('D', 'E', 3);

                // vertex A
                var b, d, e;
                dg.getVerticesFrom('A').forEach(function(v, idx, arr) {
                    if (v.vertex === 'B') { b = v; }
                    if (v.vertex === 'D') { d = v; }
                    if (v.vertex === 'E') { e = v; }
                });
                expect(b.vertex).to.equal('B');
                expect(b.weight).to.equal(5);
                expect(d.vertex).to.equal('D');
                expect(d.weight).to.equal(5);
                expect(e.vertex).to.equal('E');
                expect(e.weight).to.equal(7);
                
                // vertex B
                d = null;
                dg.getVerticesFrom('B').forEach(function(v, idx, arr) {
                    if (v.vertex === 'D') { d = v; }
                });
                expect(d.vertex).to.equal('D');
                expect(d.weight).to.equal(2);

                // vertex D
                e = null;
                dg.getVerticesFrom('D').forEach(function(v, idx, arr) {
                    if (v.vertex === 'E') { e = v; }
                });
                expect(e.vertex).to.equal('E');
                expect(e.weight).to.equal(3);
            });
        });
    });
});
