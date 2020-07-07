import React, {Component} from 'react';

export class AnimateInScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			timer: null,
			inview: false,
			timeOut: null
		};
		this.cancelTimer = this.cancelTimer.bind(this);
		this.handleInScreen = this.handleInScreen.bind(this);
	}

	cancelTimer() {
		if (this.state.timer !== null) {
			clearInterval(this.state.timer);
			this.setState({timer: null});
		}
		if (this.state.timeOut !== null) {
			clearTimeout(this.state.timeOut);
			this.setState({
				timeOut: null
			});
		}
	}

	handleInScreen() {
		if (isScrolledIntoView(this.div) && this.state.inview === false) {
			this.setState({
				timeOut: setTimeout(() => {
					this.cancelTimer();
					if (this.props.customFunction !== undefined) {
						this.props.customFunction(true);
					}
					this.setState({
						inview: true,
						timeOut: setTimeout(() => {
							this.setState({
								timer: setInterval(() => {
									this.handleInScreen();
								}, 10)
							});
						}, 5 * 1000)
					});
				}, this.props.delay !== undefined ? this.props.delay : 0)
			});
		} else if (!isScrolledIntoView(this.div) && this.state.inview === true) {
			if (this.props.customFunction !== undefined) {
				this.props.customFunction(false);
			}
			this.setState({inview: false});
		}
	}

	componentDidMount() {
		this.setState({
			timer: setInterval(() => {
				this.handleInScreen();
			}, 10)
		});
	}

	componentWillUnmount() {
		this.cancelTimer();
	}

	render() {
		return (
			<div
				className={this.state.inview ? this.props.className : ''}
				style={{opacity: this.state.inview ? '1' : '0'}}
				ref={(div) => {
					this.div = div;
				}}
			>
				{this.props.children}
			</div>
		);
	}
}

function isScrolledIntoView(element) {
	let elemTop = element.getBoundingClientRect().top;
	let elemBottom = element.getBoundingClientRect().bottom;

	//elemBottom >= 0 &&
	let isVisible = elemTop <= window.innerHeight;
	return isVisible;
}

export default AnimateInScreen;
