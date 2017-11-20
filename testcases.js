"use strict";
console.log("Testing cpuinfo for node-js");
console.log(process.versions);
let
	E = null,
	fs = require("fs"),
	util = require("util"),
	cpuinfo = require(".");

// It may or may not be ok if these first sections fail, depending on host system:
function mayfail(m, f){
	if (!util.isFunction(f)) throw new Error(m+" ERROR: Not a function");
	f(
		(err, n) => {
			console.log(m);
			if (err) console.log(err);
			console.log(n);
		}
	);
}

// simple counts
let count={"": null};
for (var i in cpuinfo.getCPUNumber)
	if( util.isFunction(cpuinfo.getCPUNumber[i]) )
		count[i] = null;
getCount();
function getCount(){
	var i, c = false;
	for (i in count)
		if (count.hasOwnProperty(i) && !count[i]) {
			c = true;
			break;
		}
	if (c)
		(i ? cpuinfo.getCPUNumber[i] : cpuinfo.getCPUNumber)(
			(err, n) => {
				count[i] = {err:err, v:n};
				process.nextTick(getCount);
			}
		);
	else {
		console.log("cpuinfo.getCPUNumber:");
		for (var i in count) if (count.hasOwnProperty(i)) {
			console.log(
				i+":\t"
				+count[i].v
				+"\t"+(
					count[i].err || (
						count[i].v === count[""].v
						? "Same result"
						: "Different result"
					)
				)
			);
		}
		if (count[""].err || !count[""].v) throw count[""].err || new Error("0 count");
	}
}

// objects
mayfail(
	"procCPUInfo:",
	cpuinfo.getProcCPUInfo
);
console.log("os.cpus:");
console.log(require("os").cpus());

//raw dump for debugging
function dump(path) {
	fs.readFile(
		path,
		(err, data) => {
			console.log(path);
			if (err) console.log(err);
			console.log(data+'');
		}
	);
}
dump("/proc/cpuinfo");
dump("/proc/stat");
dump("/sys/devices/system/cpu/possible");
dump("/sys/devices/system/cpu/present");
fs.readdir(
	"/sys/devices/system/cpu",
	(err, files) => {
		console.log("/sys/devices/system/cpu");
		if (err) console.log(err);
		console.log(files);
	}
);

// The following must not fail, under assumed conditions, and should throw any errors:
cpuinfo.getCPUNumber(
	// redundant check in case more complex one fails
	(err, n) => {
		console.log("Number of CPUs:");
		console.log(n);
		if (err) throw err;
	}
);
cpuinfo(
	(err, cpus) => {
		console.log("CPU info:");
		console.log(cpus);
		if (err) throw err;
	}
);
