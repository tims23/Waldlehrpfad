import React, {Component} from 'react';
import './Test.scss';
import NavigationWave from '../Widgets/NavigationWave';
import Footer from '../Widgets/Footer/Footer';
import Herbarium from '../Herbarium/Herbarium';
import Parallax from '../Funktionen/Parallax';
import AddToHome from '../Widgets/AddToHome/AddToHome';

export class Test extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			//fluid
			<div className="Test">
				<AddToHome />
			</div>
		);
	}
}

export default Test;
