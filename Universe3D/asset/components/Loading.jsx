import React from 'react';
import ReactDOM from 'react-dom';
import Universe3D from './Universe3D.jsx';
import '../sass/loading.scss';

class Loading extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="item">
				<header className="title">星际争霸</header>
				<p className="description">比赛说明
					<br></br>击中“前”，“后”，“左”，“右”，“上”，“下”
					<br></br>分别获得1，2，3，4，5，6分
				</p>
				<h1 className="target">第{this.props.order}关 目标：{this.props.target} 分 速度：{13-this.props.speed}</h1>
				<h1 className="hit">已经击中 {this.props.num} 架UFO</h1>
				<h1 className="score">一共获得 {this.props.score} 分</h1>
				<h1 className="time">剩余时间: {this.props.min} 分 {this.props.sec} 秒 {this.props.status}</h1>
				<h1 className="visitorNum">访问总人数: {this.props.visitorNum}</h1>
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