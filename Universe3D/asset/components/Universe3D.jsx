import React from 'react';
import ReactDOM from 'react-dom';
import '../sass/Universe3D.scss';

class Universe3D extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id={this.props.id} className="container" style={{animation: "run" + this.props.type + " "+ this.props.time +"s linear infinite " + this.props.direction}}>
				<div id={this.props.id + "a"} className="f1">前</div>
				<div id={this.props.id + "b"} className="f2">后</div>
				<div id={this.props.id + "c"} className="f3">左</div>
				<div id={this.props.id + "d"} className="f4">右</div>
				<div id={this.props.id + "e"} className="f5">上</div>
				<div id={this.props.id + "f"} className="f6">下</div>
			</div>
		);}
}

export default Universe3D;