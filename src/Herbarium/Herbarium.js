import React, {Component, useState} from 'react';
import './Herbarium.scss';
import {Route, useParams, Redirect, Link} from 'react-router-dom';
import AnimateInScreen from '../Funktionen/AnimateInScreen';

const items = [
	{
		name: 'Birke',
		image: require('./Images/' + "Birke.png"),
		information: [
			['Höchstalter', '50 Jahre'],
			["Lateinischer Name", "Betula"],
			["Arten","ca. 50"], 
			["Verbreitungsgebiet", "Europa, Asien, Nordamerika"],
			["Blütezeit", "März-Mai"],
			["Höhe", "20-30 Meter"]
		]
	},
	{
		name: "Buche",
		image: require('./Images/' + "Buche.png"),
		information: [
			['Höchstalter', '300 Jahre'],
			["Lateinischer Name", "Fagus sylvatica"],
			["Arten","ca. 250"], 
			["Verbreitungsgebiet", "Europa"],
			["Blütezeit", "April-Mai"],
			["Höhe", "30-40 Meter"]
		]
	}
];

export class Herbarium extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="Herbarium Component">
				<p>Das ist das Herbarium</p>
				{items.map((item) => {
					return (
						<AnimateInScreen className="flowInLeft">
							<Element image={item.image} name={item.name} />
						</AnimateInScreen>
					);
				})}
				<Route path="/Herbarium/:id" children={<DetailView />} />
			</div>
		);
	}
}

export class Element extends React.Component {
	render() {
		return (
			<div className="Herbarium Element Funktion">
				<div className="Herbarium Element Container">
					<div className="Herbarium Element inner">
						<div class="Herbarium Element front">
							<img src={this.props.image} />
						</div>
						<div class="Herbarium Element back">
							<img src={this.props.image} />
							<div className="Herbarium Element overlay">
								<h1>{this.props.name}</h1>
								<hr style={{backgroundColor: 'white'}} />
								<Link to={'/Herbarium/'.concat(this.props.name)}>
									<button>Steckbrief</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function DetailView() {
	let {id} = useParams();
	let element;
	items.forEach((item) => {
		if (item.name === id) {
			element = item;
		}
	});
	return (
		<div className="Herbarium DetailView Funktion">
			<Link to={'/Herbarium'}>
				<div
					style={{
						position: 'fixed',
						height: '100vh',
						width: '100vw',
						top: '0',
						left: '0',
						cursor: 'default'
					}}
				/>
			</Link>
			<Link to={'/Herbarium'}>
				<button>Zurück</button>
			</Link>
			<div className="Herbarium DetailView contend">
				<h1>{element.name}</h1>
				<hr style={{backgroundColor: 'black'}} />
				{element.information.map((information) => {
					return (
						<div>
							<p><span style={{fontWeight: "bold"}}>{information[0]}:</span> {information[1]}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Herbarium;
