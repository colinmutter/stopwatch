exports = module.exports = Stopwatch;

/**
 * Get the highest resolution time function possible
 * @type {Function}
 */
var now;

/**
 * Stopwatch
 * @param {String} name
 */
function Stopwatch(name) {
  this.name = name;
  this.ticks = [];
  this.running = 0;
  // Resolve date fn on creation to allow for mocking
  now = timeFn();
}

/**
 * Start the timer
 */
Stopwatch.prototype.start = function () {
  if (!this.running) {
    this.running = 1;
    this.ticks.push(notch(now(), 'start'));
  }
}

/**
 * Stop the timer
 */
Stopwatch.prototype.stop = function () {
  if (this.running) {
    this.running = 0;
    this.ticks.push(notch(now(), 'stop'));
  }
}

/**
 * Add a notch in the timer
 * @param  {String} annotation optional notch annotation
 */
Stopwatch.prototype.notch = function (annotation) {
  // Ensure running
  this.start();
  this.ticks.push(notch(now(), 'notch', annotation));
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
 * @param  {Number} time       current timestamp
 * @param  {String} ev         event label
 * @param  {String} annotation optional annotation
 * @return {Object}
 */
function notch(time, ev, annotation) {
  var model = {
    time: time,
    event: ev
  };

  if (annotation) {
    model.note = annotation;
  }

  return model;
}


/**
 * Retrieves a high-resolution time
 * @return {Number}
 */
function timeFn() {
  if (typeof performance !== 'undefined' && typeof performance.now ===
    'function') {
    return performance.now;
  }
  else {
    return Date.now || function () {
      return +(new Date)
    }
  }

}