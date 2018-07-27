import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import Loading from './asset/components/Loading.jsx';
import Success from './asset/components/Success.jsx';
import Fail from './asset/components/Fail.jsx';
import Universe3Dbg from './asset/img/university.jpg';
import Universe3Dbg_mobile from './asset/img/university_mobile.jpg';


class App extends React.Component {

	constructor(props) {
		super(props);
		let a0,a1,a2,a3,a4,a5,arr = [];
		for(let i=0; i<25; i++) {
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
			status: "loading",
			order: 1,
			speed:12,
			visitorNum:0
		};
		this.selected={};
		this.restart = this.restart.bind(this);
		this.next = this.next.bind(this);
		this.createXHR = this.createXHR.bind(this);
		this.setStatus = this.setStatus.bind(this);
	}


	componentWillUnmount() {
	  clearInterval(this.timerID1);
	  clearInterval(this.timerID2);
	  clearInterval(this.timerID3);
	}

	componentDidMount() {
		this.xhr = this.createXHR();
		this.timerID1 = setInterval(
	    	() => this.setStatus(),
	    	1000
	  	);
	  	this.timerID2 = setInterval(
	    	() => this.FreeUFO(),
	    	1000
	  	);
	  	// 每10秒获取一次总访问人数
	  	this.xhr.open("GET", "http://hblvsjtu.picp.io:51688/visitorNum");
		this.xhr.send();
	  	this.timerID3 = setInterval(
	    	() => {
	    		this.xhr.open("GET", "http://hblvsjtu.picp.io:51688/visitorNum");
		  		this.xhr.send();
	    	},
	    	10000
	  	);
	}
	
	// free the UFO
	FreeUFO() {
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
	}


	// judge the status and calculate the score
	setStatus() {
		// 判断是否成功
	  	this.setState(
          	preState => {
          		let setTime = preState.setTime - 1 < 0 ? 0: preState.setTime - 1;
          		let min, sec;
          		let status = "loading";
          		if (setTime == 0) {
				 	status = (preState.score < preState.target)? "fail" : "success";
				 	clearInterval(this.timerID);
          		}
				min = parseInt(setTime / 60);
				sec = setTime % 60;
				min = min < 10 ? "0" + min : min;
				sec = sec < 10 ? "0" + sec : sec;
				let k = sec%4;
				for(let i=0; i<k; i++) status += ".";
				return {min: min, sec: sec, setTime: setTime, status: status};
          	})

	  	// 事件代理
	  	if(this.state.status.match(/^loading\.{0,3}$/)) {
	  		let f = (e) => {
			    let tar = e.target.id;
			  	if(tar.match(/^item_\d+\w$/)) {
			  		if(!this.selected.hasOwnProperty(tar)) {
			  			this.selected[tar] = tar;
			  			document.getElementById(tar.slice(0,-1)).style.display = "none";
			  			this.setState(preState => {
			  				let number = preState.num + 1 ; 
				  			let face = tar.slice(-1,tar.length);
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

	// restart the game
	restart() {
		let a0,a1,a2,a3,a4,a5,arr = [];
		for(let i=0; i<25; i++) {
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
			status: "loading",
			order: 1,
			speed:12,
			visitorNum:0
		});
		clearInterval(this.timerID);
		this.timerID = setInterval(
	    () => this.FreeUFO(),
	    1000
	  );
	}

	// Next chanllege
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
		this.setState(
          	preState => {
          		let target = preState.target + 20;
          		let order = preState.order + 1;
          		let speed = preState.speed - 1;
          		let visitorNum = preState.visitorNum - 1;
				return {
					list: arr,
					num:0,
					score:0,
					target: target,
					min: 0,
					sec: 0,
					setTime:30,
					status: "loading",
					order: order,
					speed: speed,
					visitorNum:visitorNum
				};
          	})
		clearInterval(this.timerID);
		this.timerID = setInterval(
	    () => this.FreeUFO(),
	    1000
	  );
	}

	// create the only one XMLHttpReaquest
	createXHR() {
		const self = this;
		let xhr;
		if (window.XMLHttpRequest) {
		  	// code for IE7+, Firefox, Chrome, Opera, Safari
		    xhr=new XMLHttpRequest();
		} else{
		    // code for IE6, IE5
		    xhr=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhr.onreadystatechange = function() {
	  	  	if (xhr.readyState==4 && xhr.status==200) {
	  	  		let responseText = xhr.responseText;
	  			self.setState({visitorNum: responseText});
	  	  	}
		}
		return xhr;
	}


	render() {
		if (this.state.status.match(/^loading\.{0,3}$/)) 
			return <Loading list={this.state.list} num={this.state.num} score={this.state.score} target={this.state.target} 
		min={this.state.min} sec={this.state.sec} setTime={this.state.setTime} success={this.state.status} 
		order={this.state.order} speed={this.state.speed} visitorNum={this.state.visitorNum}></Loading>
		else if(this.state.status == "fail") return <Fail restart={this.restart} score={this.state.score}></Fail>
		else if(this.state.status == "success") return <Success next={this.next} restart={this.restart} score={this.state.score}></Success>
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
if (window.innerWidth > 800) {
	div.style.background = `url("${Universe3Dbg}")`;
	div.style.backgroundSize = "contain";
	div.style.backgroundPosition = "center";
}else {
	div.style.background = `url("${Universe3Dbg_mobile}")`;
	div.style.backgroundSize = "contain";
	div.style.backgroundPosition = "center";
}
document.body.appendChild(div);
ReactDOM.render(<App />, div);