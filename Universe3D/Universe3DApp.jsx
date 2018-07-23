import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import Universe3D from './asset/components/Universe3D.jsx';
import Universe3Dbg from './asset/img/university.jpg';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [0,0,0,0,0,0,0,0,0]
		};
	}


	componentWillUnmount() {
	  clearInterval(this.timerID);
	}

	componentDidMount() {
	  this.timerID = setInterval(
	    () => this.tick(),
	    500
	  );
	}
	
	tick() {
	  this.setState(
          preState => {
          	if(preState.list.length == 9) {
          		clearInterval(this.timerID);
          	}else {
          		// return preState.list.push(0);
          	}
          }
	  	);
	}


	render() {

		return (
			<div>
				<div style={{position:"absolute", top:"0", bottom:"0", left:"0" , right:"0", margin: "auto", perspective: "500px"}}>
					<Universe3D></Universe3D>
				</div>
				{this.state.list.map((item,index) => (
					<div key={"item_" + index} style={{
							position:"absolute", 
							top: window.innerHeight * Math.random() - 400 + "px", 
							left: window.innerWidth * Math.random() - 400 + "px", 
							perspective: "500px", 
							height: "200px",
							width: "200px",
							transform: "scale(" + Math.random() + ")"
						}}>
						<Universe3D time={8*Math.random()+8} direction={index%2==0?"normal":"alternate"}></Universe3D>
					</div>
				))}
			</div>
		);}
}

// App.protoTypes = {
// 	list: PropTypes.array.isRequired,
// 	createlist: PropTypes.func.isRequired,
// 	deletelist: PropTypes.func.isRequired,
// };

const div = document.createElement('div');
div.style.display = "inline-block";
div.style.position = "fixed";
div.style.overflow = "hidden";
div.style.textAlign ="center";
div.style.lineHeight = window.innerHeight + "px";
div.style.height = window.innerHeight + "px";
div.style.width = "100%";
div.style.background = `url(${Universe3Dbg})`;
div.style.backgroundSize = "contain";
document.body.appendChild(div);
ReactDOM.render(<App />, div);