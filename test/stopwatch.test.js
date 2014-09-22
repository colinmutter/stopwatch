/**
 * Duo // browser compatible dependencies
 */
var expect = require('LearnBoost/expect.js');
var Stopwatch = require('../lib/stopwatch');

/**
 * Sinon sandbox for clock maniuplation
 */
var sandbox;

describe('stopwatch', function () {

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
      var stopwatch = new Stopwatch('foo');
      stopwatch.start();
      expect(stopwatch).to.have.property('name', 'foo');
      expect(stopwatch).to.have.property('ticks');
      expect(stopwatch.ticks).to.be.an('array');
      expect(stopwatch.ticks).to.have.length(1);
    });

  });

  describe('stop', function () {

    it('should stop a stopwatch', function () {
      var stopwatch = new Stopwatch('bar');
      stopwatch.start();
      stopwatch.stop();
      expect(stopwatch).to.have.property('name', 'bar');
      expect(stopwatch).to.have.property('ticks');
      expect(stopwatch.ticks).to.be.an('array');
      expect(stopwatch.ticks).to.have.length(2);
    });

  });

  describe('notch', function () {

    it('should notch the stopwatch', function () {
      var stopwatch = new Stopwatch('fuzz');
      stopwatch.start();
      stopwatch.notch('testing 1');
      stopwatch.notch('testing 2');
      stopwatch.stop();
      expect(stopwatch.ticks).to.have.length(4);
    });
  });

  describe('reset', function () {

    it('should reset the stopwatch', function () {
      var stopwatch = new Stopwatch('buzz');
      stopwatch.start();
      stopwatch.notch('testing 1');
      stopwatch.notch('testing 2');
      stopwatch.stop();
      expect(stopwatch.ticks).to.have.length(4);
      stopwatch.reset();
      expect(stopwatch.ticks).to.have.length(0);
      var report = stopwatch.report();
      expect(report.total).to.be.a('number');
      expect(report.total).to.equal(0);
    });

  });

  describe('report', function () {

    it('should report basic time after a short time', function () {
      var stopwatch = new Stopwatch('buzz');
      stopwatch.start();
      sandbox.clock.tick(50);
      stopwatch.stop();
      var report = stopwatch.report();
      expect(report).to.be.an(Object);
      expect(report).to.have.property('notches');
      expect(report).to.have.property('total');
      expect(report.total).to.be.a('number');
      expect(report.total).to.be(50);
    });

    it('should notch the stopwatch', function () {
      var stopwatch = new Stopwatch('fuzz');
      stopwatch.start();
      sandbox.clock.tick(50);
      stopwatch.notch('test 1');
      sandbox.clock.tick(50);
      stopwatch.notch('test 2');
      sandbox.clock.tick(50);
      stopwatch.stop();
      expect(stopwatch.ticks).to.have.length(4);
      var report = stopwatch.report();
      expect(report.notches).to.have.length(2);
      // Roughly waited 50
      expect(report.notches[0].time).to.be(50);
      // Roughly waited 100
      expect(report.notches[1].time).to.be(100);
      // Roughly waited 150
      expect(report.total).to.be(150);
    });

    it('should report an accurate time after multiple stops', function () {
      var stopwatch = new Stopwatch('fuzz');
      stopwatch.start();
      sandbox.clock.tick(50);
      stopwatch.stop();
      sandbox.clock.tick(50);
      stopwatch.start();
      sandbox.clock.tick(50);
      stopwatch.stop();
      expect(stopwatch.ticks).to.have.length(4);
      var report = stopwatch.report();
      expect(report.notches).to.have.length(0);
      // Roughly waited 100 (two [not three] periods of 50)
      expect(report.total).to.be(100);
    });

  })
});