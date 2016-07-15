# React Fixed Side Bar

## Usage:

### Example:

```javascript
import React from 'react';
import SideBar from 'react-fixed-sidebar';

class App extends React.Component {

	toggleSideBar = event => {
		// use our 'ref' to the sidebar component
		// to open it
		this.sidebar.toggle()
	}

	render() {
		return (
			<div>
				<h1>Hello World!</h1>
				<button
					onClick={this.toggleSideBar}
					style={{float: 'right'}}
				>
					Toggle Sidebar
				</button>
				<SideBar ref=(sidebar => this.sidebar = sidebar)>
					<div>content</div>
					<div>more content</div>
				</SideBar>
			</div>
		);
	}
}
```

### Available props:

```javascript
static propTypes = {
	// the width of the sidebar (px)
	width: PropTypes.number,

	// react children to be rendered inside the sidebar
	children: PropTypes.node,

	// defaults to false. If true, the sidebar will
	// not snap to open/closed when partially dragged
	allowPartial: PropTypes.bool,

	// will be added to the sidebar element for styling
	className: PropTypes.string,
}
```

### Available methods:

#### SideBar#open

opens the side bar.

#### SideBar#close

closes the side bar.

#### SideBar#toggle

toggle's the side bar between open/closed.


## Start Developing:

The only system dependancies for developing are NodeJS v4 or higher.

To build and run the demo project...

	npm install
	npm run serve:hot
	# server running on http://localhost:8000

The above will start webpack-dev-server. If you want to build to the file system just run `npm run build` which will build the demo project into `dist/`

To build the lib directory, i.e. the component ready for distribution...

	npm run build:lib
	# will build ./lib/SideBar.js

## License:
MIT License. See the LICENSE file.
