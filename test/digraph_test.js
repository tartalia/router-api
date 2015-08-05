var Digraph = require('../digraph');
var expect = require('chai').expect;

var digraph = new Digraph();

describe('digraph', function() {
    describe('addPath', function() {

        describe('invalid starting point', function() {

            it('should throw exception when starting point is not a string', function() {
                expect(function() {
                    digraph.addPath(0, 'A', 1)
                }).to.throw(/should be a string/);
            });

            it('should throw exception when starting point is null', function() {
                expect(function() {
                    digraph.addPath(null, 'A', 1)
                }).to.throw(/should be a string/);
            });

            it('should throw exception when starting point is \'\'', function() {
                expect(function() {
                    digraph.addPath('', 'A', 1)
                }).to.throw(/should be a valid string/);
            });

            it('should throw exception when starting point is undefined', function() {
                expect(function() {
                    digraph.addPath(undefined, 'A', 1)
                }).to.throw(/should be a string/);
            });
        });

        describe('invalid ending point', function() {

            it('should throw exception when ending point is not a string', function() {
                expect(function() {
                    digraph.addPath('A', 0, 1)
                }).to.throw(/should be a string/);
            });

            it('should throw exception when ending point is null', function() {
                expect(function() {
                    digraph.addPath('A', null, 1)
                }).to.throw(/should be a string/);
            });

            it('should throw exception when ending point is \'\'', function() {
                expect(function() {
                    digraph.addPath('A', '', 1)
                }).to.throw(/should be a valid string/);
            });

            it('should throw exception when ending point is undefined', function() {
                expect(function() {
                    digraph.addPath('A', undefined, 1)
                }).to.throw(/should be a string/);
            });
        });

        describe('invalid weight', function() {

            it('should throw exception when weight is a string', function() {
                expect(function() {
                    digraph.addPath('A', 'B', '1')
                }).to.throw(/should be a number/);
            });

            it('should throw exception when weight is null', function() {
                expect(function() {
                    digraph.addPath('A', 'B', null)
                }).to.throw(/should be a number/);
            });

            it('should throw exception when weight is \'\'', function() {
                expect(function() {
                    digraph.addPath('A', 'B', '')
                }).to.throw(/should be a number/);
            });

            it('should throw exception when weight is undefined', function() {
                expect(function() {
                    digraph.addPath('A', 'B', undefined)
                }).to.throw(/should be a number/);
            });

            it('should throw exception when weight is negative', function() {
                expect(function() {
                    digraph.addPath('A', 'B', -1)
                }).to.throw(/should not be negative/);
            });
        });

        describe('valid params', function() {

            it('shouldn\'t throw exception when all input data is valid', function() {
                expect(function() {
                    digraph.addPath('A', 'B', 1)
                }).to.not.throw(Error);
            });

            it('should throw exception when starting point is equal to ending point', function() {
                expect(function() {
                    digraph.addPath('A', 'A', 1)
                }).to.throw(/startingPoint and ending should not be equal/);
            });
        });

        describe('data structure', function() {

            it('should add or find a vertex', function() {
                var dg = new Digraph();
                var idx = dg.addOrFindVertex('A');
                expect(idx).to.be.equal(0);
                var idx = dg.addOrFindVertex('A');
                expect(idx).to.be.equal(0);
            });

            it('should find a vertex', function() {
                var dg = new Digraph();
                dg.addOrFindVertex('A');
                var idx = dg.getVertexIndex('A');
                expect(idx).to.be.equal(0);
                dg.addOrFindVertex('B');
                var idx = dg.getVertexIndex('B');
                expect(idx).to.be.equal(1);
            });

            it('should add paths from vertex A to vertex B, C and D', function() {
                var dg = new Digraph();
                dg.addPath('A', 'B', 5);
                dg.addPath('A', 'D', 5);
                dg.addPath('A', 'E', 7);

                var paths = dg.getPathsFrom('A');
                expect(paths.length).to.be.equal(3);

                // A-B
                expect(paths[0].vertex).to.be.equal(dg.getVertexIndex('B'));
                expect(paths[0].weight).to.be.equal(5);

                // A-D
                expect(paths[1].vertex).to.be.equal(dg.getVertexIndex('D'));
                expect(paths[1].weight).to.be.equal(5);

                // A-E
                expect(paths[2].vertex).to.be.equal(dg.getVertexIndex('E'));
                expect(paths[2].weight).to.be.equal(7);
            });

            it('should return digraph paths as a matrix', function() {
                var paths = digraph.getPathsFrom('A');
            });
        });
    });
});
