import React, {Component} from 'react';
import './Footer.scss';

export class Footer extends Component {
	constructor(props) {
		super(props);

		this.scrollToTop = this.scrollToTop.bind(this);
	}

	scrollToTop() {
		this.props.href.current.scrollIntoView({behavior: 'smooth'});
	}

	render() {
		return (
			<footer id="Footer" className="Footer Component">
				<div className="Footer upper">
					<Nature />
				</div>
				<div className="Footer middle">
					<hr className="Footer" />
					<p>Kontakt</p>
					<p>Home</p>
					<p>Impressum</p>
					<p>Zur Schule</p>
					<div className="Footer clear" />
				</div>
				<div className="Footer under">
					<hr className="Footer" />
					<div className="Footer up" onClick={this.scrollToTop}>
						<p className="Footer">&uarr;</p>
					</div>
					<a href="https://www.stiftkeppel.de/">
						<img className="Footer" src={require('./logo.svg')} alt="Schullogo" />
					</a>

					<div className="Footer up" onClick={this.scrollToTop}>
						<p className="Footer">&uarr;</p>
					</div>
					<div className="Footer clear" />
				</div>
			</footer>
		);
	}
}

class Nature extends Component {
	constructor(props) {
		super(props);

		this.changeWord = this.changeWord.bind(this);
		this.animateLetterOut = this.animateLetterOut.bind(this);
		this.animateLetterIn = this.animateLetterIn.bind(this);

		const words = ['schön', 'erholend', 'erhaltenswert', 'spannend', 'aufregend'];
		const displayWordContent = [];
		for (let index = 0; index < words[0].length; index++) {
			displayWordContent.push(words[0][index]);
		}

		this.state = {
			words: words,
			displayWordIndex: words.length - 1,
			displayWordContent: displayWordContent,
			displayWordClassList: [],
			colors: ['green', 'magenta', 'baybyblue', 'sage', 'belize', 'pomegranate'],
			displayWordColor: [],
			interval: null
		};
	}

	changeWord() {
		var currentWord = this.state.words[this.state.displayWordIndex];
		var nextWord = this.state.words[
			this.state.displayWordIndex === this.state.words.length - 1 ? 0 : this.state.displayWordIndex + 1
		];
		var displayWordContent = this.state.displayWordContent;
		var displayWordClassList = this.state.displayWordClassList;
		for (let index = 0; index < Math.max(currentWord.length, nextWord.length); index++) {
			setTimeout(() => {
				this.animateLetterOut(displayWordClassList, index);
			}, index * 80);

			setTimeout(() => {
				this.animateLetterIn(displayWordContent, nextWord, displayWordClassList, index);
			}, 340 + index * 80);
		}
		this.setState({
			displayWordIndex:
				this.state.displayWordIndex === this.state.words.length - 1 ? 0 : this.state.displayWordIndex + 1
		});
	}

	animateLetterOut(displayWord, index) {
		displayWord[index] = 'out';

		this.setState({
			displayWordClassList: displayWord
		});
	}

	animateLetterIn(displayWord, nextWord, displayWordClassList, index) {
		var displayWordColor = this.state.displayWordColor;
		displayWordColor[index] = this.state.colors[this.state.displayWordIndex];

		displayWordClassList[index] = 'in';

		displayWord[index] = nextWord.length > index ? nextWord[index] : undefined;
		this.setState({
			displayWordContent: displayWord,
			displayWordClassList: displayWordClassList,
			displayWordColor: displayWordColor
		});
	}

	componentWillMount() {
		this.changeWord();
		this.setState({
			interval: setInterval(this.changeWord, 4000)
		});
	}

	componentWillUnmount() {
		clearInterval(this.state.interval);
		this.setState({
			interval: null
		});
	}

	render() {
		const letters = [];
		for (const [index] of this.state.displayWordContent.entries()) {
			const className =
				'Footer Nature letter ' +
				this.state.displayWordClassList[index] +
				' ' +
				this.state.displayWordColor[index];
			letters.push(<span className={className}>{this.state.displayWordContent[index]}</span>);
		}
		return (
			<div class="Footer Nature text">
				<div style={{clear: 'both'}} />
				<p className="Footer Nature">
					Natur ist <span>{letters}</span>
				</p>
			</div>
		);
	}
}

export default Footer;
