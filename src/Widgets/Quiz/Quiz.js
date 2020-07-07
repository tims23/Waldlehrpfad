import React, {Component} from 'react';
import './Quiz.scss';

export class Quiz extends Component {
	constructor(props) {
		super(props);

		this.onSubbmit = this.onSubbmit.bind(this);
		this.cancelTimer = this.cancelTimer.bind(this);

		this.allQuestions = [
			{
				question: 'Welches Klima bevorzugen Borkenkäfer?',
				options: [
					{
						name: 'Warm und trocken',
						correct: true
					},
					{
						name: 'Nass und kalt',
						correct: false
					},
					{
						name: 'warm und nass',
						correct: false
					}
				]
			},

			{
				question: 'Woran erkennt man einen Borkenkäferbefall?',
				options: [
					{
						name: 'Bohrmehl',
						correct: true
					},
					{
						name: 'Verfärbung der Blätter',
						correct: false
					},
					{
						name: 'Käfer auf der Rinde',
						correct: false
					}
				]
			},

			{
				question: 'Wordurch schützen sich die Bäume?',
				options: [
					{
						name: 'ihr Hartz',
						correct: true
					},
					{
						name: 'Tannenzapfen',
						correct: false
					},
					{
						name: 'Stammdicke',
						correct: false
					}
				]
			},

			{
				question: 'Was ist NICHT der Name eines Borkenkäfers?',
				options: [
					{
						name: 'Kieferstecher',
						correct: true
					},
					{
						name: 'Kupferstecher',
						correct: false
					},
					{
						name: 'Buchdrucker',
						correct: false
					}
				]
			}
		];

		this.fragen = [];

		this.state = {
			answerCount: 0,
			currentQuestion: 1,
			progress: 0,
			timer: null,
			timeOut: null
		};
	}

	cancelTimer() {
		if (this.state.timer !== null) {
			clearInterval(this.state.timer);
		}
		if (this.state.timeOut !== null) {
			clearTimeout(this.state.timeOut);
		}
		this.setState({
			timeOut: null,
			timer: null,
			progress: (this.state.currentQuestion - 1) / this.fragen.length * 100
		});
	}

	onSubbmit(value) {
		if (value) {
			this.setState({
				answerCount: this.state.answerCount + 1
			});
		}

		this.setState({
			currentQuestion: this.state.currentQuestion + 1,
			timer: setInterval(() => {
				this.setState({
					progress: this.state.progress + 1 / this.fragen.length * 100 / 50
				});
			}, 10),
			timeOut: setTimeout(() => {
				this.cancelTimer();
			}, 500)
		});
	}

	componentWillUnmount() {
		this.cancelTimer();
	}

	componentWillMount() {
		this.fragen = shuffleArray(this.allQuestions);
		if (this.fragen.length > 5) {
			this.fragen.length = 5;
		}
	}

	render() {
		const results = (
			<div>
				<p>
					Du hast {this.state.answerCount} {this.state.answerCount > 1 ? 'Fragen' : 'Frage'} von{' '}
					{this.fragen.length} {this.fragen.length > 1 ? 'Fragen' : 'Frage'} richtig beantwortet
				</p>
				<p>Möchtest du das Quiz wiederholen?</p>
				<button
					className="Quiz repeat"
					onClick={() => {
						this.fragen = shuffleArray(this.allQuestions);
						this.setState({
							currentQuestion: 1,
							answerCount: 0,
							timer: setInterval(() => {
								this.setState({
									progress: this.state.progress - 2
								});
							}, 10),
							timeOut: setTimeout(() => {
								this.cancelTimer();
							}, 500)
						});
					}}
				>
					&#8635;
				</button>
			</div>
		);

		return (
			<div className="Quiz Component">
				<h1 style={{textAlign: 'center'}}>Quiz</h1>
				<hr style={{height: '1px', width: '100%', backgroundColor: 'black', border: 'none'}} />

				{this.fragen.map((frage, index) => {
					if (index === this.state.currentQuestion - 1) {
						return <Frage question={frage.question} options={frage.options} onSubbmit={this.onSubbmit} />;
					}
					return null;
				})}
				{this.fragen.length <= this.state.currentQuestion - 1 ? results : null}

				<hr style={{height: '1px', width: '100%', backgroundColor: 'black', border: 'none'}} />
				<div className="Quiz progressBar">
					<div className="Quiz progressBar progress" style={{width: this.state.progress + '%'}} />
				</div>
			</div>
		);
	}
}

class Frage extends Component {
	constructor(props) {
		super(props);

		this.interval = 3000;

		this.questions = shuffleArray(this.props.options);

		this.state = {
			selectedOption: {initial: true},
			timer: null,
			submited: false
		};
		this.handleRadioClicked = this.handleRadioClicked.bind(this);
		this.handleSubbmit = this.handleSubbmit.bind(this);
		this.cancelTimer = this.cancelTimer.bind(this);
	}

	handleRadioClicked(question) {
		this.setState({
			selectedOption: question
		});
	}

	handleSubbmit(event) {
		event.preventDefault();
		if (this.state.selectedOption.initial !== true) {
			this.cancelTimer();
			this.setState({
				submited: true,
				timer: setTimeout(() => {
					const selectedOption = this.state.selectedOption.correct;
					this.props.onSubbmit(selectedOption);
				}, this.interval)
			});
		}
	}

	cancelTimer() {
		if (this.state.timer !== null) {
			clearTimeout(this.state.timer);
			this.setState({
				timer: null
			});
		}
	}

	componentWillUnmount() {
		this.cancelTimer();
		this.setState({
			selectedOption: {initial: true},
			timer: null,
			submited: false
		});
	}

	render() {
		const listQuestions = this.questions.map((question, index) => (
			<div className="Quiz Frage options" key={index}>
				<label className="Quiz Fragen" htmlFor={question.name}>
					{question.name}
				</label>
				<input
					className="Quiz Fragen"
					question={question}
					type="radio"
					value={question.name}
					name={question.name}
					checked={this.state.selectedOption.name === question.name}
					onChange={() => this.handleRadioClicked(question)}
				/>
			</div>
		));

		const form = (
			<form onSubmit={this.handleSubbmit}>
				{listQuestions}
				<input className="Quiz Frage submit" type="submit" value="Fertig" />
			</form>
		);

		var showResult = (
			<div>
				<div className={'Quiz Frage result ' + (this.state.selectedOption.correct ? 'right' : 'wrong')}>
					{this.state.selectedOption.correct ? <p>Richtig</p> : <p>Falsch</p>}
				</div>
				<p className="Quiz Frage result correctAnswer">
					Die Antwort lautet:{' '}
					{this.questions.map((question) => (question.correct ? <span>{question.name}</span> : null))}
				</p>
			</div>
		);

		return (
			<div>
				<div className="Quiz Frage questionContainer">
					<h1>{this.props.question}</h1>
				</div>
				<div class="Quiz Frage vl" />
				<div className="Quiz Frage answerContainer">{this.state.submited ? showResult : form}</div>
			</div>
		);
	}
}

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

export default Quiz;
