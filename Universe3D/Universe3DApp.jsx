import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import Loading from './asset/components/Loading.jsx';
import Success from './asset/components/Success.jsx';
import Fail from './asset/components/Fail.jsx';
import Universe3Dbg1 from './asset/img/university1.jpg';
import Universe3Dbg2 from './asset/img/university2.jpg';
import Universe3Dbg3 from './asset/img/university3.jpg';
import Universe3Dbg4 from './asset/img/university4.jpg';
import Universe3Dbg5 from './asset/img/university5.jpg';
import Universe3Dbg_mobile1 from './asset/img/university_mobile1.jpg';
import Universe3Dbg_mobile2 from './asset/img/university_mobile2.png';
import Universe3Dbg_mobile3 from './asset/img/university_mobile3.png';
import Universe3Dbg_mobile4 from './asset/img/university_mobile4.png';
import Universe3Dbg_mobile5 from './asset/img/university_mobile5.png';


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
			visitorNum:0,
			name: "",
			password: "",
			mail: "",
			loginStatus: "fail"
		};
		this.selected={};
		this.restart = this.restart.bind(this);
		this.restartTimer = this.restartTimer.bind(this);
		this.stopTimer = this.stopTimer.bind(this);
		this.next = this.next.bind(this);
		this.pause = this.pause.bind(this);
		this.reload = this.reload.bind(this);
		this.createXHR = this.createXHR.bind(this);
		this.updateUserInfo = this.updateUserInfo.bind(this);
		this.loginIn = this.loginIn.bind(this);
		this.loginOut = this.loginOut.bind(this);
		this.setStatus = this.setStatus.bind(this);
	}


	componentWillUnmount() {
	  this.stopTimer();
	}

	componentDidMount() {
		this.xhr = this.createXHR();
		window.onload = this.restartTimer;
		this.bee = document.getElementById('bee');
		this.boom = document.getElementById('boom');
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

  		    // // 创建新的音频上下文接口
  		    // var audioCtx = new AudioContext();

  		    // // 发出的声音频率数据，表现为音调的高低
  		    // var arrFrequency = [196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50];

  		    // // 音调依次递增或者递减处理需要的参数
  		    // var start = 0, direction = 1;
	  		let f = (e) => {
			    let tar = e.target.id;
			  	if(tar.match(/^item_\d+\w$/)) {
			  		if(!this.selected.hasOwnProperty(tar)) {
			  			this.selected[tar] = tar;
		  				// 按钮元素
		  			   	document.getElementById(tar.slice(0,-1)).style.display = "none";
		  			   	let face = tar.slice(-1,tar.length);
		  			   	if (face == "a" || face == "b" || face == "c") {
		  			   		this.bee.load();
		  			   		this.bee.play();
		  			   	}
		  			  	if (face == "c" || face == "d" || face == "e") {
		  			  		this.boom.load();
		  			  		this.boom.play();
		  			  	}
		  			   	// // 当前频率
		  			   	// if (!window.AudioContext) { 
		  			   	//         console.log('当前浏览器不支持Web Audio API');
		  			   	//         return;
		  			   	// }else {
		  			   	// 	var frequency = arrFrequency[start];
		  			   	// 	// 如果到头，改变音调的变化规则（增减切换）
		  			   	// 	if (!frequency) {
		  			   	// 	    direction = -1 * direction;
		  			   	// 	    start = start + 2 * direction;
		  			   	// 	    frequency = arrFrequency[start];
		  			   	// 	}
		  			   	// 	// 改变索引，下一次hover时候使用
		  			   	// 	start = start + direction;

		  			   	// 	// 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
		  			   	// 	var oscillator = audioCtx.createOscillator();
		  			   	// 	// 创建一个GainNode,它可以控制音频的总音量
		  			   	// 	var gainNode = audioCtx.createGain();
		  			   	// 	// 把音量，音调和终节点进行关联
		  			   	// 	oscillator.connect(gainNode);
		  			   	// 	// audioCtx.destination返回AudioDestinationNode对象，表示当前audio context中所有节点的最终节点，一般表示音频渲染设备
		  			   	// 	gainNode.connect(audioCtx.destination);
		  			   	// 	// 指定音调的类型，其他还有square|triangle|sawtooth
		  			   	// 	oscillator.type = 'sine';
		  			   	// 	// 设置当前播放声音的频率，也就是最终播放声音的调调
		  			   	// 	oscillator.frequency.value = frequency;
		  			   	// 	// 当前时间设置音量为0
		  			   	// 	gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
		  			   	// 	// 0.01秒后音量为1
		  			   	// 	gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
		  			   	// 	// 音调从当前时间开始播放
		  			   	// 	oscillator.start(audioCtx.currentTime);
		  			   	// 	// 1秒内声音慢慢降低，是个不错的停止声音的方法
		  			   	// 	gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
		  			   	// 	// 1秒后完全停止声音
		  			   	// 	oscillator.stop(audioCtx.currentTime + 1);
		  			   	// }   
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

		    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
		        document.getElementById("item").addEventListener('touchstart',f, true);
		        console.log("这是移动端");
		    } else {
		        document.getElementById("item").addEventListener('click',f, true);
		        console.log("这是Web端");
	  		}
	  	}
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
			visitorNum:0,
		});
	    this.restartTimer();
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
					visitorNum:visitorNum,
				};
          	})
		this.restartTimer();
	}

	// pause 
	pause() {
		this.setState({status: "pause"});
		this.stopTimer();
		
	}

	reload() {
		this.setState({status: "loading"});
		this.restartTimer();
		
	}

	restartTimer() {
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

	stopTimer() {
		clearInterval(this.timerID1);
		clearInterval(this.timerID2);
		clearInterval(this.timerID3);
	}


	updateUserInfo(name, password, mail) {
		this.setState({name: name, password: password, mail: mail}); 
		console.log(name, password, mail);
	}

	loginIn(loginStatus) {
		this.setState({loginStatus: loginStatus}); 
		this.reload();
	}

	loginOut() {
		this.setState({name: "", password: "", mail: "", loginStatus: "fail"}); 
	}

	render() {
		if (this.state.status.match(/(^loading\.{0,3}$)|(^pause$)/)) 
			return <Loading list={this.state.list} num={this.state.num} score={this.state.score} target={this.state.target} 
		min={this.state.min} sec={this.state.sec} setTime={this.state.setTime} status={this.state.status} 
		order={this.state.order} speed={this.state.speed} visitorNum={this.state.visitorNum}
		loginIn={this.loginIn} loginOut={this.loginOut} name={this.state.name} password={this.state.password} mail={this.state.mail} loginStatus={this.state.loginStatus}
		updateUserInfo={this.updateUserInfo} pause={this.pause} reload={this.reload}></Loading>
		else if(this.state.status == "fail") {
			this.stopTimer();
			return <Fail restart={this.restart} score={this.state.score} loginStatus={this.state.loginStatus} name={this.state.name}></Fail>}
		else if(this.state.status == "success") {
			this.stopTimer();
			return <Success next={this.next} restart={this.restart} score={this.state.score} loginStatus={this.state.loginStatus} name={this.state.name}></Success>
		} 
	}	
}

