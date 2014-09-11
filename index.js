var Stopwatch = require('./stopwatch');

/**
 * Expose operations
 */
exports.get = get;
exports.clearAll = clearAll;

/**
 * Set of existing stopwatches
 * @type {Object}
 */
var watches = {};

/**
 * Command pattern delegation
 */
['start', 'stop', 'notch', 'reset', 'report'].forEach(function (e) {
  exports[e] = function (name) {
    var args = [].slice.call(arguments, 1);
    var watch = get(name);
    return watch[e].apply(watch, args);
  };
});

/**
 * Clears all watches
 */
function clearAll() {
  watches = {};
}

/**
 * Retrieves a watch by name
 * @param  {String} name arbitrary name of this watch
 * @return {Stopwatch}
 */
function get(name) {
  if (!watches[name]) {
    watches[name] = new Stopwatch(name);
  }
  return watches[name];
}