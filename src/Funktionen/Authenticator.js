import React, {Component} from 'react';
import CookieFunktionen from './CookieFunktionen.js';
import {Redirect} from 'react-router-dom';

export class Authenticator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			render: true
		};
	}

	static isMobile() {
		return window.matchMedia('only screen and (max-width: 1100px)').matches;
	}

	static auth(inp) {
		var show = true;
		if (inp.cookie !== undefined && inp.cookie !== null) {
			if (!CookieFunktionen.isTrue(inp.cookie)) {
				show = false;
			}
		}
		if (inp.cookieValue !== undefined && inp.cookieValue !== null) {
			if (inp.cookie !== undefined && inp.cookie !== null) {
				if (CookieFunktionen.getCookie(inp.cookie) !== inp.cookieValue) {
					show = false;
				}
			}
		}
		if (inp.deviceType !== undefined && inp.deviceType !== null) {
			if (inp.deviceType === 'mobile') {
				if (!this.isMobile()) {
					show = false;
				}
			}
			if (inp.deviceType === 'desktop') {
				if (this.isMobile()) {
					show = false;
				}
			}
		}
		return show;
	}

	componentWillMount() {
		this.setState({
			render: Authenticator.auth(this.props)
		});
	}

	render() {
		console.log('Authenticator rendered');

		if (this.state.render) {
			return this.props.children;
		} else if (this.props.redirect !== undefined) {
			return <Redirect to="/" />;
		} else {
			return <div />;
		}
	}
}

export default Authenticator;
