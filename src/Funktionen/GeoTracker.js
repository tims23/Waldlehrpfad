import React, {Component} from 'react';
import CookieFunktionen from './CookieFunktionen';
import RedirectPopup from '../Widgets/RedirectPopup/RedirectPopup';

export class GeoTracker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			timer: null,
			timeout: null,
			askForPermissions: false,
			latitude: undefined,
			longitude: undefined,
			referral: '',
			lastReferral: ''
		};

		this.options = {
			trackerOptions: {
				enableHighAccuracy: true,
				timeout: 50000
			},
			distance: 20,
			interval: 10 * 1000
		};

		this.desiredLocation = [
			{
				name: 'Station1',
				latitude: 50.993669,
				longitude: 8.0650535
			},
			{
				name: 'Station2',
				latitude: 50.9950048,
				longitude: 8.0634368
			},
			{
				name: 'Station3',
				latitude: 50.9955716,
				longitude: 8.0648047
			},
			{
				name: 'Zuhause',
				latitude: 50.9824735,
				longitude: 8.2496378
			}
		];

		this.checkGeoLocation = this.checkGeoLocation.bind(this);
		this.receivedPermissions = this.receivedPermissions.bind(this);
		this.permissionsGranted = this.permissionsGranted.bind(this);
		this.permissionsDeclined = this.permissionsDeclined.bind(this);
		this.trackingError = this.trackingError.bind(this);
		this.checkPermissions = this.checkPermissions.bind(this);
	}

	checkGeoLocation() {
		console.log('location tracked');

		navigator.geolocation.getCurrentPosition(
			(result) => {
				console.log(result.coords.latitude + '  ' + result.coords.longitude);
				this.setState({
					latitude: result.coords.latitude,
					longitude: result.coords.longitude
				});

				for (let index = 0; index < this.desiredLocation.length; index++) {
					const desiredLocation = this.desiredLocation[index];
					var distance = Math.sqrt(
						(result.coords.latitude * 111111 - desiredLocation.latitude * 111111) *
							(result.coords.latitude * 111111 - desiredLocation.latitude * 111111) +
							(Math.cos(result.coords.longitude) * 111111 -
								Math.cos(desiredLocation.longitude) * 111111) *
								(Math.cos(result.coords.longitude) * 111111 -
									Math.cos(desiredLocation.longitude) * 111111)
					);
					console.log(distance);
					if (distance <= this.options.distance && this.state.lastReferral !== desiredLocation.name) {
						this.setState({
							referral: desiredLocation.name,
							lastReferral: desiredLocation.name
						});
						setTimeout(() => {
							this.setState({
								referral: ''
							});
						}, 500);
					}
				}
			},
			this.trackingError,
			this.options.trackerOptions
		);
	}

	trackingError(error) {
		switch (error.code) {
			case error.PERMISSION_DENIED:
				console.log('tracking error: PERMISSION_DENIED');
				CookieFunktionen.setCookie('receivedGeoPermissions', false, 100);
				if (this.state.timer !== null) {
					clearInterval(this.state.timer);
				}
				this.setState({
					timer: null
				});
				break;
			case error.POSITION_UNAVAILABLE:
				console.log('tracking error: POSITION_UNAVAILABLE');

			case error.TIMEOUT:
				console.log('tracking error: TIMEOUT');

			default:
				if (this.state.timer !== null) {
					clearInterval(this.state.timer);
				}
				this.setState({
					timeout: setTimeout(() => {
						this.setState({
							timer: setInterval(() => {
								this.checkGeoLocation();
							}, typeof this.props.interval === 'number' && this.props.interval !== undefined && this.props.interval !== null ? this.props.interval : this.options.interval),
							askForPermissions: false
						});
					}, 1000 * 60)
				});
				break;
		}
	}

	permissionsGranted() {
		this.receivedPermissions(true);
	}

	permissionsDeclined() {
		this.receivedPermissions(false);
	}

	receivedPermissions(result) {
		console.log('receivedPermissions');

		if (result) {
			CookieFunktionen.setCookie('receivedGeoPermissions', true, 100);
			this.setState({
				timer: setInterval(() => {
					this.checkGeoLocation();
				}, typeof this.props.interval === 'number' && this.props.interval !== undefined && this.props.interval !== null ? this.props.interval : this.options.interval),
				askForPermissions: false
			});
			this.checkGeoLocation();
		} else {
			CookieFunktionen.setCookie('receivedGeoPermissions', false, 100);
		}
	}

	checkPermissions() {
		console.log('checking permissions');

		if (CookieFunktionen.isTrue('receivedGeoPermissions')) {
			this.setState({
				timer: setInterval(() => {
					this.checkGeoLocation();
				}, typeof this.props.interval === 'number' && this.props.interval !== undefined && this.props.interval !== null ? this.props.interval : this.options.interval)
			});
		} else {
			if (CookieFunktionen.getCookie('receivedGeoPermissions') !== false) {
				this.setState({
					askForPermissions: true
				});
			}
		}
	}

	UNSAFE_componentWillMount() {
		console.log('comp will mount');

		if (navigator.geolocation) {
			console.log('navigator geolocation ');

			navigator.permissions.query({name: 'geolocation'}).then((result) => {
				if (result.state === 'granted') {
					this.checkPermissions();
				} else if (result.state === 'prompt') {
					this.checkPermissions();
				} else {
					this.setState({
						askForPermissions: true
					});
				}
			});
		}
	}

	componentWillUnmount() {
		if (this.state.timer !== null) {
			clearInterval(this.state.timer);
		}
		this.setState({
			timer: null
		});
	}

	render() {
		const askForPermissions = (
			<div>
				<p>Können wir deinen Standort verwenden?</p>
				<button onClick={this.permissionsGranted}>Ja</button>
				<button onClick={this.permissionsDeclined}>Nein</button>
			</div>
		);

		return (
			<div>
				<RedirectPopup referral={this.state.referral} />
				{this.state.askForPermissions ? askForPermissions : null}
				{this.state.latitude !== undefined ? <p>latitude: {this.state.latitude}</p> : null}
				{this.state.longitude !== undefined ? <p>longitude: {this.state.longitude}</p> : null}
			</div>
		);
	}
}

export default GeoTracker;
