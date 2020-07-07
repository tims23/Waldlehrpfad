import React from 'react';
import './FrontPage.scss';
import Seperator from '../Widgets/Seperator.js';
import WelcomePopup from '../Widgets/WelcomePopup/WelcomePopup';
import SwipeableLink from '../Funktionen/SwipeableLink';
import Footer from '../Widgets/Footer/Footer';
import NavigationWave from '../Widgets/NavigationWave';
import Quiz from '../Widgets/Quiz/Quiz';
import AnimateInScreen from '../Funktionen/AnimateInScreen';
import {Link} from 'react-router-dom';
import StationSlide from '../StationSlide/StationSlide';
import * as firebase from 'firebase';

/*Der Klimawandel und die mittlerweile immer mehr sichtbar werdenden Folgen, die er mit sich bringt
beschäftigt auch unsere Schule und ihre Schüler zunehmend. Die drastische Zunahme von Emmisonen und
die Beschleunigung des Klimawandels, sowie die damit einhergehnede Notwendigkeit zu handeln bedürfen 
klarerer Lösungsstrategien. Die Beste hiervon ist in unseren Augen Bildung. Natürlich ist es gut, dass
Bund und Länder Maßnahmenpakete beschließen, welche gerade hier ansetzen, doch die Umsetzung beginnt
im Kleinen. Jeder kann und sollte mithelfen um dieses globale Problem anzugehen. Doch wenn die Menschen
nicht wissen wo das Problem liegt oder, dass es überhaupt existiert kann eine Lösung nicht funktionieren.
Gerade hier setzt Bildung an. Klimawandel ist nicht irgendein kleines Problemchen, sondern vielmehr
die beherrschende Gemeinscaftsaufgabe der kommenden Jahrzehnte. Unser Waldlehrpfad soll gerade das zeigen.
Durch sein ehemaliges bestehen als Kloster hat Stift Keppel das Glück, hier, an der Talsperre, einen Teil 
des Waldes zu besitzen. Diesen haben wir über mehrere Monate für Sie analysiert und präsentieren Ihnen hier
nun unsere Ergebnisse. Von Borkenkäfern bis zum Absterben der Fichten können Sie hier einige Effekte, die
der Klimawandel mitsich bringt, kennenlernen. Hier haben Sie die Möglichkeit Klimawandel einmal direkt zu
sehen und zu erleben. */

class FrontPage extends React.Component {
	constructor(props) {
		super(props);

		this.top = React.createRef();
		this.state = {
			title: 'init'
		};
	}

	componentDidMount() {
		const titleRef = firebase.database().ref('/roor');
		titleRef.
		console.log(titleRef);

		titleRef.on('value', (snapshot) => {
			this.setState({
				title: snapshot.val()
			});
		});
	}

	render() {
		return (
			<WelcomePopup>
				<div ref={this.top} id="section2" className="FrontPage Component">
					<SwipeableLink to="../Scanner" direction="right" auth deviceType="mobile">
						<NavigationWave />
						<h1>{this.state.title}</h1>
						<AnimateInScreen className="flowInLeft" delay={200}>
							<Artikel
								titel="Worum geht es in unserem Projekt?"
								inhalt="
								Die Bekämpfung des Klimawandels, die Sicherung und der Erhalt unserer Umwelt sind die
								mitunter größten Aufgaben unserer Zeit. Die Relevanz dieser Aufgaben ist unermesslich,
								zumal die Zukunft unserer Erde und die damit verbundene Biodiversität davon abhängt.
								Schon jetzt zeigen sich die ersten Folgen von der jahrelangen Missachtung dieses Problems.
								Unser Jahrhundert ist geprägt von dem größten Artensterben und Insektensterben seit den Dinosauriern,
								die letzten Jahre waren die Heißesten seit Beginn der Aufzeichnungen und der Borkenkäferbefall
								erreichte ein noch nie dagewesenes Ausmaß. Dabei wird Untätigkeit noch viele weitere
								Probleme hervorbringen. Bei anhaltender Klimaverschmutzung wird Prognosen zufolge bis 2100
								mit einem mittleren globalen Temperaturanstieg zwischen 1,8 C° und 4,0 C° mit Schwankungsbreiten
								von 1,1 C° bis 6,4 C° gerechnet [4]. So hat der Klimawandel das Potenzial uns jahrzehntelange
								Fortschritte und einen großen Teil unseres heutigen Wohlstandes wieder zu nehmen.
								Dabei überschreitet der er nationale Grenzen und bedroht neben Deutschland alle Teile
								dieser Welt. Des Weiteren ist er ein globales Problem und fordert interanationales, gemeinschaftliches
								Entgegenwirken. Natürlich sind auch Staaten und Regierungen aufgerufen Maßnahmen zu ergreifen,
								um weitgreifende Veränderungen im großen Stil herbeiführen zu können. Aber heißt das, dass 
								wir als Einzelpersonen nicht auch mithelfen können und sollten? 
							"
							/>
						</AnimateInScreen>
						<svg
							style={{
								marginBottom: '-10px'
							}}
							viewBox="0 0 311.75 17.08"
						>
							<defs />
							<polygon class="cls-4" points="311.75 16.98 0 17.08 0 7.69 311.71 0 311.75 16.98" />
						</svg>
						<div className="dark">
							<AnimateInScreen className="flowInRight" delay={200}>
								<StationSlide />
								<div style={{clear: 'both'}} />
							</AnimateInScreen>
						</div>
						<svg
							style={{
								marginTop: '-40px'
							}}
							viewBox="0 0 311.75 17.08"
						>
							<defs />
							<polygon
								style={{fill: '#f9f5ff'}}
								class="cls-4"
								points="311.75 16.98 0 17.08 0 7.69 311.71 0 311.75 16.98"
							/>
						</svg>

						<AnimateInScreen className="flowInLeft" delay={200}>
							<Artikel
								titel="Unsere Ziele"
								inhalt="
								Unsere Schule ist der Meinung, dass jeder einen Teil leisten kann. Jeder
								einzelne kann sich kleine Ziele setzen und dem Klimawandel entgegenwirken. Deshalb
								haben wir uns dazu entschieden Nachhaltigkeit in umfassender Weise in unsere Schulentwicklung
								zu integrieren. Eines der Projekte dieser Agenda ist der Waldlehrpfad, welchen wir auf
								dem stiftischen Waldbesitz am nordwestlichen Ufer der Breitenbachtalsperre bis 2021
								etablieren wollen. Wir wollen unsere Mitmenschen für den Klimawandel, seine Folgen und
								für zukünftige Gegenmaßnahmen sensibilisieren. Jeder sollte mit seinen Sinnen erfahren,
								wie Menschen Wälder sinnvoll gestalten, naturnah erhalten und gleichzeitig nutzen können.
								Da im Stiftswald, unter anderem durch seine Nähe zur Breitbachtalsperre und die damit 
								verbundene Notwendigkeit besonderer Umweltverträglichkeit, schon seit Jahren andere Lösungen gesucht
								werden, bietet dieser eine gute Möglichkeit hierzu.  
							"
							/>
						</AnimateInScreen>
						<HerbariumArtikel />

						<AnimateInScreen className="flowInLeft" delay={200}>
							<Artikel
								titel="Unsere Umsetzung"
								inhalt="
								Beginnend mit einer umfassenden Bestandsaufnahme des Waldes unter Zuhilfenahme
								des stiftseigenen Materials sollen mehrere Stationen zu einzelnen Unterthemen,
								wie zum Beispiel dem Borkenkäfer, von Schüler*innen der elften Klasse im Rahmen
								ihrer Facharbeiten und anderen Projekten in eigener Recherche erarbeitet werden.
								Diese sollen unserem Zeitalter gerecht werden und durch eine digitale Umsetzung
								so interaktiv wie möglich gestaltet werden, um vertiefende Einblick in die
								Themen zu gewährleisten. Die Gesamtlänge des Pfades wird dabei ca. 5,5 km
								betragen und ungefähr sieben Stationen umfassen, wobei einige Zuwege verbessert
								und entsprechend aufbereitet werden müssen.
							"
							/>
						</AnimateInScreen>

						<AnimateInScreen className="flowInLeft" delay={200}>
							<Quiz />
						</AnimateInScreen>
						<Footer href={this.top} />
					</SwipeableLink>
				</div>
			</WelcomePopup>
		);
	}
}

