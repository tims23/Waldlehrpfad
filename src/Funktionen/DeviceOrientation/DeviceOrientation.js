import React, {Component} from 'react';
import './DeviceOrientation.scss';

export class DeviceOrientation extends Component {
	constructor(props) {
		super(props);

		this.timer = null;

		this.state = {
			orientation: true
		};
		this.cancelTimer = this.cancelTimer.bind(this);
		this.checkOrientation = this.checkOrientation.bind(this);
	}

	checkOrientation() {
		if (window.orientation !== undefined) {
			if (!window.matchMedia('(orientation: portrait)').matches) {
				this.setState({orientation: false});
			} else if (!this.state.orientation) {
				this.setState({orientation: true});
			}
		} else {
			this.cancelTimer();
		}
	}

	cancelTimer() {
		if (this.timer !== null) {
			clearInterval(this.timer);
			this.timer = null;
		}
	}

	componentWillMount() {
		this.timer = setInterval(() => {
			this.checkOrientation();
		}, 100);
	}

	render() {
		if (!this.state.orientation) {
			return (
				<div className="DeviceOrientation Component">
					<div className="DeviceOrientation Error">
						<p>Drehe das Gerät senkrecht</p>
					</div>
				</div>
			);
		} else {
			return this.props.children;
		}
	}
}

export default DeviceOrientation;
