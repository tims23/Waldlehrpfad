import React, {Component} from 'react';
import './RedirectPopup.scss';
import {Link} from 'react-router-dom';

export class RedirectPopup extends Component {
	constructor(props) {
		super(props);

		this.timeout = 1000 * 5;

		this.state = {
			referral: '',
			lastReferral: '',
			timer: null
		};

		this.handleClose = this.handleClose.bind(this);
	}

	handleClose() {
		this.setState({
			referral: '',
			timer: setTimeout(() => {
				this.setState({
					lastReferral: '',
					timer: null
				});
			}, this.timeout)
		});
	}

	componentDidUpdate() {
		const possibleSites = ['Station1', 'Station2', 'WelcomePage', 'FrontPage', 'Zuhause'];

		if (this.props.referral !== this.state.lastReferral && this.props.referral) {
			if (this.state.timer !== null) {
				clearTimeout(this.state.timer);
				this.setState({timer: null});
			}
			if (possibleSites.includes(this.props.referral)) {
				this.setState({
					referral: this.props.referral,
					lastReferral: this.props.referral
				});
			} else {
				this.setState({
					lastReferral: this.props.referral,
					timer: setTimeout(() => {
						this.setState({timer: null, lastReferral: ''});
					}, this.timeout)
				});
				alert('Die von die angeforderte Seite ist nicht Teil des Pfades!');
			}
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
			<div className="RedirectPopup" style={{display: this.state.referral !== '' ? 'initial' : 'none'}}>
				<div className="RedirectPopup popup">
					<Link to={'../'.concat(this.state.referral)}>
						<button className="RedirectPopup popup redirect">
							<p>{this.state.referral}</p>
						</button>
					</Link>
					<button className="RedirectPopup popup close" onClick={this.handleClose} />
				</div>
			</div>
		);
	}
}

export default RedirectPopup;
