import React from 'react';
import ReactDOM from 'react-dom';
import '../sass/success.scss';

class Success extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="success">
				<p> 恭喜，挑战成功！你的分数是<span> {this.props.score} </span>
					<br></br>
					<button onClick={this.props.next}>闯下一关</button>
					<button onClick={this.props.restart}>重新开始</button>
				</p>
			</div>
		)
	}
}

export default Success;