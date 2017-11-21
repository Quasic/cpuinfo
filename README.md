# cpuinfo [![Build Status](https://secure.travis-ci.org/Quasic/cpuinfo.png)](http://travis-ci.org/Quasic/cpuinfo)

Hopefully an improvement to os.cpus()

Instead of returning undefined on errors, this package returns any information it is able to collect using standard (err, result) callbacks.

The individual methods of getting this information are also exposed.

# Usage

To simply get the number of virtual CPUs, use
`````js
require("cpuinfo").getCPUNumber(callback);
`````
The first parameter of the callback will be null on success or contain error information on failure. The second parameter will be the number of virtual CPUs. This method has submethods that return counts obtained from various sources, using the same callback form.
