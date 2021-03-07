import React, {Component} from 'react';
import './StationSlide.scss';
import baumBackground from "./baum.jpg";
import background from "./baum2.jpg";
import {Link} from 'react-router-dom';


export default class StationSlide extends Component {
	constructor(props) {
		super(props);

		//show error auf !== undefined
		this.state = {
			timer: null,
			timeout: null,
			currentStation: 1,
			transition: 1
		};

		this.cancelTimer = this.cancelTimer.bind(this);
		this.handleNextStation = this.handleNextStation.bind(this);
		this.handleLastStation = this.handleLastStation.bind(this);
	}

	cancelTimer() {
		if (this.state.timer !== null) {
			clearInterval(this.state.timer);
		}
		if (this.state.timeout !== null) {
			clearTimeout(this.state.timeout);
		}
		this.setState({
			timer: null,
			timeout: null,
			transition: 1
		});
	}

	handleNextStation() {
		this.setState({
			currentStation: this.state.currentStation + 1,
			transition: 2,
			timer: setInterval(() => {
				this.setState({
					transition: this.state.transition - 0.02
				});
			}, 10),
			timeout: setTimeout(() => {
				this.cancelTimer();
			}, 500)
		});
	}

	handleLastStation() {
		this.setState({
			currentStation: this.state.currentStation - 1,
			transition: 0,
			timer: setInterval(() => {
				this.setState({
					transition: this.state.transition + 0.02
				});
			}, 10),
			timeout: setTimeout(() => {
				this.cancelTimer();
			}, 500)
		});
	}

	componentWillUnmount() {
		this.cancelTimer();
	}

	render() {
		return (
			<div style={{maxWidth: '100%', overflow: 'hidden'}}>
				<div
					className="StationSlide div"
					style={{
						transform:
							'translateX(-' +
							(this.state.currentStation - this.state.transition) * 300 +
							'px) translateX(-' +
							(this.state.currentStation - this.state.transition) * 4 +
							'vw)  translateX(-50%) translateX(310px) translateX(4vw)'
					}}
				>
					<Station
						stationName={1}
						stationTitle="Rinde"
						condend="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
						currentStation={this.state.currentStation}
						handleClick={this.state.currentStation === 2 ? this.handleLastStation : () => {}}
						pic={baumBackground}
					/>
					<Station
						stationName={2}
						stationTitle="Borkenkäfer"
						condend="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
						currentStation={this.state.currentStation}
						handleClick={
							this.state.currentStation === 3 ? (
								this.handleLastStation
							) : this.state.currentStation === 1 ? (
								this.handleNextStation
							) : (
								() => {}
							)
						}
						pic={background}
					/>
				</div>
			</div>
		);
	}
}

export class Station extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			classList: {
				general: 'StationSlide Station ' + this.props.stationName + ' ',
				visible: ''
			}
		};
		this.checkVisibility = this.checkVisibility.bind(this);
	}

	checkVisibility() {
		var visible = '';
		if (this.props.stationName == this.props.currentStation) {
			visible = 'in';
		} else if (
			this.props.stationName == this.props.currentStation - 1 ||
			this.props.stationName == this.props.currentStation + 1
		) {
			visible = 'semiIn';
		}
		this.setState({
			classList: {general: this.state.classList.general, visible: visible}
		});
	}

	componentDidUpdate(props) {
		if (props !== this.props) {
			this.checkVisibility();
		}
	}

	componentWillMount() {
		this.checkVisibility();
	}

	render() {
		return (
			<div
				className={this.state.classList.general + this.state.classList.visible + ' div'}
				onClick={this.props.handleClick} style={{backgroundImage: `url('${this.props.pic}')`}}
			>
				<div className={this.state.classList.general + this.state.classList.visible + ' contend'}>
					<p>Station {this.props.stationName}</p>
				</div>
				<Link to={"/Station".concat(this.props.stationName)}>
				<div className={this.state.classList.general + this.state.classList.visible + ' overlay'} >
					<h1>Station {this.props.stationTitle}</h1>
					<p>{this.props.condend}</p>
				</div></Link>
			</div>
		);
	}
}
