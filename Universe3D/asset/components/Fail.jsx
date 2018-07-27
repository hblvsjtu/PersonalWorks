import React from 'react';
import ReactDOM from 'react-dom';
import '../sass/fail.scss';

class Fail extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let name = "你"
		if (this.props.loginStatus === "success" && this.props.name !== "") {
			name = this.props.name;
		}
		return (
			<div className="fail">
				<p> 挑战失败！<br></br>
				<span>{name}</span> 的分数是<span> {this.props.score} </span>
					<br></br>
					<button onClick={this.props.restart}>重新开始</button>
				</p>
			</div>
		)
	}
}

export default Fail;