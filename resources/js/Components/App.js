import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, browserHistory } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import GlobalStyles from './GlobalStyles';
// import Login from './Components/Auth/Login';
// import Register from './Components/Auth/Register';
import Auth from './Auth/Auth';
import Search from './Search/Search';
import Product from './ViewProd/Product';
import DataSearch from './DataSearch/DataSearch';
import Data from './Data/Data';
import Store from './Store/store';
import DataList from './Mypage/DataList/DataList';
import Payment from './Payment/Payment';
import PaymentTest from './Payment/PaymentTest';
import Wishlist from './Wishlist/Wishlist';

import axios from 'axios';
import PaymentResult from './PaymentResult';

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id: "",
            nickname: "",
            access_token: "",
            user_id: "",
            logged: false,
            onLogin: this.onLogin,
            onLogout: this.onLogout,
        }
    }

    // 로그인
    onLogin = (id, nickname, user_id, access_token) => {
        this.setState({
            id,
            user_id,
            nickname,
            access_token,
            logged: true
        });
    }
    // 로그아웃
    onLogout = (access_token) => {
        this.setState({
            logged: false
        });
        axios.get('api/logout', {
            headers: {
                Authorization: "Bearer " + access_token
            }
        })
        .then( res => {
            console.log(res);
        })
        .catch(error => {
            console.log('err: ', error);
        });
        console.log('success');
        window.sessionStorage.clear();
    }

    componentDidMount() {
        const id = window.sessionStorage.getItem('id');
        const user_id = window.sessionStorage.getItem('user_id');
        const nickname = window.sessionStorage.getItem('nickname');
        const access_token = window.sessionStorage.getItem('access_token');
        if(id) {
            this.onLogin(id, nickname, access_token);
        } else {
            this.onLogout(access_token);
        }
        console.log(id, " + ", user_id, " + ", access_token);
    }

    render(){
        const { id, nickname, access_token, logged, user_id, onLogout } = this.state;
        return(
            <BrowserRouter>
                <>
                <Store.Provider value={this.state} >
                    <GlobalStyles />
                    {/* 라우터로 빼내서 home에 넣기? */}
                    <Header logged={logged} onLogout={onLogout} id={id}/>
                    <Switch>
                        <Route exact path ="/" component={Home} access_token={access_token} />
                        <Route path ="/search" component={Search} />
                        <Route path ="/search/:search_id" component={Search} />
                        <Route path ="/searchProduct/:food_code" component={Product} id={id} user_id={user_id} />
                        <Route path ="/login" component={Auth} />
                        <Route path ="/regist" component={Auth} />
                        <Route exact path ="/data" component={DataSearch} />
                        <Route path ="/data/:food_id" component={Data} />
                        <Route exact path ="/mypage/datalist/:id" component={DataList} id={id} />
                        <Route exact path ="/payment" component={PaymentTest} />
                        {/* <Route path ="/payment" component={Payment} /> */}
                        <Route path ="/payment/result/:order_id" component={PaymentResult} />
                        <Route path ="/datalist" component={DataList} />
                        <Route path ="/wishlist" component={Wishlist} />
                        {/* <Route path ="/sell/:id" component={sell} /> */}
                    </Switch>
                </Store.Provider>
                </>
            </BrowserRouter>
        );
    }
}

export default App;

