!function(e){function t(t){for(var r,o,s=t[0],l=t[1],c=t[2],d=0,f=[];d<s.length;d++)o=s[d],a[o]&&f.push(a[o][0]),a[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(u&&u(t);f.length;)f.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,s=1;s<n.length;s++){var l=n[s];0!==a[l]&&(r=!1)}r&&(i.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},a={0:0},i=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var s=window.webpackJsonp=window.webpackJsonp||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;i.push([6,1]),n()}({15:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=i(n(0));i(n(5));function i(e){return e&&e.__esModule?e:{default:e}}n(16);var o=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),r(t,[{key:"render",value:function(){return a.default.createElement("div",{id:this.props.id,className:"container",style:{animation:"run"+this.props.type+" "+this.props.time+"s linear infinite "+this.props.direction}},a.default.createElement("div",{id:this.props.id+"a",className:"f1"},"前"),a.default.createElement("div",{id:this.props.id+"b",className:"f2"},"后"),a.default.createElement("div",{id:this.props.id+"c",className:"f3"},"左"),a.default.createElement("div",{id:this.props.id+"d",className:"f4"},"右"),a.default.createElement("div",{id:this.props.id+"e",className:"f5"},"上"),a.default.createElement("div",{id:this.props.id+"f",className:"f6"},"下"))}}]),t}();t.default=o},16:function(e,t,n){},18:function(e,t,n){e.exports=n.p+"db5fc14b1fbc1da88a02bf82471d09ec.jpg"},19:function(e,t,n){},6:function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=l(n(0)),i=l(n(5)),o=l(n(15)),s=l(n(18));function l(e){return e&&e.__esModule?e:{default:e}}n(19);var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),r=void 0,a=void 0,i=void 0,o=void 0,s=void 0,l=void 0,c=[],u=0;u<25;u++)r=Math.random(),a=Math.random(),i=Math.random(),o=Math.random(),s=Math.random(),l=Math.random(),c[u]=[r,a,i,o,s,l];return n.state={list:c,num:0,score:0,target:20,min:0,sec:0,setTime:30,success:"loading..."},n.selected={},n.restart=n.restart.bind(n),n.next=n.next.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),r(t,[{key:"componentWillUnmount",value:function(){clearInterval(this.timerID)}},{key:"componentDidMount",value:function(){var e=this;this.timerID=setInterval(function(){return e.tick()},1e3)}},{key:"tick",value:function(){var e=this;if(this.setState(function(e){if(90==!e.list.length){var t=[Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()];return e.list.push(t)}}),this.setState(function(t){var n=t.setTime-1<0?0:t.setTime-1,r=void 0,a=void 0,i="loading...";return 0==n&&(i=t.score<t.target?"fail":"success",clearInterval(e.timerID)),a=n%60,{min:r=(r=parseInt(n/60))<10?"0"+r:r,sec:a=a<10?"0"+a:a,setTime:n,success:i}}),"loading..."==this.state.success){var t=function(t){var n=t.target.id;n.match(/^item_\d+\w$/)&&(e.selected.hasOwnProperty(n)||(e.selected[n]=n,document.getElementById(n.slice(0,-1)).style.display="none",e.setState(function(e){var t=e.num+1,r=n.slice(-1,n.length);console.log("face = ",r);var a=e.score;switch(r){case"a":a+=1;break;case"b":a+=2;break;case"c":a+=3;break;case"d":a+=4;break;case"e":a+=5;break;case"f":a+=6}return{num:t,score:a}})))};document.getElementById("item").addEventListener("touchstart",t,!0),document.getElementById("item").addEventListener("click",t,!0)}}},{key:"restart",value:function(){for(var e=this,t=void 0,n=void 0,r=void 0,a=void 0,i=void 0,o=void 0,s=[],l=0;l<25;l++)t=Math.random(),n=Math.random(),r=Math.random(),a=Math.random(),i=Math.random(),o=Math.random(),s[l]=[t,n,r,a,i,o];this.setState({list:s,num:0,score:0,target:20,min:0,sec:0,setTime:30,success:"loading..."}),clearInterval(this.timerID),this.timerID=setInterval(function(){return e.tick()},1e3)}},{key:"next",value:function(){for(var e=this,t=void 0,n=void 0,r=void 0,a=void 0,i=void 0,o=void 0,s=[],l=0;l<20;l++)t=Math.random(),n=Math.random(),r=Math.random(),a=Math.random(),i=Math.random(),o=Math.random(),s[l]=[t,n,r,a,i,o];this.setState({list:s,num:0,score:0,target:40,min:0,sec:0,setTime:30,success:"loading..."}),clearInterval(this.timerID),this.timerID=setInterval(function(){return e.tick()},1e3)}},{key:"render",value:function(){return"loading..."==this.state.success?a.default.createElement("div",{id:"item"},a.default.createElement("header",{className:"title"},"星际争霸"),a.default.createElement("p",{className:"description"},"比赛说明",a.default.createElement("br",null),"击中“前”，“后”，“左”，“右”，“上”，“下”",a.default.createElement("br",null),"分别获得1，2，3，4，5，6分"),a.default.createElement("h1",{className:"target"},"目标 ",this.state.target," 分"),a.default.createElement("h1",{className:"hit"},"已经击中 ",this.state.num," 架UFO"),a.default.createElement("h1",{className:"score"},"一共获得 ",this.state.score," 分"),a.default.createElement("h1",{className:"time"},"剩余时间: ",this.state.min," 分 ",this.state.sec," 秒 ",this.state.success),a.default.createElement("div",{className:"centerBlock"},a.default.createElement(o.default,null)),this.state.list.map(function(e,t){return a.default.createElement("div",{key:"item_"+t,style:{position:"absolute",top:window.innerHeight/2*e[0]+window.innerHeight/4+"px",left:window.innerWidth/2*e[1]+window.innerHeight/4+"px",perspective:500*e[2]+500+"px",height:"75px",width:"75px",transform:"scale("+e[3]+")"}},a.default.createElement(o.default,{id:"item_"+t,type:1+parseInt(3*e[4]),time:12*e[5]+12,direction:t%2==0?"normal":"alternate"}))})):"fail"==this.state.success?a.default.createElement("div",{className:"fail"},a.default.createElement("p",null," 挑战失败！",a.default.createElement("br",null),a.default.createElement("button",{onClick:this.restart},"重新开始"))):"success"==this.state.success?a.default.createElement("div",{className:"success"},a.default.createElement("p",null," 恭喜，挑战成功！",a.default.createElement("br",null),a.default.createElement("button",{onClick:this.next},"闯下一关"),a.default.createElement("button",{onClick:this.restart},"重新开始"))):void 0}}]),t}(),u=document.createElement("div");u.style.display="inline-block",u.style.position="fixed",u.style.overflow="hidden",u.style.textAlign="center",u.style.height="100%",u.style.width="100%",u.style.background='url("'+s.default+'")',u.style.backgroundSize="contain",u.style.backgroundPosition="center",document.body.appendChild(u),i.default.render(a.default.createElement(c,null),u)}});
//# sourceMappingURL=Universe3D.bundle.js.map