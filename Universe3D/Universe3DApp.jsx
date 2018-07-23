import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import Universe3D from './asset/components/Universe3D.jsx';
import Universe3Dbg from './asset/img/university.jpg';
import './asset/sass/item.scss';

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
			list: [arr],
			num:0,
			score:0
		};
		this.selected={};
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

		// 释放飞机
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

	  	// 事件代理
	    document.getElementById("item").addEventListener('click', (e) => {
	    let tar = e.target.id;
	  	if(tar.match(/^item_\d+\w$/)) {
	  		if(!this.selected.hasOwnProperty(tar)) {
	  			this.selected[tar] = tar;
	  			document.getElementById(tar.slice(0,-1)).style.display = "none";
	  			this.setState(preState => {
	  				let number = preState.num + 1 ; 
		  			let face = tar.slice(-1,tar.length);
		  			console.log("face = ", face);
		  			let score = preState.score;
		  			switch(face) {
		  				//前面
		  				case "a" : 
							score += 1;
		  					break;
		  				//后面
		  				case "b" : 
							score += 2;
		  					break;
		  				//左面
		  				case "c" : 
							score += 3;
		  					break;
		  				//右面
		  				case "d" : 
							score += 4;
		  					break;
		  				//上面
		  				case "e" : 
							score += 5;
		  					break;
		  				//下面
		  				case "f" : 
							score += 6;
		  					break;
		  				default:
		  					break;
		  			}
	  				return {num: number, score: score}});
	  		}
	  	}
	    }, true);
	}


	render() {
		
		return (
			<div id="item">
				<p className="description">比赛说明
					<br></br>击中“前”，“后”，“左”，“右”，“上”，“下”
					<br></br>分别获得1，2，3，4，5，6分
				</p>
				<h1 className="hit">已经击中 {this.state.num} 架飞机</h1>
				<h1 className="score">一共获得 {this.state.score} 分</h1>
				<div className="centerBlock">
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
// div.style.lineHeight = "100%";
div.style.height = "100%";
div.style.width = "100%";
div.style.background = `url("${Universe3Dbg}")`;
div.style.backgroundSize = "contain";
div.style.backgroundPosition = "center";
document.body.appendChild(div);
ReactDOM.render(<App />, div);