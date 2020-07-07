import React, {Component} from 'react';

export class Station1 extends Component {
	static atributes = {
		location: {
			langitude: 0,
			latitude: 0,
			radius: 0
		},
		name: 'Station7',
		accesable: true
	};

	componentWillMount() {
		alert('Hallo I bims');
	}

	render() {
		return (
			<div>
				<p>Hallo I bims</p>
			</div>
		);
	}
}

export default Station1;
