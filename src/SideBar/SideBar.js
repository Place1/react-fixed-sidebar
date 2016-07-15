import React, { PropTypes } from 'react';
import Hammer from 'hammerjs'
import './style.scss'

window.Hammer = Hammer


function setupHammer(selector) {
	// attach gesture listeners to HTML element
	const element = document.querySelector(selector)
	const touchManager = new Hammer.Manager(element)
	const swipeActionToggle = new Hammer.Pan({
		event: 'toggle',
		pointers: 1,
		threshold: 10,
		direction: Hammer.DIRECTION_HORIZONTAL,
		velocity: 0.3
	})
	touchManager.add(swipeActionToggle)
	return touchManager
}

function cleanupHammer(selector) {
 // not sure what to do here yet.
}

class SideBar extends React.Component {

	static propTypes = {

	}

	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			xPos: -200,
		}
		this.lastDelta = 0
	}

	componentDidMount() {
		this.touchManager = setupHammer('.sidebar__touchbox')
		this.touchManager.on('toggle', this.toggle)
	}

	componentWillUnmount() {
		this.touchManager.removeListener('toggle', this.toggle) // might actually be '.off()'
		cleanupHammer('.sidebar__touchbox')
	}

	toggle = event => {
		const { xPos } = this.state
		let newXPos = xPos + event.deltaX - this.lastDelta
		newXPos = (newXPos <= -200) ? -200 : newXPos
		newXPos = (newXPos >= 0) ? 0 : newXPos
		if (event.isFinal) {
			this.lastDelta = 0
		}
		else {
			this.lastDelta = event.deltaX
		}
		this.setState({xPos: newXPos})
	}

	get style() {
		return {
			left: this.state.xPos,
		}
	}

	render() {
		return (
			<div
				style={this.style}
				className="sidebar"
				ref={x => this.sidebar = x}
			>
				SideBar
				<div className="sidebar__touchbox"></div>
			</div>
		);
	}
}

export default SideBar