// App.protoTypes = {
// 	list: PropTypes.array.isRequired,
// 	createlist: PropTypes.func.isRequired,
// 	deletelist: PropTypes.func.isRequired,
// };

const div = document.createElement('div');
div.id = "bg";
div.style.display = "inline-block";
div.style.position = "fixed";
div.style.overflow = "hidden";
div.style.textAlign ="center";
// div.style.lineHeight = "100%";
div.style.height = "100%";
div.style.width = "100%";
let order = parseInt(Math.random()*5)+1;
if (window.innerWidth > 800) {
	if(order === 1) div.style.background = `url("${Universe3Dbg1}")`;
	if(order === 2) div.style.background = `url("${Universe3Dbg2}")`;
	if(order === 3) div.style.background = `url("${Universe3Dbg3}")`;
	if(order === 4) div.style.background = `url("${Universe3Dbg4}")`;
	if(order === 5) div.style.background = `url("${Universe3Dbg5}")`;
}else {
	if(order === 1) div.style.background = `url("${Universe3Dbg_mobile1}")`;
	if(order === 2) div.style.background = `url("${Universe3Dbg_mobile2}")`;
	if(order === 3) div.style.background = `url("${Universe3Dbg_mobile3}")`;
	if(order === 4) div.style.background = `url("${Universe3Dbg_mobile4}")`;
	if(order === 5) div.style.background = `url("${Universe3Dbg_mobile5}")`;
}
div.style.backgroundSize = "cover";
div.style.backgroundPosition = "center";
document.body.appendChild(div);
ReactDOM.render(<App />, div);