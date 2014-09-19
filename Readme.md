
# stopwatch

See how long it takes to do things ;)

A component to manage one or more high-resolution performance timers.  In the event performance.now is available in the browser, it will be used over Date.  Time calculations are only performed during _report_ so this library would be very low impact from an application performance standpoint.

## Installation

  Install with [component(1)](http://component.io):

    $ component install colinmutter/stopwatch
    

  Use with component

	var stopwatch = require('stopwatch');
	
  Use with duo

	var stopwatch = require('colinmutter/stopwatch');

## API

####start(name)
Starts an arbitrarily named stopwatch

####stop(name)
Stops the stopwatch for the given name

####reset(name)
Resets the stopwatch for the given name
	
####notch(name, annotation)
Adds a 'notch' in the timer with an optional note.  Notches allow for events of interest to be logged off with their respective timestamps from the initial start time.

####report(name)
Returns the timing report object for a given timer.

```javascript

	stopwatch.start('app');
	
	// Let some time elapse...
	stopwatch.notch('app', 'downloaded');
	stopwatch.notch('app', 'init');
	
	stopwatch.stop('app');
	var report = stopwatch.report('app');
	
	/*
	{ 
		total: 153,
  		notches: [ 
			{ 
				note: 'downloaded', 
				time: 53 
			}, 
			{ 
				note: 'init', 
				time: 100 
			} 
		] 
	}
	*/
```

## TODO
Add more analysis in the report for timings between notches.


## License

  The MIT License (MIT)

  Copyright (c) 2014 <copyright holders>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.