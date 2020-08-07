import React, {Component} from 'react';
import './AddToHome.scss';
import CookieFunktionen from '../../Funktionen/CookieFunktionen.js';
import Authenticator from '../../Funktionen/Authenticator';

export class AddToHome extends Component {
	constructor(props) {
		super(props);

		this.addToHome = React.createRef();
	}

	render() {
		if (!CookieFunktionen.isTrue('hasAlreadyUsed') && Authenticator.isMobile()) {
			return (
				<div className="AddToHome" ref={this.addToHome}>
					<h2>Diese Seite ist installierbar!</h2>
					<ol>
						<li>
							Klicke dieses&nbsp;
							<img
								src={require('./android.png')}
								alt=""
								style={{width: '20px', height: '20px', marginBottom: '-5px'}}
							/>
							&nbsp;oder dieses&nbsp;
							<img
								src={require('./ios.jpg')}
								alt=""
								style={{width: '20px', height: '20px', marginBottom: '-5px'}}
							/>
							&nbsp;Symbol
						</li>
						<li>Klicke auf "Zum Home-Bildschirm"</li>
						<li>Fertig! Die Seite ist nun auch offline verfügbar.</li>
					</ol>
					<button
						onClick={() => {
							this.addToHome.current.classList.add('out');
							CookieFunktionen.setCookie('hasAlreadyUsed', true, 100);
						}}
					>
						Ok
					</button>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default AddToHome;
