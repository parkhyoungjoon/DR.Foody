import React, { Component } from 'react';
import {InputWithLabel} from './InputWithLabel';
import AuthContent from './AuthContent';
import AuthButton from './AuthButton';
import AuthLink from './AuthLink';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';

const LinkDiv = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    margin-left: 65%;
`;

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: "",
            password: "",
            nickname: "",
            user_id: "",
            error: null
        };
    }
    updateInform = e => {
        // e.preventDefault();
        const { target : {name, value}} = e;
        const  {id ,password} = this.state;
        const set = {
            id ,password
        };
        for(var key in set){
            if(key === name){
                set[key] = value;
                switch(key){
                    case "id":
                        this.setState({
                            id: set[key]
                        });
                        break;
                    case "password":
                        this.setState({
                            password: set[key]
                        });
                        break;
                    default:
                        console.log('error');
                }
            }
        }
        console.log(name+" : "+value);
    };

    // 세션 등록
    signUp = async(access_token) => {
        const { id, nickname} = this.state;
        const {data: {user_id}} = await axios.get('http://3.34.97.97/api/user', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        console.log("user_id: ", user_id);
        window.sessionStorage.setItem('id', id);
        window.sessionStorage.setItem('user_id', user_id);
        window.sessionStorage.setItem('nickname', nickname);
        window.sessionStorage.setItem('access_token', access_token);
        this.props.onLogin;
        // this.props.onLogin;
        this.props.history.push('/');
        window.location.reload();
    }

    // 로그인 버튼
    handleLoginButton = e => {
        e.preventDefault();
        const {id, password } = this.state;
// 로그인 주소: 'http://3.34.97.97/api/login' 
        axios.post('http://3.34.97.97/api/login', {
            id,
            // id : id
            password
            // password: password
        })
        .then( response => {
            console.log('login 작동');
            if(response.data.access_token){
                this.signUp(response.data.access_token);
            }
            console.log(response.data.access_token);
        }) 
        .catch( error => {
            console.log(error);
        });
    };

    render() { 
        const {id} = this.state;
        console.log('실행');
        console.log(id);
        return (
            <AuthContent title="로그인">
                <InputWithLabel label="아이디" name="id" placeholder="아이디" onChange={this.updateInform}/>
                <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" onChange={this.updateInform}/>
                <AuthButton onClick={this.handleLoginButton}>로그인</AuthButton>
                <LinkDiv>
                    <AuthLink to='/regist' children='회원가입'></AuthLink>
                    <AuthLink to='/' children='돌아가기'></AuthLink>
                </LinkDiv>
                {/* modify: /auth/register */}
            </AuthContent>
        );
    }
}

export default withRouter(Login);