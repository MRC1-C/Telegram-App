import React, { Component } from 'react'
import Login from './Login'
import Register from './Register';
export default class LoginAndRegister extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLogin: true,
            isRegister: false
        }
    }
    setLogin = () => {
        this.setState({
            isLogin: !this.state.isLogin,
            isRegister: !this.state.isRegister
        })
    }

    render() {
        return (
            <div>
                <Login setLogin={this.setLogin} isLogin={this.state.isLogin}/>
                <Register setLogin={this.setLogin} isRegister={this.state.isRegister}/>
            </div>
        )
    }
}
