import React from 'react';
import ReactDOM from 'react-dom';
import Universe3D from './Universe3D.jsx';
import Login from './Login.jsx';
import '../sass/loading.scss';
import bee from '../audio/beep.mp3';
import boom from '../audio/boom.mp3';

class Loading extends React.Component {
	constructor(props) {
		super(props);
		this.login_in = this.login_in.bind(this);
		this.login_up = this.login_up.bind(this);
		this.login_out = this.login_out.bind(this);
		this.loginFunc = this.loginFunc.bind(this);
		this.createXHR = this.createXHR.bind(this);
		this.name = "";
		this.password = "";
		this.mail = "";
		this.loginStatus = "fail";
	}

	componentDidMount() {
		this.xhr = this.createXHR();
	}

	login_in() {
		this.loginFunc("In","http://hblvsjtu.picp.io:51688/login");
	}

	login_up() {
		this.loginFunc("Up","http://hblvsjtu.picp.io:51688/login");
	}

	login_out() {
		this.props.loginOut();
	}

	loginFunc(type,url) {
		console.log(`login_${type}`);
		document.getElementById('success_dilog').innerHTML =  document.getElementById(`login_${type}`).innerHTML;
		this.props.pause();
		document.getElementById(`login${type}Name`).addEventListener("change", (e) => {this.name = e.currentTarget.value}, false);
		document.getElementById(`login${type}Password`).addEventListener("change", (e) => {this.password = e.currentTarget.value}, false);
		if (type == "Up") document.getElementById(`login${type}Mail`).addEventListener("change", (e) => {this.mail = e.currentTarget.value}, false);
		document.getElementById(`login${type}Btn`).type = 'button';
		document.getElementById(`login${type}Btn`).addEventListener("click", () => {
				this.props.updateUserInfo(this.name, this.password, this.mail);
			  	this.xhr.open("GET", `${url}${type}?name=${this.props.name}&password=${this.props.password}&mail=${this.props.mail}`);
				this.xhr.send();
				document.getElementById('success_dilog').innerHTML='';
		}, false);
		document.getElementById(`login${type}Cancel`).type = 'button';
		document.getElementById(`login${type}Cancel`).addEventListener("click", () => {
			document.getElementById('success_dilog').innerHTML='';
			this.props.reload();
		}, false);
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
	  	  		if (responseText === "fail") {alert("用户名或着密码错误，请重新登录！")};
	  	  		if (responseText === "exist") {alert("用户名已存在，请重新注册！")};
	  			self.props.loginIn(responseText);
	  	  	}
		}
		return xhr;
	}

	render() {
		let loginPart;
		{if (this.props.loginStatus === "success") {
				loginPart = (
					<div>
						<span className="welcome">欢迎：{this.props.name}</span><br></br>
						<button className="btn" onClick={this.login_out}>退出登陆</button>
					</div>);
			}else {
				loginPart = (
					<div>
						<button className="btn" onClick={this.login_in} >登陆</button><br></br>
						<button className="btn" onClick={this.login_up} >注册</button>
					</div>
				);
			}
		}
		return (
			<div id="item">
				<audio id="bee" src={bee} preload="auto"></audio>
				<audio id="boom" src={boom} preload="auto"></audio>
				<header className="title">星际争霸</header>
				<p className="description">比赛说明
					<br></br>击中“前”，“后”，“左”，“右”，“上”，“下”
					<br></br>分别获得1，2，3，4，5，6分
				</p>
				<h1 className="target">第{this.props.order}关 目标：{this.props.target} 分 速度：{13-this.props.speed}</h1>
				<h1 className="hit">已经击中 {this.props.num} 架UFO</h1>
				<h1 className="score">一共获得 {this.props.score} 分</h1>
				<h1 className="time">剩余时间: {this.props.min} 分 {this.props.sec} 秒 <br></br>{this.props.status}</h1>
				<h1 className="visitorNum">访问总人数: {this.props.visitorNum}</h1>
				<Login cancel={this.cancel}></Login>
				<div className="login">
					{loginPart}
				</div>
				<div className="centerBlock">
					<Universe3D></Universe3D>
				</div>
				{this.props.list.map((item,index) => (
					<div key={"item_" + index} style={{
							position:"absolute", 
							top: window.innerHeight/2 * item[0] + window.innerHeight/4 + "px", 
							left: window.innerWidth/2 * item[1] + window.innerHeight/4 + "px", 
							perspective: 500 * item[2] + 500 + "px", 
							height: "60px",
							width: "60px",
							transform: "scale(" + item[3] + ")"
						}}>
						<Universe3D id={"item_" + index} type={1 + parseInt(item[4]*3)} time={this.props.speed *item[5]+ this.props.speed} direction={index%2==0?"normal":"alternate"}></Universe3D>
					</div>
				))}
			</div>
		)
	}
}

export default Loading;