/* Default */
var args = _.extend({
	elasticity: 0.5,
	pushForce: 30,
}, arguments[0] || {});

console.log(args);

/* Vars */
var timeout;

var animator = Ti.UI.iOS.createAnimator({
	referenceView: $.caffeinaToastWindow
});

var collision = Ti.UI.iOS.createCollisionBehavior();
collision.addItem($.caffeinaToastView);
animator.addBehavior(collision);

var dy = Ti.UI.iOS.createDynamicItemBehavior({
	elasticity: args.elasticity
});
dy.addItem($.caffeinaToastView);
animator.addBehavior(dy);

var pusher = Ti.UI.iOS.createPushBehavior({
	pushDirection: { x: 0, y: args.pushForce },
});
pusher.addItem($.caffeinaToastView);
animator.addBehavior(pusher);

/* API */

function show() {
	$.caffeinaToastWindow.open();

	timeout = setTimeout(function(){
		dy.elasticity = 0;
		pusher.pushDirection = { x: 0, y: -args.pushForce };
		setTimeout(hide, 500);
	}, args.duration);
}

function hide() {
	clearTimeout(timeout);
	$.caffeinaToastWindow.close();
}

/* Init */

$.caffeinaToastLabel.text = args.message;

/* Listeners */

$.caffeinaToastWindow.addEventListener('touchstart', hide);
$.caffeinaToastWindow.addEventListener('open', function(){
	animator.startAnimator();
});

/* Public API */

exports.show = show;
exports.hide = hide;