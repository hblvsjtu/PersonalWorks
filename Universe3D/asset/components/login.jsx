import React from 'react';
import ReactDOM from 'react-dom';
import '../sass/login.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="login" >
                {/* 登陆模块，按需加载 script中无法绑定事件 */}
                <div id="success_dilog"></div>
                <script type="text/x-template" id="login_In" >
                    <div className="loginOuter">
                        <form id="loginInForm" action="http://hblvsjtu.picp.io:51688/loginIn" className="loginIn">
                            <span>Username:</span><br></br>
                            <input id="loginInName"  type="text"  placeholder="Username" ></input><br></br>
                            <span>Password:</span><br></br>
                            <input type="password"  id="loginInPassword" placeholder="Password" ></input><br></br>
                            <div className="loginBtnArray">
                                <button id="loginInBtn" className="loginBtn">确定</button>
                                <button type="reset" className="loginBtn">重置</button>
                                <button id="loginInCancel"  type="button" className="loginBtn">取消</button>
                            </div>
                        </form>
                    </div>  
                </script>
                <script type="text/x-template" id="login_Up" >
                    <div className="loginOuter">
                        <form action="#" className="loginUp">
                        <span>Username:</span><br></br>
                        <input type="text" id="loginUpName" placeholder="Username" ></input><br></br>
                        <span>Password:</span><br></br>
                        <input type="password" id="loginUpPassword" placeholder="Password" ></input><br></br>
                        <span>Password again:</span><br></br>
                        <input type="password" id="loginUpPassword2" placeholder="Password" ></input><br></br>
                        <span>mail:</span><br></br>
                        <input type="text" id="loginUpMail" placeholder="mail" ></input><br></br>
                        <div className="loginBtnArray">
                            <button id="loginUpBtn" className="loginBtn">确定</button>
                            <button type="reset" className="loginBtn">重置</button>
                            <button id="loginUpCancel" className="loginBtn">取消</button>
                        </div>
                        </form>
                    </div>  
                </script>
            </div>
        )
    }
}

export default Login;