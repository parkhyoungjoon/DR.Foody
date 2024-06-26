import React, {Component} from 'react';
import {Router} from 'react-router-dom'; 
import styled from 'styled-components';
import axios from 'axios';
import DataSearchContainer from './DataSearchContainer';

import { Api } from '../api';

export default class extends Component {
    state = {
            searchTerm: "",
            pastTerm: "",
            result: null,
            loading: true,
            error: null,
            user_id : window.sessionStorage.getItem('id'),
            logined : false,
        }    
        // {
        //     food_id: 1,
        //     company_name: "",
        //     food_name: "",
        //     food_photo: "",
        //     point: 1,
        //     review_count: 1,
        //     search_count: 1,
        //     company: 1,
        //     country: "",
        //     sex: ""
        //     }
        // 받을 정보
        // food_id : 제품 번호
        // food_name : 제품이름
        // food_photo : 제품사진
        // point: 별점 평균
        // review_count: 리뷰 수
        // search_count: 조회 수
        // country: 선호 국가
        // sex: 선호 성별
    
     // 검색어를 입력 하였을 때 빈칸인지 확인하고 검색 실행
     handleSubmit = e => {
        e.preventDefault();
        console.log("submit");
        const { searchTerm, pastTerm } = this.state;
        this.checkLogin();
        if(searchTerm !== "") {
            this.searchByTerm();
            this.setState({
                pastTerm: searchTerm
            });
        }
    };

    updateTerm = e => {
       const { target: { value } } = e;
       console.log(value);
        this.setState({
            searchTerm: value
        });

    };

    searchByTerm = async() => { 
        const { searchTerm, user_id } = this.state;
        this.setState({ loading: true});
        console.log('검색 작동');
        let result = null
        try {
            if(user_id){
               ({data : result} = 
                    await axios.get(`http://3.34.97.97/api/searchFood/${searchTerm}/${user_id}`));
            } else {
                ({data : result} = 
                    await axios.get(`http://3.34.97.97/api/searchFood/${searchTerm}`));
            }
            this.setState({
                result,
            });
            console.log(this.state.result);
        } catch {
            this.setState({ error: "Can't search"});
        } finally {
            this.setState({ loading: false});
        }
    };

    checkUser = e => {
        e.preventDefault();
        const { user_id } = this.state;
        if(!user_id){
            alert('로그인 후 이용가능합니다.');
        } else {
            // 유저한테 구매 목록 확인 후 없으면
            alert(' 구매 후 조회 가능합니다.');
        }
    };

    // addWishList = (user_id, value) => {
    //     const res = Api.addWishListApi(user_id, value);
    //     return res;
    // };

    // 로그인 확인하고 구입한 목록 불러오기
    checkLogin = () => {
        const { user_id } = this.state;
        if(!user_id){
           this.setState({
               logined: false
           });
        } else {
            this.setState({
                logined: true
            });
        }
    };

    onConfirm = async(e) => {
        e.preventDefault();
        const buy = '구매';
        const wish = '장바구니에 담겠';
        let confirm = false;

        const { target: {name, value}} = e;
        console.log(value);
        const { user_id } = this.state;
        if(name==='buy'){
             confirm = window.confirm(`${buy}하시겠습니까`);
        } 
        // // 장바구니 ok일 경우
        if(name==='wish'){
            // true일 경우 결제창으로 넘어감
            // 찜 목록에 추가 후 장바구니 화면
            const {data: apiResult} = await Api.addWishListApi(user_id, value);
            console.log(apiResult);
            if(apiResult.got === true) {
                alert('이미 있는 제품입니다.');
            } else {
                alert('추가하였습니다.');
            }
            // 구매 ok일 경우
        } else if(confirm && name==='buy'){
            await Api.addWishListApi(user_id, value)
            .then( res => {
                console.log('구매성공');
            });
            this.props.history.push('/wishlist');
        }
    };

    // componentDidMount(){
    //     this.checkLogin();

    // }

    

    render(){
        const {searchTerm, pastTerm, result, loading, error, logined } = this.state;
        console.log('render: ');
        console.log(result);
        return (
            <DataSearchContainer
                searchTerm={searchTerm}
                pastTerm={pastTerm}
                result={result}
                loading={loading}
                error={error}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
                checkUser={this.checkUser}
                onConfirm={this.onConfirm}
                logined={logined}
            />
        );
    }
     
}