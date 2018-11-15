var warn = console.warn;

/**
 * 打印
 * @param 	any 	{any}  需要打印的参数，同console.log
 * @return 		 	{undefined}
 */
var log = function() {
	var args = arguments || [];
	if (log.showLog) {
		var t = new Date().toLocaleTimeString();
        console.log.apply(console, [t,': '].concat(Array.from(args)));
	}
};
log.showLog = true;

/**
 * 打印序列化后的参数，同console.log
 * @param 	any 	{any}  需要打印的参数，同console.log
 * @return 		 	{undefined}
 */
var logs = function() {
	var args = arguments;
	var jsonArgs = Array.prototype.map.call(args, it => {
		return JSON.stringify(it);
	});
	return console.log.apply(this, jsonArgs);
};

/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，action 才会执行
 * @param action {function}  请求关联函数，实际应用需要调用的函数
 * @param delay  {number}    空闲时间，单位毫秒
 * @return 		 {function}  返回客户调用函数
 */
function debounce(action, delay) {
	if (typeof action !== 'function') {
		warn('debounce receive a param not function');
		return action;
	}
	delay = + delay || 0;
	var last;
	return function() {
		var ctx = this, args = arguments;
		if (last) {
			clearTimeout(last);
		}
		last = setTimeout(function() {
			action.apply(ctx, args);
		}, delay);
	};
}

var utils = {};
utils.log = log;
utils.logs = logs;
utils.debounce = debounce;

module.exports = utils;
