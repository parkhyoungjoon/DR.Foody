import React, {Component} from 'react';
import styled from 'styled-components';
import {Link, withRouter} from "react-router-dom";

const Container = styled.div`
    color: white;
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height: 60px;
    display:flex;
    align-items: center;
    padding: 0px 10px;
    box-shadow: 0px 1px 5px 2px rgba(0,0,0,0.8);
    z-index: 10;
    background-color: #ff5122;
`;
// rbga(20, 20, 20, 0.8); -> background-color
const LogoImage = styled.div`
    height: 100%;
    width: 30%;
    position: absolute;
    color: white;
    `;
    // background-size: cover;
    // background-position: center center;
    // background-image: url(${props => props.image});
// &:hover ${DropUl} {
//     display: inline;
// }
const List = styled.ul`
    display: felx;
    list-style: none; 
`;
// left: 90%;
const Item = styled.li`
    background-color: rgba(0,0,0,0);
    margin-left: 10%;
    margin-top: 1%;
    position: relative;
    font-size: 25px;
    font-weight: bold;
    &: hover {
        background-color: #ff5122;
    }
    
    align-items: center;
    justify-content: center;
    text-decoration: none;
`;
const LogItem = styled.li`
    position: relative;
    font-size: 25px;
    font-weight: bold;
    &: hover {
        background-color: #ff5122;
    }
    list-style: none; 
    left: 70%;
`;
const SLink = styled(Link)`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
`;

const DropUl = styled.ul`
display: none;
`;
const DropList = styled.li`

&: hover {
    background-color: red;
}
`;
// position: absolute;
class Header extends React.Component {
    
    render(){
        const { logged, onLogout, id } = this.props;
        return (
            <Container>
                {/* <SLink to={'/'}>
                    <LogoImage image={require("../assets/logo.png")}/>
                    <LogoImage>DrFOODY</LogoImage>
                </SLink> */}
                    <List>
                        <Item>
                            <SLink to="/">DrFOODY</SLink>
                        </Item>
                        <Item>
                            <SLink to="/">HELP</SLink>
                        </Item>
                        <Item>
                            <SLink to="/search">SEARCH</SLink>
                        </Item>
                        <Item>
                            <SLink to="/data">DATA</SLink>
                        </Item>
                    </List>
                
                        <LogItem>
                            {logged 
                                ? (
                                    <List>
                                        <Item>
                                            <SLink to={`/mypage/datalist/${id}`}>{id}</SLink>
                                        </Item>
                                        <Item>
                                            <SLink to="/" onClick={onLogout}>Logout</SLink>
                                        </Item>
                                    </List>
                                )
                                : <SLink to="/login">LOGIN</SLink>
                            }
                        </LogItem>
                    
            </Container>

        );
    }
}

export default withRouter(Header);