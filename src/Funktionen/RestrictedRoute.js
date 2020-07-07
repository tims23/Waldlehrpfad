import React, {Component} from 'react';
import {Route} from 'react-router-dom';

export class RestrictedRoute extends Component {
	constructor(props) {
		super(props);

		this.state = {
			render: false
		};
	}

	componentWillMount() {
		this.setState({
			isMobile: window.matchMedia('only screen and (max-width: 1100px)').matches
		});
	}

	render() {
		if (this.props.deviceType !== undefined && this.props.deviceType !== null) {
			if (this.props.deviceType === 'mobile') {
				if (!this.state.isMobile) {
					this.setState({
						render: false
					});
				}
			}
			if (this.props.deviceType === 'desktop') {
				if (this.state.isMobile) {
					this.setState({
						render: false
					});
				}
			}
		}

		if (this.state.render) {
			return (
				<Route exact={this.props.exact} path={this.props.path}>
					{this.props.children}
				</Route>
			);
		} else {
			return null;
		}
	}
}

export default RestrictedRoute;
