import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import Universe3D from './asset/components/Universe3D.jsx';
import Universe3Dbg from './asset/img/university.jpg';

class App extends React.Component {

	constructor(props) {
		super(props);
		let a0 = Math.random();
		let a1 = Math.random();
		let a2 = Math.random();
		let a3 = Math.random();
		let a4 = Math.random();
		let a5 = Math.random();
		let arr = [a0,a1,a2,a3,a4,a5];
		this.state = {
			list: [arr]
		};
	}


	componentWillUnmount() {
	  clearInterval(this.timerID);
	}

	componentDidMount() {
	  this.timerID = setInterval(
	    () => this.tick(),
	    1000
	  );
	}
	
	tick() {
	  this.setState(
          preState => {
          	if(preState.list.length == 50) {
          		clearInterval(this.timerID);
          	}else {
          		let a0 = Math.random();
          		let a1 = Math.random();
          		let a2 = Math.random();
          		let a3 = Math.random();
          		let a4 = Math.random();
          		let a5 = Math.random();
          		let arr = [a0,a1,a2,a3,a4,a5];
          		return preState.list.push(arr);
          	}
          }
	  	);
	    document.getElementById("item").addEventListener('click', function(e) {
	    	console.log("e = ", e);
	  	if(e.target.id.match(/^item_\d+$/)) {
	  		console.log("e.target.id = ", e.target.id);
	  		document.getElementById(e.target.id).style.display = "none";
	  	}
	    }, true);
	}


	render() {
		
		return (
			<div id="item">
				<div style={{position:"absolute", top:"0", bottom:"0", left:"0" , right:"0", margin: "auto", perspective: "1000px", transform: "scale(2)"}}>
					<Universe3D></Universe3D>
				</div>
				{this.state.list.map((item,index) => (
					<div key={"item_" + index} style={{
							position:"absolute", 
							top: window.innerHeight * item[0] - 400 + "px", 
							left: window.innerWidth * item[1] - 400 + "px", 
							perspective: 500 * item[2] + 500 + "px", 
							height: "50px",
							width: "50px",
							transform: "scale(" + item[3] + ")"
						}}>
						<Universe3D id={"item_" + index} type={1 + parseInt(item[4]*3)} time={16*item[5]+16} direction={index%2==0?"normal":"alternate"}></Universe3D>
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
div.style.background = `url("${Universe3Dbg}")`;
div.style.backgroundSize = "contain";
document.body.appendChild(div);
ReactDOM.render(<App />, div);