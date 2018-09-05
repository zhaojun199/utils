var log = console.log;
var warn = console.warn;

var utils = {};
/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，action 才会执行
 * @param action {function}  请求关联函数，实际应用需要调用的函数
 * @param delay  {number}    空闲时间，单位毫秒
 * @return 		 {function}  返回客户调用函数
 */
utils.debounce = function(action, delay) {
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

module.exports = utils;
