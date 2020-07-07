import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Swipeable} from 'react-swipeable/';
import Authenticator from './Authenticator';

export class SwipeableLink extends Component {
	constructor(props) {
		super(props);

		this.state = {
			timeout: null,
			redirect: false
		};
		this.handleSwipe = this.handleSwipe.bind(this);
		this.handleTimeoutEnd = this.handleTimeoutEnd.bind(this);
		this.handleTimeoutStart = this.handleTimeoutStart.bind(this);
		this.getDirectionComponent = this.getDirectionComponent.bind(this);
	}

	getDirectionComponent(direction) {
		switch (direction) {
			case 'up':
				return <Swipeable onSwipedUp={this.handleSwipe}>{this.props.children}</Swipeable>;

			case 'down':
				return <Swipeable onSwipedDown={this.handleSwipe}>{this.props.children}</Swipeable>;

			case 'left':
				return <Swipeable onSwipedLeft={this.handleSwipe}>{this.props.children}</Swipeable>;

			case 'right':
				return <Swipeable onSwipedRight={this.handleSwipe}>{this.props.children}</Swipeable>;

			default:
				return <Swipeable onSwiped={this.handleSwipe}>{this.props.children}</Swipeable>;
		}
	}

	componentWillMount() {
		this.comp = this.getDirectionComponent(this.props.direction);
	}

	handleSwipe() {
		if (this.state.timeout === null) {
			this.handleTimeoutStart();
			const delay = this.props.delay;
			this.setState({
				timeout: setTimeout(() => {
					this.handleTimeoutEnd();
				}, delay)
			});
		}
	}

	handleTimeoutStart() {
		if (this.props.handleTimeoutStart !== undefined && this.props.handleTimeoutStart !== null) {
			this.props.handleTimeoutStart();
		}
	}

	handleTimeoutEnd() {
		clearTimeout(this.state.timeout);
		this.setState({
			redirect: true,
			timer: null
		});
		if (this.props.handleTimeoutEnd !== undefined && this.props.handleTimeoutEnd !== null) {
			this.props.handleTimeoutEnd();
		}
	}

	render() {
		const comp = this.getDirectionComponent(this.props.direction);

		if (this.state.redirect) {
			return <Redirect to={this.props.to} />;
		} else if (this.props.auth !== undefined && this.props.auth !== null) {
			if (!Authenticator.auth(this.props)) {
				return this.props.children;
			} else {
				return comp;
			}
		} else {
			return comp;
		}
	}
}

export default SwipeableLink;
