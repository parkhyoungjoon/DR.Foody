import React, {Component} from 'react';
import styled from 'styled-components';
import {Link, withRouter} from "react-router-dom";
import Header from './Header';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;
const LogoImage = styled.div`
    height: 100%;
    width: 50%;
    position: absolute;
    background-color:  #ff5122;
    background-size: cover;
    background-position: center center;
    background-image: url("./assets/logo.png");
`;
    
const List = styled.ul`
    display: felx;
    list-style: none; 
`;
const Item = styled.li`
    background-color: rgba(0,0,0,0);
    margin-left: 3%;
    margin-top: 1%;
    position: relative;
    left: 50%;
    font-size: 25px;
    font-weight: bold;
    &: hover {
        background-color: #ff5122;
    }
`;
const SLink = styled(Link)`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
`;
const ImageContainer = styled.div`
width:100%;
height: 100vh;
display:block;  
`;
const IfDiv = styled.div`
    width:100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    
    opacity: 1;
`;

class Home extends React.Component {
    state = {
        token: ""
    }
    componentDidMount(){
        let token = window.sessionStorage.getItem('access_token');
        this.setState({
            token
        });
    }
    render(){
        const { token } = this.state;
        console.log('Home render');
        console.log(token);
        return(
            <>
                {/* <Header logged={logged} onLogout={onLogout} /> */}
                <ImageContainer>
                    <IfDiv bgImage = {require(`../assets/home1.png`)}></IfDiv>
                    <IfDiv bgImage = {require(`../assets/home2.png`)}></IfDiv>
                    {/* <IfDiv bgImage = {require(`../assets/sample3.jpg`)}></IfDiv> */}
                </ImageContainer>
            </>
        );
    }
}

export default Home;

