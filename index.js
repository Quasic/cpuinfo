(function(){
"use strict";
const
	os = require("os"),
	fs = require("fs");
module.exports = (callback) => {
	let cpus = os.cpus();
	if (cpus && cpus.length)
		callback(null, cpus);
	else getCPUNumber(
		(err, n) => {
			if (err) callback(err);
			// gather other info
		}
	);
};
const getCPUNumber =
module.exports.getCPUNumber =
module.exports.getVirtualCPUNumber = (callback) => {
	let
		cpus = os.cpus();
	if (cpus && cpus.length)
		callback(null, cpus.length);
	else
		getPresentCPUNumber(
			(err, n) => {
				if (err)
		getCPUNumberFromDir(
			(err, n) => {
				if (err)
		getCPUNumberFromProcStat(
			(err, n) => {
				if (err)
		getCPUNumberFromProcCPUInfo(
			(err, n) => {
				callback(err, n);
			}
		);
				else
					callback(err, n);
			}
		);
				else
					callback(err, n);
			}
		);
				else
					callback(err, n);
			}
		);
};

function getCPUNumberFromRange(err, data, callback){
	let s = data+'';
	if (err || s.substring(0,2) !== "0-" || isNaN(s.substring(2)))
		callback(new Error("Expected '0-' followed by a number, but found '"+s+"'"));
	else
		callback(null, 1 + +s.substring(2));
}
const getPossibleCPUNumber =
module.exports.getCPUNumber.fromSysDevicesPossible = (callback) => {
	fs.readFile(
		"/sys/devices/system/cpu/possible",
		(err, data) => {
			if (err) callback(err);
			else getCPUNumberFromRange(err, data, callback);
		}
	);
};
const getPresentCPUNumber =
module.exports.getCPUNumber.fromSysDevicesPresent = (callback) => {
	fs.readFile(
		"/sys/devices/system/cpu/present",
		(err, data) => {
			if (err) callback(err);
			else getCPUNumberFromRange(err, data, callback);
		}
	);
};
const getCPUNumberFromDir =
module.exports.getCPUNumber.fromSysDevicesCPUDir = (callback) => {
	fs.readdir(
		"/sys/devices/system/cpu",
		(err, files) => {
			if (err) return callback(err);
			let n=0;
			for (var i = 0; i < files.length; i++)
				if (files[i].substring(0,3) === "cpu" && !isNaN(files[i].substring(3)))
					n++;
			callback(n ? null : new Error("No CPUs found"), n);
		}
	);
};
//module.exports.getPhysicalCPUNumber
// It is very remotely possible that proc stat succeeded, but reading the models has failed, or more likely visa versa (such as in Android 8), so these are second attempts, basically ported from linux-core.c of libuv
const getCPUNumberFromProcStat =
module.exports.getCPUNumber.fromProcStat = (callback) => {
	fs.readFile(
		"/proc/stat",
		(err, data) => {
			if (err) callback(err);
			else parseProcStatCPUNumber(data, callback);
		}
	);
};
const parseProcStatCPUNumber = (data, callback) => {
	let
		lines = (data+"").split("\n"),
		n = 0;
	if (lines[0].substring(0,4) !== "cpu ")return callback(new Error("expected /proc/stat to start with 'cpu ' but found '"+lines[0].substring(0,4)+"'"));
	for (var i = 1; i < lines.length; i++)
		if (lines[i].substring(0,3) === "cpu")
			n++;
	callback(n ? null : new Error("No CPUs found"), n);
};
const getCPUNumberFromProcCPUInfo =
module.exports.getCPUNumber.fromProcCPUInfo = (callback) => {
	callback(new Error("Not yet implemented"));
};
const getProcStat =
module.exports.getProcStat = (callback) => {
	fs.readFile(
		"/proc/stat",
		(err, data) => {
			if (err) callback(err);
			else parseProcStatCPUNumber(
				data,
				(err, n) => {
					if (err) return callback(err);
					let cpus = [];
					//TODO: for(var i = 0; i < n; i++)
					callback(new Error("Not yet implemented"));

				}
			);
		}
	);
}
const getProcCPUInfo =
module.exports.getProcCPUInfo = (callback) => {
	callback(new Error("Not yet implemented"));
};
})();
