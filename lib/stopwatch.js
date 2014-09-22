/**
 * Stopwatch
 * @author Colin Mutter < colin.mutter@ gmail.com >
 */

/**
 * Deps
 */
var now = require('./now');

/**
 * Expose Stopwatch
 */
exports = module.exports = Stopwatch;

/**
 * Stopwatch
 * @param {String} name
 */
function Stopwatch(name) {
  this.name = name;
  this.ticks = [];
  this.running = 0;
}

/**
 * Start the timer
 */
Stopwatch.prototype.start = function () {
  if (!this.running) {
    this.running = 1;
    this.ticks.push(notch('start'));
  }
}

/**
 * Stop the timer
 */
Stopwatch.prototype.stop = function () {
  if (this.running) {
    this.running = 0;
    this.ticks.push(notch('stop'));
  }
}

/**
 * Add a notch in the timer
 * @param  {String} annotation optional notch annotation
 */
Stopwatch.prototype.notch = function (annotation) {
  // Ensure running
  this.start();
  this.ticks.push(notch('notch', annotation));
}

/**
 * Clear the timer
 */
Stopwatch.prototype.reset = function () {
  this.ticks = [];
}

/**
 * Retrieve the timing results
 */
Stopwatch.prototype.report = function () {
  var result = {
    total: 0,
    notches: []
  };

  var last = 0;
  for (var i = 0, j = this.ticks.length; i < j; i++) {
    var tick = this.ticks[i];

    switch (tick.event) {
    case 'start':
      last = tick.time;
      break;
    case 'stop':
      result.total += tick.time - last;
      last = tick.time;
      break;
    case 'notch':
      result.notches.push({
        note: tick.note,
        time: tick.time - last
      });
      break;
    }

  }

  return result;
}

/**
 * Notch model
 * @param  {String} ev         event label
 * @param  {String} annotation optional annotation
 * @return {Object}
 */
function notch(ev, annotation) {

  var model = {
    time: now(),
    event: ev
  };

  if (annotation) {
    model.note = annotation;
  }

  return model;
}