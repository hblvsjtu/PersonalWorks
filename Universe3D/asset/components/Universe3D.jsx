import React from 'react';
import ReactDOM from 'react-dom';
import '../sass/Universe3D.scss';

class Universe3D extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container" style={{animation: "run " + this.props.time +"s infinite " + this.props.direction}}>
				<div className="f1">前</div>
				<div className="f2">后</div>
				<div className="f3">左</div>
				<div className="f4">右</div>
				<div className="f5">上</div>
				<div className="f6">下</div>
			</div>
		);}
}

export default Universe3D;