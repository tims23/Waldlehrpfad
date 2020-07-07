import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

export class DelayLink extends Component {
	constructor(props) {
		super(props);

		this.state = {
			timeout: null,
			redirect: false
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleTimeoutEnd = this.handleTimeoutEnd.bind(this);
		this.handleTimeoutStart = this.handleTimeoutStart.bind(this);
	}

	handleClick() {
		this.handleTimeoutStart();
		const delay = this.props.delay;
		this.setState({
			timeout: setTimeout(() => {
				this.handleTimeoutEnd();
			}, delay)
		});
	}

	handleTimeoutStart() {
		if (this.props.handleTimeoutStart !== undefined && this.props.handleTimeoutStart !== null) {
			this.props.handleTimeoutStart();
		}
	}

	handleTimeoutEnd() {
		clearTimeout(this.state.timeout);
		if (this.props.handleTimeoutEnd !== undefined && this.props.handleTimeoutEnd !== null) {
			this.props.handleTimeoutEnd();
		}
		this.setState({redirect: true});
	}

	render() {
		const style = {
			cursor: 'pointer'
		};
		if (this.state.redirect) {
			this.setState({
				timeout: null,
				redirect: false
			});
			return <Redirect to={this.props.to} />;
		} else {
			return (
				<div href={this.props.to} onClick={this.handleClick} style={style}>
					{this.props.children}
				</div>
			);
		}
	}
}

export default DelayLink;
