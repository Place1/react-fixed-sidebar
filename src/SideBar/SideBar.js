import React, { PropTypes } from 'react';
import Hammer from 'hammerjs'
import HammerAdapter from './HammerAdapter';
import './style.scss'

function setupHammer(elements) {
	// attach gesture listeners to HTML element
	const touchManager = new HammerAdapter(elements)
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
		width: PropTypes.number,
		children: PropTypes.node,
		noPartial: PropTypes.bool,
		className: PropTypes.string,
	}

	static defaultProps = {
		width: 200,
		children: null,
		noPartial: false,
		className: '',
	}

	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			xPos: -this.props.width,
			activeClass: '', // either '' or 'sidebar--active'
			hidden: true, // default to true as the sidebar defaults to isOpen==false
		}
		this.lastDelta = 0
	}

	componentDidMount() {
		this.touchManager = setupHammer([this.sidebar, this.sidebar__touchbox])
		this.touchManager.on('toggle', this.handleTouch)
	}

	componentWillUnmount() {
		// this.touchManager.removeListener('toggle', this.toggle) // might actually be '.off()'
		// cleanupHammer('.sidebar__touchbox')
	}

	handleTouch = event => {
		let { xPos, isOpen } = this.state
		let activeClass = 'sidebar--active'
		let hidden = false
		xPos += event.deltaX - this.lastDelta
		if (xPos <= -this.props.width) {
			xPos = -this.props.width
			isOpen = false
			hidden = true
		}
		if (xPos >= 0) {
			xPos = 0
			isOpen = true
			hidden = false
		}
		if (event.isFinal) {
			this.lastDelta = 0
			activeClass = ''
			// handle partial open/close on touch finish
			if (this.props.noPartial) {
				if (xPos < -this.props.width/2) {
					// should close
					setTimeout(this.close, 0)
				}
				else {
					// should open
					setTimeout(this.open, 0)
				}
			}
		}
		else {
			this.lastDelta = event.deltaX
		}
		this.setState({xPos, activeClass, isOpen, hidden})
	}

	open = () => {
		this.setState({
			isOpen: true,
			activeClass: 'sidebar--active sidebar--opening',
			xPos: 0,
			hidden: false,
		})
	}

	close = () => {
		this.setState({
			isOpen: false,
			activeClass: 'sidebar--active sidebar--closing',
			xPos: -this.props.width,
		})
		setTimeout(() => this.setState({hidden: true}), 300)
	}

	toggle = () => {
		if (this.state.isOpen) {
			this.close()
		}
		else {
			this.open()
		}
	}

	get style() {
		return {
			left: this.state.xPos,
			width: this.props.width,
			opacity: this.state.hidden ? '0' : '1',
		}
	}

	render() {
		return (
			<div>
				<div
					style={this.style}
					className={`sidebar ${this.props.className} ${this.state.activeClass}`}
					ref={x => this.sidebar = x}
				>
					{this.props.children}
				</div>
				<div
					className="sidebar__touchbox"
					ref={x => this.sidebar__touchbox = x}
				></div>
			</div>
		);
	}
}

export default SideBar
