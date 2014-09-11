var expect = require('expect.js'),
  sinon = require('sinon'),
  stopwatch = require('..');

/**
 * Sinon sandbox for clock maniuplation
 */
var sandbox;

describe('index', function () {

  beforeEach(function () {
    sandbox = sinon.sandbox.create({
      properties: ["clock"],
      useFakeTimers: true
    });
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('start', function () {

    it('should create a new stopwatch', function () {
      stopwatch.start('foo');
      var watch = stopwatch.get('foo');
      expect(watch).to.have.property('name', 'foo');
      expect(watch).to.have.property('ticks');
      expect(watch.ticks).to.be.an('array');
      expect(watch.ticks).to.have.length(1);
    });

    it('should create multiple new stopwatches', function () {
      stopwatch.start('foo');
      stopwatch.start('bar');
      stopwatch.start('buzz');
      var foo = stopwatch.get('foo');
      var bar = stopwatch.get('bar');
      var buzz = stopwatch.get('buzz');
      expect(foo).to.have.property('name', 'foo');
      expect(bar).to.have.property('name', 'bar');
      expect(buzz).to.have.property('name', 'buzz');
    });

  });

  describe('stop', function () {

    it('should stop a stopwatch', function () {
      stopwatch.start('foo');
      stopwatch.stop('foo');
      var foo = stopwatch.get('foo');
      expect(foo).to.have.property('name', 'foo');
      expect(foo).to.have.property('ticks');
      expect(foo.ticks).to.have.length(2);
    });

  });

  describe('notch', function () {

    it('should notch the stopwatch', function () {
      stopwatch.start('fuzz');
      stopwatch.notch('fuzz', 'testing 1');
      stopwatch.notch('fuzz', 'testing 2');
      stopwatch.stop('fuzz');
      expect(stopwatch.get('fuzz').ticks).to.have.length(4);
    });
  });

  describe('reset', function () {

    it('should reset the stopwatch', function () {
      stopwatch.start('buzz');
      stopwatch.notch('buzz', 'testing 1');
      stopwatch.notch('buzz', 'testing 2');
      stopwatch.stop('buzz');
      expect(stopwatch.get('buzz').ticks).to.have.length(4);
      stopwatch.reset('buzz');
      expect(stopwatch.get('buzz').ticks).to.have.length(0);
    });

  });

  describe('report', function () {

    it('should report basic time after a short time', function () {
      stopwatch.start('foo');
      sandbox.clock.tick(50);
      stopwatch.stop('foo');
      var report = stopwatch.report('foo');
      expect(report).to.be.an(Object);
      expect(report).to.have.property('notches');
      expect(report).to.have.property('total');
      expect(report.total).to.be.a('number');
      expect(report.total).to.be(50);
    });

  });

});