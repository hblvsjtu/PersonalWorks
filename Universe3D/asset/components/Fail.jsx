import React from 'react';
import ReactDOM from 'react-dom';
import '../sass/fail.scss';

class Fail extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="fail">
				<p> 挑战失败！你的分数是<span> {this.props.score} </span>
					<br></br>
					<button onClick={this.props.restart}>重新开始</button>
				</p>
			</div>
		)
	}
}

export default Fail;