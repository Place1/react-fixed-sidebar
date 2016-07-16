import Hammer from 'hammerjs'

// adapter for Hammer.Manager to support multiple elements
class HammerAdapter {

	constructor(elements) {
		// elements can be single or an array
		elements = (Array.isArray(elements)) ? elements : [elements];
		this.items = elements.map(element => {
			return new Hammer.Manager(element);
		});
	}

	add(action) {
		this.items.forEach(item => item.add(action));
	}

	on(event, callback) {
		this.items.forEach(item => item.on(event, callback));
	}

	off(event, callback) {
		this.items.forEach(item => item.off(event, callback));
	}

	destroy() {
		this.items.forEach(item => item.destroy());
	}
}

export default HammerAdapter;
