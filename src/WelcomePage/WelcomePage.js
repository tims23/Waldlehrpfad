import React from 'react';
import './WelcomePage.scss';
import Seperator from '../Widgets/Seperator';
import DelayLink from '../Funktionen/DelayLink';
import SwipeableLink from '../Funktionen/SwipeableLink';
import Loader from '../Widgets/Loader.js';

class WelcomePage extends React.Component {
	constructor(props) {
		super(props);
		this.swipedUpEventHandler = this.swipedUpEventHandler.bind(this);
		this.handlePageTransition = this.handlePageTransition.bind(this);
		this.state = {
			load: false
		};
	}

	swipedUpEventHandler() {
		var s = document.getElementsByClassName('site');
		for (let index = 0; index < s.length; index++) {
			const element = s[index].classList;
			element.add('scrolled');
		}
	}

	handlePageTransition() {
		this.setState({
			load: true
		});
	}

	render() {
		return (
			<div id="WelcomePage" className="WelcomePage Component" onScroll={this.swipedUpEventHandler}>
				<div className="WelcomePage site">
					<SwipeableLink
						className="WelcomePage"
						to="/FrontPage"
						direction="up"
						delay={1000}
						handleTimeoutStart={this.swipedUpEventHandler}
					>
						<div className="WelcomePage background">
							<div className="WelcomePage shader">
								<div className="WelcomePage spaceholder" />
								<div className="WelcomePage content">
									<p className="WelcomePage">STIFT KEPPEL</p>
									<Seperator color="white" />
									<h1 className="WelcomePage">Waldlehrpfad</h1>
								</div>
								<DelayLink
									id="WelcomePage scroller"
									handleTimeoutStart={this.swipedUpEventHandler}
									delay={1000}
									to="/FrontPage"
									handleTimeoutEnd={this.handlePageTransition}
								>
									<a>
										<h4 className="WelcomePage arrow" id="arrow1">
											&#709;
										</h4>
										<h4 className="WelcomePage arrow">&#709;</h4>
										<h4 className="WelcomePage arrow" id="arrow3">
											&#709;
										</h4>
									</a>
								</DelayLink>
							</div>
						</div>
					</SwipeableLink>
				</div>
				<div className="WelcomePage" style={visibility(this.state.load)}>
					<div className="WelcomePage load">
						<Loader loading={this.state.load} color="#28262c" />
					</div>
				</div>
			</div>
		);
	}
}

function visibility(vis) {
	const visibility = {
		display: vis ? 'initial' : 'none'
	};
	return visibility;
}

export default WelcomePage;
