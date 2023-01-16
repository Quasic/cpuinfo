console.log("Testing cpuinfo for node-js");
console.log(process.versions);
let
	E = null,
	cpuinfo = require(".");

// It may or may not be ok if these first sections fail, depending on host system:
cpuinfo.getCPUNumber.fromProcStat(
	(err, n) => {
		console.log("Number of CPUs according to /proc/stat:");
		if (err) console.error(err);
		console.log(n);
	}
);
cpuinfo.getCPUNumber.fromSysDevicesPossible(
	(err, n) => {
		console.log("Number of CPUs according to /sys/devices/system/cpu/possible:");
		if (err) console.error(err);
		console.log(n);
	}
);
cpuinfo.getCPUNumber.fromSysDevicesPresent(
	(err, n) => {
		console.log("Number of CPUs according to /sys/devices/system/cpu/present:");
		if (err) console.error(err);
		console.log(n);
	}
);
cpuinfo.getCPUNumber.fromSysDevicesCPUDir(
	(err, n) => {
		console.log("Number of CPUs according to /sys/devices/system/cpu:");
		if (err) console.error(err);
		console.log(n);
	}
);
console.log("os.cpus:");
console.log(require("os").cpus());
cpuinfo.getProcCPUInfo(
	(err, cpus) => {
		console.log("CPUInfo:");
		if (err) console.error(err);
		console.log(cpus);
	}
);

// The following must not fail, and should throw any errors:
cpuinfo.getCPUNumber(
	(err, n) => {
		console.log("Number of CPUs:");
		if (err) throw err;
		console.log(n);
	}
);
cpuinfo(
	(err, cpus) => {
		console.log("CPU info:");
		if (err) throw err;
		console.log(cpus);
	}
);
