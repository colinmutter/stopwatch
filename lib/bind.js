/**
 * Simple context binding for compatibility
 *
 * @param  {Object}   obj Context to bind to
 * @param  {Function} fn  Function that needs binding
 * @return {Function}       Context-bound function
 */
module.exports = function bind(obj, fn) {
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = [].slice.call(arguments, 2);
  return function () {
    return fn.apply(obj, args.concat([].slice.call(arguments)));
  }
}