import './Scanner.scss';
import React, {Component} from 'react';
import QrReader from 'react-qr-reader';
import Loader from '../Widgets/Loader.js';
import SwipeableLink from '../Funktionen/SwipeableLink';
import Authenticator from '../Funktionen/Authenticator';
import RedirectPopup from '../Widgets/RedirectPopup/RedirectPopup';
import NavigationWave from '../Widgets/NavigationWave';
import Footer from '../Widgets/Footer/Footer';
import StationSlide from '../StationSlide/StationSlide';

class Scanner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visibility: false,
			result: '',
			hasVideoDevice: true
		};
		this.handleScan = this.handleScan.bind(this);
		this.handleLoad = this.handleLoad.bind(this);
		this.hasVideoDevice = this.hasVideoDevice.bind(this);
	}

	handleScan(data) {
		if (data !== this.state.result) {
			this.setState({result: data});
		}
	}

	handleLoad(event) {
		this.setState({
			visibility: true
		});
		var ph = document.getElementsByClassName('placeholder');
		for (let index = 0; index < ph.length; index++) {
			const element = ph[index].classList;
			element.remove('load');
		}
		console.log('loaded');
	}

	hasVideoDevice() {
		navigator.mediaDevices
			.enumerateDevices()
			.then((devices) => {
				devices.forEach((device) => {
					if (device.kind === 'videoinput') {
						console.log('video');

						this.setState({
							hasVideoDevice: true
						});
					}
				});
			})
			.catch((err) => {
				console.log(err.name + ': ' + err.message);
			});
	}

	componentWillMount() {
		this.hasVideoDevice();
	}

	render() {
		const reader = (
			<QrReader
				facingMode={'environment'}
				showViewFinder={false}
				onLoad={this.handleLoad}
				delay={100}
				onScan={this.handleScan}
				style={{
					width: '100vh'
				}}
			/>
		);

		return (
			<Authenticator>
				<div className="Scanner Component">
					<SwipeableLink to="../FrontPage" direction="left">
						<div className="Scanner" style={visibility(this.state.visibility)}>
							<div className="Scanner overlay" />
							{this.state.hasVideoDevice ? reader : null}
						</div>
						{!this.state.hasVideoDevice ? (
							<div>
								<NavigationWave />
								<NoScanner reason="noVideoDeviceFound" />
								<div className="Scanner Footer">
									<Footer />
								</div>
							</div>
						) : null}

						<div
							className="Scanner"
							style={visibility(!this.state.visibility && this.state.hasVideoDevice)}
						>
							<div className="Scanner load placeholder" />
							<div className="Scanner load">
								<Loader loading={!this.state.visibility} color="#28262c" />
							</div>
							<div className="Scanner load placeholder" />
						</div>
						<RedirectPopup referral={this.state.result} />
					</SwipeableLink>
				</div>
			</Authenticator>
		);
	}
}

function visibility(vis) {
	const visibility = {
		display: vis ? 'initial' : 'none'
	};
	return visibility;
}

class NoScanner extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showError: this.props.reason !== undefined,
			timer: null,
			currentStation: 1
		};

		this.handleError = this.handleError.bind(this);
		this.cancelTimer = this.cancelTimer.bind(this);
	}

	cancelTimer() {
		if (this.state.timer !== null) {
			clearInterval(this.state.timer);
		}
		this.setState({
			timer: null
		});
	}

	handleError() {
		if (this.state.timer === null) {
			this.setState({
				timer: setInterval(() => {
					this.setState({
						showError: false
					});
					this.cancelTimer();
				}, 3 * 1000)
			});
		}
		switch (this.props.reason) {
			case 'noVideoDeviceFound':
				return (
					<div className="Scanner Error noVideoDevice">
						<p>Es scheint so als hätte dein Gerät keine Kamera!</p>
					</div>
				);

			default:
				return (
					<div className="Scanner Error undefined">
						<p>Ein unerwarteter Fehler ist aufgetreten!</p>
					</div>
				);
		}
	}

	componentWillUnmount() {
		this.cancelTimer();
	}

	render() {
		return <div>{this.state.showError ? this.handleError() : <StationSlide />}</div>;
	}
}

export default Scanner;
