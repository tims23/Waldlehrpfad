import React, {Component} from 'react';
import './StationSlide.scss';

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
						currentStation={this.state.currentStation}
						handleClick={this.state.currentStation === 2 ? this.handleLastStation : () => {}}
					/>
					<Station
						stationName={2}
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
				onClick={this.props.handleClick}
			>
				<div className={this.state.classList.general + this.state.classList.visible + ' contend'}>
					<p>Station {this.props.stationName}</p>
				</div>
				<div className={this.state.classList.general + this.state.classList.visible + ' overlay'} />
			</div>
		);
	}
}
