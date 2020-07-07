import React, {Component} from 'react';
import './WelcomePopup.scss';
import {Swipeable} from 'react-swipeable';
import Img from 'react-image';
import CookieFunktionen from '../../Funktionen/CookieFunktionen.js';
import Loader from '../Loader.js';

class WelcomePopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMobile: true,
			open: true,
			site: 0
		};
		this.handleClose = this.handleClose.bind(this);
		this.handleDoneAction = this.handleDoneAction.bind(this);
		this.getSite = this.getSite.bind(this);
	}

	componentWillMount() {
		this.setState({
			isMobile: window.matchMedia('only screen and (max-width: 1100px)').matches
		});
	}

	handleClose() {
		this.setState({
			open: false
		});
	}

	handleDoneAction() {
		this.setState({
			site: this.state.site + 1
		});
	}

	getSite() {
		const swipingChallenge = (
			<div className="WelcomePopup swipingChallenge">
				<h2 className="WelcomePopup swipingChallenge">Swiping-Challenge</h2>
				<p className="WelcomePopup swipingChallenge">
					An manchen Stellen auf der Seite kannt du einfach in eine Richtung wischen um eine Aktion
					auszuführen
				</p>
				<Swipeable className="WelcomePopup swipingChallenge swipingField" onSwipedUp={this.handleDoneAction}>
					<div className="WelcomePopup swipingChallenge scroller">
						<h4 className="WelcomePopup swipingChallenge arrow" id="arrow1">
							&#709;
						</h4>
						<h4 className="WelcomePopup swipingChallenge arrow">&#709;</h4>
						<h4 className="WelcomePopup swipingChallenge arrow" id="arrow3">
							&#709;
						</h4>
					</div>
				</Swipeable>
			</div>
		);

		const swipingCongrats = (
			<div className="WelcomePopup swipingCongrats">
				<h2 className="WelcomePopup swipingCongrats">Geschafft!</h2>
				<p className="WelcomePopup swipingCongrats">
					Diese Funktion gibt es mehrmals. So kannst du zum Beispiel wenn du nach links wischst auf den
					QR-Scanner zugreifen. Probier es nach der Einführung einfach aus.
				</p>
				<button className="WelcomePopup next" onClick={this.handleDoneAction}>
					<p className="WelcomePopup">Weiter</p>
				</button>
			</div>
		);

		const downloadable = (
			<div className="WelcomePopup downloadable">
				<h2 className="WelcomePopup downloadable">Diese Seite ist installierbar</h2>
				<p className="WelcomePopup downloadable">
					Wahrscheinlich ist es für dich sinnvoll die Seite nicht nur online verwenden zu können. Deshalb
					haben wir sie für die installierbar gemacht. Wenn du die Seite also jetzt wo du noch Internet hast
					installierst, kannst du gleich auf dem Pfad auch ohne lange Ladezeiten alle Informationen abrufen.
				</p>
				<div className="WelcomePopup downloadable spaceholder">
					<div className="WelcomePopup downloadable placeholder">
						<Img
							className="WelcomePopup downloadable"
							src={require('./installierbar.png')}
							alt="Hier sollte ein Bild sein"
							loader={<Loader loading={true} color="#f9f5ff" />}
						/>
					</div>
					<p className="WelcomePopup downloadable float">
						An manchen Geräten findest du dieses "+" in deiner Suchleiste. Solltest du die Seite
						installieren wollen kannst du es hier tun.
					</p>
				</div>
				<div className="WelcomePopup downloadable spaceholder">
					<div className="WelcomePopup downloadable placeholder">
						<Img
							className="WelcomePopup downloadable"
							src={require('./options.png')}
							alt="Hier sollte ein Bild sein"
							loader={<Loader loading={true} color="#f9f5ff" />}
						/>
					</div>
					<div className="WelcomePopup downloadable arrow-container">
						<p className="WelcomePopup downloadable float">&#8594;</p>
					</div>
					<div className="WelcomePopup downloadable placeholder">
						<Img
							className="WelcomePopup downloadable"
							src={require('./options2.png')}
							alt="Hier sollte ein Bild sein"
							loader={<Loader loading={true} color="#f9f5ff" />}
						/>
					</div>
					<p className="WelcomePopup downloadable">
						An anderen Geräten kannst du die Seite unter Optionen auf deinem Startbildschirm installieren.
						Du musst die App dann aber dann noch einmal von hier aus starten damit sie offline verfügbar
						ist.
					</p>
				</div>
				<button className="WelcomePopup next" onClick={this.handleDoneAction}>
					<p className="WelcomePopup">Weiter</p>
				</button>
			</div>
		);

		switch (this.state.site) {
			case 0:
				return swipingChallenge;

			case 1:
				return swipingCongrats;

			case 2:
				return downloadable;

			default:
				return null;
		}
	}

	render() {
		const style = {
			height: '100vh',
			width: '100vw',
			overflowY: 'hidden'
		};

		const content = (
			<div className="WelcomePopup content">
				<h1>Kurze Einführung</h1>
				<p>
					Diese Seite nutzt einige Funktionen um für dich eine bessere Benutzbarkeit zu erreichen.<br />
					Lassen uns dir also einen kurzen Überblick verschaffen.
				</p>
				{this.getSite()}
			</div>
		);

		if (CookieFunktionen.isTrue('hasAlreadyUsed') || !this.state.open || !this.state.isMobile) {
			return this.props.children;
		} else {
			return (
				<div style={style}>
					<div id="WelcomePopup" className="WelcomePopup Component">
						<button className="WelcomePopup close" onClick={this.handleClose} />
						{content}
					</div>
					{this.props.children}
				</div>
			);
		}
	}
}

export default WelcomePopup;