class HerbariumArtikel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inview: false
		};
	}

	render() {
		return (
			<div className="FrontPage HerbariumArtikel Funktion">
				<h1>Herbarium</h1>
				<AnimateInScreen
					customFunction={(inView) => {
						this.setState({inview: inView});
					}}
				>
					<div className="FrontPage HerbariumArtikel outer">
						<div className="FrontPage HerbariumArtikel contend">
							<div className={'FrontPage HerbariumArtikel first'.concat(this.state.inview ? ' in' : '')}>
								<div className="FrontPage HerbariumArtikel overlay" />
							</div>
							<div className={'FrontPage HerbariumArtikel second'.concat(this.state.inview ? ' in' : '')}>
								<div className="FrontPage HerbariumArtikel overlay" />
							</div>
							<div className={'FrontPage HerbariumArtikel last'.concat(this.state.inview ? ' in' : '')}>
								<img src={require('../Herbarium/Images/birke.png')} />

								<div className="FrontPage HerbariumArtikel overlay" />
							</div>
						</div>
						<div className="FrontPage HerbariumArtikel vl" />
						<div className="FrontPage HerbariumArtikel referral">
							<button>
								<Link to="Herbarium">Zum Herbarium</Link>
							</button>
						</div>
						<div style={{clear: 'both'}} />
					</div>
				</AnimateInScreen>
			</div>
		);
	}
}

class Artikel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showButton: false,
			wrapped: true
		};
		this.switchWrap = this.switchWrap.bind(this);
	}

	switchWrap() {
		this.wrapper.classList.toggle('wrapped');
		this.button.classList.toggle('wrapped');
		if (this.wrapper.classList.contains('wrapped')) {
			this.wrapper.scrollIntoView({behavior: 'auto'});
			this.setState({wrapped: true});
		} else {
			this.setState({wrapped: false});
		}
	}

	componentDidMount() {
		if (this.pElement.offsetHeight > 500) {
			this.setState({showButton: true});
		}
	}

	render() {
		const contend = (
			<div
				className="FrontPage Artikel Inhalt wrapper wrapped"
				ref={(wrapper) => {
					this.wrapper = wrapper;
				}}
			>
				<p
					className="FrontPage Artikel Inhalt"
					ref={(pElement) => {
						this.pElement = pElement;
					}}
				>
					{this.props.inhalt}
				</p>
			</div>
		);

		return (
			<div className={'FrontPage Artikel Funktion'}>
				<h1 className="FrontPage Artikel Titel">{this.props.titel}</h1>
				<Seperator className="FrontPage Artikel Seperator" color="black" />
				{contend}
				{this.state.showButton ? (
					<button
						className="FrontPage Artikel switch wrapped"
						onClick={this.switchWrap}
						ref={(button) => {
							this.button = button;
						}}
					>
						{this.state.wrapped ? 'Mehr anzeigen' : 'Weniger anzeigen'}
					</button>
				) : null}
			</div>
		);
	}
}

export default FrontPage;
