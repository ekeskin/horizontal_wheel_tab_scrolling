let scrollDownAccumulator = 0;
let scrollUpAccumulator = 0;
let scrollThreshold = 150;

window.addEventListener('wheel', function (event) {

	// only act if right mouse button held down
	// and/or required modifier keys (if any set)
	if (event.isTrusted && event.wheelDelta == event.wheelDeltaX) {

		// prevent page scrolling
		event.preventDefault();
		event.stopPropagation();

		// send tab scroll request to background
		if (event.wheelDelta > 0) {
			scrollDownAccumulator += Math.abs(event.wheelDelta);
			if (scrollDownAccumulator >= scrollThreshold) {
				scrollDownAccumulator = 0;
				browser.runtime.sendMessage({
					topic: 'scrollDown',
                    delta: event.wheelDelta
			});
			}
		} else if (event.wheelDelta < 0) {
			scrollUpAccumulator += Math.abs(event.wheelDelta);
			if (scrollUpAccumulator >= scrollThreshold) {
				scrollUpAccumulator = 0;
				browser.runtime.sendMessage({
					topic: 'scrollUp',
                    delta: event.wheelDelta
				});
			}
		}
	}

}, { passive: false });

