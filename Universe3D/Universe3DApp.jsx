import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import Universe3D from './asset/components/Universe3D.jsx';
import Universe3Dbg from './asset/img/university.jpg';
import './asset/sass/item.scss';

class App extends React.Component {

	constructor(props) {
		super(props);
		let a0,a1,a2,a3,a4,a5,arr = [];
		for(let i=0; i<20; i++) {
			a0 = Math.random();
			a1 = Math.random();
			a2 = Math.random();
			a3 = Math.random();
			a4 = Math.random();
			a5 = Math.random();
			arr[i] = [a0,a1,a2,a3,a4,a5];
		}
		this.state = {
			list: arr,
			num:0,
			score:0,
			target: 20,
			min: 0,
			sec: 0,
			setTime:30,
			success: "loading..."
		};
		this.selected={};
		this.restart = this.restart.bind(this);
		this.next = this.next.bind(this);
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
	          	if(!preState.list.length == 90) {
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


		// 判断是否成功
	  	this.setState(
          	preState => {
          		let setTime = preState.setTime - 1 < 0 ? 0: preState.setTime - 1;
          		let min, sec;
          		let success = "loading...";
          		if (setTime == 0) {
				 	success = (preState.score < preState.target)? "fail" : "success";
				 	clearInterval(this.timerID);
          		}
				min = parseInt(setTime / 60);
				sec = setTime % 60;
				min = min < 10 ? "0" + min : min;
				sec = sec < 10 ? "0" + sec : sec;
				return {min: min, sec: sec, setTime: setTime, success: success};
          	})

	  	// 事件代理
	  	if(this.state.success == "loading...") {
	  		let f = (e) => {
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
		    }
	  		document.getElementById("item").addEventListener('touchstart',f, true);
		    document.getElementById("item").addEventListener('click',f, true);
	  	}
	}

	restart() {
		let a0,a1,a2,a3,a4,a5,arr = [];
		for(let i=0; i<50; i++) {
			a0 = Math.random();
			a1 = Math.random();
			a2 = Math.random();
			a3 = Math.random();
			a4 = Math.random();
			a5 = Math.random();
			arr[i] = [a0,a1,a2,a3,a4,a5];
		}
		this.setState({
			list: arr,
			num:0,
			score:0,
			target: 20,
			min: 0,
			sec: 0,
			setTime:30,
			success: "loading..."
		});
		clearInterval(this.timerID);
		this.timerID = setInterval(
	    () => this.tick(),
	    1000
	  );
	}

	next() {
		let a0,a1,a2,a3,a4,a5,arr = [];
		for(let i=0; i<20; i++) {
			a0 = Math.random();
			a1 = Math.random();
			a2 = Math.random();
			a3 = Math.random();
			a4 = Math.random();
			a5 = Math.random();
			arr[i] = [a0,a1,a2,a3,a4,a5];
		}
		this.setState({
			list: arr,
			num:0,
			score:0,
			target: 40,
			min: 0,
			sec: 0,
			setTime:60,
			success: "loading..."
		});
		clearInterval(this.timerID);
		this.timerID = setInterval(
	    () => this.tick(),
	    1000
	  );
	}


	render() {
		if (this.state.success == "loading...") {
			return (
				<div id="item">
					<header className="title">星际争霸</header>
					<p className="description">比赛说明
						<br></br>击中“前”，“后”，“左”，“右”，“上”，“下”
						<br></br>分别获得1，2，3，4，5，6分
					</p>
					<h1 className="target">目标 {this.state.target} 分</h1>
					<h1 className="hit">已经击中 {this.state.num} 架UFO</h1>
					<h1 className="score">一共获得 {this.state.score} 分</h1>
					<h1 className="time">剩余时间: {this.state.min} 分 {this.state.sec} 秒 {this.state.success}</h1>
					<div className="centerBlock">
						<Universe3D></Universe3D>
					</div>
					{this.state.list.map((item,index) => (
						<div key={"item_" + index} style={{
								position:"absolute", 
								top: window.innerHeight/2 * item[0] + window.innerHeight/4 + "px", 
								left: window.innerWidth/2 * item[1] + window.innerHeight/4 + "px", 
								perspective: 500 * item[2] + 500 + "px", 
								height: "50px",
								width: "50px",
								transform: "scale(" + item[3] + ")"
							}}>
							<Universe3D id={"item_" + index} type={1 + parseInt(item[4]*3)} time={16*item[5]+16} direction={index%2==0?"normal":"alternate"}></Universe3D>
						</div>
					))}
				</div>
			);
		}else if(this.state.success == "fail"){
			return (
				<div className="fail">
					<p> 挑战失败！
						<br></br>
						<button onClick={this.restart}>重新开始</button>
					</p>
				</div>
			)
		}
		else if(this.state.success == "success"){
			return (
				<div className="success">
					<p> 恭喜，挑战成功！
						<br></br>
						<button onClick={this.next}>闯下一关</button>
						<button onClick={this.restart}>重新开始</button>
					</p>
				</div>
			)
		}
	}	
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