/**
 * performance.now cross-browser
 * @author Colin Mutter <colin.mutter@gmail.com>
 */

/**
 * Deps
 */
var bind = require('./bind');

/**
 * Determine nav start offset w/o global polyfill for unsupprted clients
 */
var nowOffset;
if (typeof window.performance === 'undefined' || !window.performance.timing) {
  nowOffset = +new Date();
}
else {
  nowOffset = window.performance.timing.navigationStart || +new Date();
}

/**
 * performance.now cross-browser
 * @return {Number}
 */
module.exports = function now() {
  var perf;
  if (typeof window.performance === 'undefined' || !window.performance.now) {
    perf = {};
  }
  else {
    perf = window.performance;
  }

  /**
   * Return a cross-browser performance.now result
   */
  var val = bind(perf, (perf.now ||
    perf.mozNow ||
    perf.msNow ||
    perf.oNow ||
    perf.webkitNow ||
    function () {
      return (+new Date() - nowOffset);
    }))();

  console.log(+new Date(), nowOffset, parseFloat(val));
}