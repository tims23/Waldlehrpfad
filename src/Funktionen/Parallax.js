import React, {Component} from 'react';

export class Parallax extends Component {
	constructor(props) {
		super(props);

		this.velocity = this.props.velocity !== undefined && this.props.velocity !== null ? this.props.velocity : 0.3;

		this.state = {
			timer: null
		};
		this.handleInScreen = this.handleInScreen.bind(this);
		this.cancelTimer = this.cancelTimer.bind(this);
	}

	handleInScreen() {
		if (isScrolledIntoView(this.outer)) {
			this.inner.style.transform =
				'translateY(' + -this.outer.getBoundingClientRect().top * this.velocity + 'px) ';
		}
	}

	cancelTimer() {
		if (this.state.timer) {
			clearInterval(this.state.timer);
		}
		this.setState({timer: null});
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
			<div>
				<div className="Test over" />

				<div
					ref={(outer) => {
						this.outer = outer;
					}}
					style={{overflow: 'hidden'}}
				>
					<div
						ref={(inner) => {
							this.inner = inner;
						}}
					>
						{this.props.children}
					</div>
				</div>
				<div className="Test over" />
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

export default Parallax;
