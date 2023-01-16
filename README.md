# cpuinfo [![Build Status](https://secure.travis-ci.org/Quasic/cpuinfo.png)](http://travis-ci.org/Quasic/cpuinfo)

Hopefully an improvement to os.cpus()

Instead of returning undefined on errors, this package returns any information it is able to collect using standard (err, result) callbacks.

The individual methods of getting this information are also exposed.
