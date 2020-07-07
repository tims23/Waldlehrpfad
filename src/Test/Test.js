import React, {Component} from 'react';
import './Test.scss';
import NavigationWave from '../Widgets/NavigationWave';
import Footer from '../Widgets/Footer/Footer';
import Herbarium from '../Herbarium/Herbarium';
import Parallax from '../Funktionen/Parallax';

export class Test extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			//fluid
			<div className="Test">
				<Parallax>
					<img src={require('./Keppel.jpg')} />
				</Parallax>
			</div>
		);
	}
}

export default Test;
