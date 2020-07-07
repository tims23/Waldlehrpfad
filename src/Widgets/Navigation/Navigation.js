import React, {Component} from 'react';
import './Navigation.scss';
import {Link} from 'react-router-dom';
import CookieFunktionen from '../../Funktionen/CookieFunktionen';

export default class Navigation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			timer: null,
			lastStation:
				CookieFunktionen.getCookie('lastStation') !== '' ? CookieFunktionen.getCookie('lastStation') : '1'
		};

		this.toggleClicked = this.toggleClicked.bind(this);
	}

	toggleClicked() {
		if (this.state.timer != null) {
			clearTimeout(this.state.timer);
			this.setState({timer: null});
		}

		var elements = document.getElementsByClassName('Navigation');
		var clicked = false;
		for (let index = 0; index < elements.length; index++) {
			const element = elements[index];
			if (element.classList.contains('clicked')) {
				clicked = true;
				element.classList.remove('clicked');
				element.classList.add('unClicked');
			} else {
				element.classList.add('clicked');
				element.classList.remove('unClicked');
			}
		}
		if (!clicked) {
			this.setState({
				timer: setTimeout(() => {
					this.toggleClicked();
				}, 30 * 1000)
			});
		}
	}

	componentWillUnmount() {
		if (this.state.timer !== null) {
			clearTimeout(this.state.timer);
			this.setState({
				timer: null
			});
		}
	}

	render() {
		return (
			<div>
				<div className="Navigation navButton outer ">
					<div className="Navigation content">
						<Link to="./Scanner">
							<div className="Navigation icon first" />
						</Link>
						<Link to="./FrontPage">
							<div className="Navigation icon second" />
						</Link>
						<Link>
							<div className="Navigation icon last">
								<p>{this.state.lastStation}</p>
							</div>
						</Link>
					</div>
					<div className="Navigation navButton inner " onClick={this.toggleClicked}>
						<div className="Navigation navButton burger ">
							<span className="Navigation navButton burger upper " />
							<span className="Navigation navButton burger middle " />
							<span className="Navigation navButton burger under " />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
