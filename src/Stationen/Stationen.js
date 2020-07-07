import React, {Component} from 'react';
import CookieFunktionen from '../Funktionen/CookieFunktionen';
import Station1 from './Station1.js/Station1';
import {Route} from 'react-router-dom';

export class Stationen extends Component {
	static stations = [Station1.atributes];

	static routes() {
		var output = <div />;
		for (let index = 0; index < Stationen.stations.length; index++) {
			const station = Stationen.stations[index].name;
			output = <Route to={station} />;
		}
		return output;
	}
}

export default Stationen;
