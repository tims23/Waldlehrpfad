import React from 'react';
import './App.scss';

import {BrowserRouter as Router, Route, Switch, useParams} from 'react-router-dom';

import WelcomePage from './WelcomePage/WelcomePage.js';
import FrontPage from './FrontPage/FrontPage.js';
import Scanner from './Scanner/Scanner';
import Test from './Test/Test';
import GeoTracker from './Funktionen/GeoTracker';
import Navigation from './Widgets/Navigation/Navigation.js';
import DeviceOrientation from './Funktionen/DeviceOrientation/DeviceOrientation';
import Herbarium from './Herbarium/Herbarium';
import AddToHome from './Widgets/AddToHome/AddToHome';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<AddToHome />
				<DeviceOrientation>
					<Router>
						<Navigation />
						<Switch>
							<Route exact path="/FrontPage">
								<FrontPage />
							</Route>
							<Route exact path="/WelcomePage">
								<WelcomePage />
							</Route>
							<Route exact path="/Scanner">
								<Scanner />
							</Route>
							<Route path="/Herbarium">
								<Herbarium />
							</Route>
							<Route path="/Test">
								<Test />
							</Route>
							<Route exact path="/Station1">
								<p>Diese Stations ist zurzeit noch in Arbeit</p>
							</Route>
							<Route exact path="/Station2">
								<p>Diese Stations ist zurzeit noch in Arbeit</p>
							</Route>
							<Route exact path="/">
								<WelcomePage />
							</Route>
						</Switch>
					</Router>
				</DeviceOrientation>
			</div>
		);
	}
}

export default App;
