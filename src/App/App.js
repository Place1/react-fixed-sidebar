import React from 'react';
import SideBar from '../SideBar';
import './style.scss'

class App extends React.Component {
	static propTypes = {

	}

	openNav = () => {
		this.sidebar.open()
	}

	closeNav = () => {
		this.sidebar.close()
	}

	toggleNav = () => {
		this.sidebar.toggle()
	}

	render() {
		return (
			<div className="app">
				<div className="app__buttons">
					<button onClick={this.openNav}>open</button>
					<button onClick={this.closeNav}>close</button>
					<button onClick={this.toggleNav}>toggle</button>
				</div>
				<SideBar
					ref={x => this.sidebar = x}
					allowPartial={false}
					className="app__sidebar"
				/>
			</div>
		);
	}
}

export default App
