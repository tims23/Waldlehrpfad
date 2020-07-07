import React, {Component} from 'react';
import {BeatLoader, BounceLoader, BarLoader, ClipLoader, FadeLoader, PropagateLoader, DotLoader} from 'react-spinners/';

class Loader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			default: 'BeatLoader'
		};
		this.getLoader = this.getLoader.bind(this);
	}

	getLoader(arg) {
		switch (arg) {
			case 'BeatLoader':
				return <BeatLoader color={this.props.color} loading={this.props.loading} />;

			case 'BounceLoader':
				return <BounceLoader color={this.props.color} loading={this.props.loading} />;

			case 'DotLoader':
				return <DotLoader color={this.props.color} loading={this.props.loading} />;

			case 'BarLoader':
				return <BarLoader color={this.props.color} loading={this.props.loading} />;

			case 'ClipLoader':
				return <ClipLoader color={this.props.color} loading={this.props.loading} />;

			case 'FadeLoader':
				return <FadeLoader color={this.props.color} load={this.props.load} />;

			case 'PropagateLoader':
				return <PropagateLoader color={this.props.color} load={this.props.load} />;

			default:
				return this.getLoader(this.state.default);
		}
	}

	render() {
		return this.getLoader(this.props.loader);
	}
}

export default Loader;
