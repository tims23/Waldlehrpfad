export class Quiz extends Component {
	render() {
		if (frage === 1) {
			return <Frage>1</Frage>;
		}
		if (frage === 2) {
			return <Frage>2</Frage>;
		}
	}
}

function Frage() {
	var clicked = false;
	return (
		<p
			onClick={() => {
				clicked = true;
			}}
		>
			Frage
		</p>
	);
}

export default Quiz;
