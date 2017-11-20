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
mayfail(
	"Number of CPUs according to /proc/stat:",
	cpuinfo.getCPUNumber.fromProcStat
);
mayfail(
	"Number of CPUs according to /proc/cpuinfo:",
	cpuinfo.getCPUNumber.fromProcCPUInfo
);
mayfail(
	"Number of CPUs according to /sys/devices/system/cpu/possible:",
	cpuinfo.getCPUNumber.fromSysDevicesPossible
);
mayfail(
	"Number of CPUs according to /sys/devices/system/cpu/present:",
	cpuinfo.getCPUNumber.fromSysDevicesPresent
);
mayfail(
	"Number of CPUs according to /sys/devices/system/cpu:",
	cpuinfo.getCPUNumber.fromSysDevicesCPUDir
);

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
