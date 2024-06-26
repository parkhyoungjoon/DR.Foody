import React from 'react';
import axios from 'axios';
import {Redirect } from 'react-router-dom';
import WishlistPresenter from './WishlistPresenter';
import api, { Api } from '../api';


// 찜(장바구니)에 넣은 목록을 가져와서 확인

const userCode = 'imp81806721';

export default class extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            wishList: null,
            user_id : window.sessionStorage.getItem('id'),
            error: "",
            total_price: 0,
            type:"kakaopay",
            food_list: [],
            date: new Date().getTime(),
            order_id:"",
        };
        this.refreshList = this.refreshList.bind(this);
        this.createMerchant_uid = this.createMerchant_uid.bind(this);
    };

    handlePayment = e => {
        e.preventDefault();
        this.requestPay();
        // 구매가 완료 되었습니다.
        // go 구매목록 보기
        // go 메인화면으로 가기
    };
    handleCancel = e => {
        e.preventDefault();
        this.props.history.push('/data');
    };
    handleDelete = async(e) => {
        console.log('삭제 실행');
        e.preventDefault();
        const { target: {value}} = e;
        const {user_id} = this.state;
        await Api.wishDeleteApi(user_id, value);
        this.refreshList();
        console.log(this.state.wishList);
        alert('삭제하였습니다.');
    };

    // 주문 번호 생성
    createMerchant_uid = () =>{
        let { date } = this.state;
        const order_id = `DR_${date}`;
        console.log(order_id);
        this.setState({
            order_id,
        });
    }
    refreshList = async() => {
        const { user_id } = this.state;
        let total_price = 0;
        let food_list = [];
        const {data: wishList} = await Api.wishListApi(user_id);
        total_price = wishList.length * 5000;
        wishList.map( w => {
            food_list.push(w.food_id);
        });
        console.log(user_id);
        console.log(wishList);
        this.setState({
            wishList,
            total_price,
            food_list,
        });
    }
    // 구매하기 버튼을 눌렀을 때 동작
    requestPay = () => {
        const { user_id, order_id, food_list, total_price, type} = this.state;
        // IMP.request_pay(param, callback) 호출
        //   const { IMP } = window;
        // console.log(food_list);
        // console.log(order_id);

        IMP.init(userCode);
        IMP.request_pay({ // param
            pay_method :'card',
            merchant_uid : order_id,
            name : `${user_id} 님의 주문`,
            amount : total_price,
            buyer_name : user_id,
            buyer_tel : '01041974198',
            buyer_email: "rmsidsha@naver.com",
        }, rsp => { // callback
            if (rsp.success) {
                // 결제 성공 시 로직,
                console.log('결제 성공');
                let apiResult = Api.buyDataApi(user_id,order_id,type,food_list);
                if (apiResult) {
                    Api.wishDeleteApi(user_id);
                    this.setState({
                        food_list: []
                    });
                    // this.refreshList();
                    // 전체 찜 목록 삭제하는 것 만들기
                    // window.location.reload();
                    this.props.history.push(`/payment/result/${order_id}`);
                } else {
                    console.log('api 실패')
                }
                // this.props.history.push(`/payment/result/${order_id}`);
            } else {
            // 결제 실패 시 로직,
                console.log(rsp);
                alert('결제에 실패하였습니다 error code: ',rsp.error_code );
                this.props.history.push(`/wishlist`);
            }
        });
    }

    // componentDidUpdate(prevProps, prevState){
    //     if()
    // }
    componentDidMount(){
        // 이부분에서 리스트 가져 와야함
        // 리스트 가져오고 취소체크해서 삭제 가능하게
        // 결제 버튼 -> 결제 창
        // 취소 버튼 -> 뒤로 가기
        // http://3.34.97.97/api/pocketList 
        // key = user_id
        this.createMerchant_uid();
        const {user_id} = this.state;
        if(user_id){
            this.refreshList();
        }
    }
    // componentDidUpdate(prevProps, prevState){
    //     console.log('위시리스트 컴디업');
    //     console.log(this.state, prevState);
    //     if(this.state.user_id != prevState.user_id){
    //         this.refreshList();
    //     } else if (this.state.wishList != prevState.wishList){
    //         this.refreshList();
    //     }
    // }
    
    render(){
        const { wishList, total_price, error, user_id,type,order_id  } = this.state;
        console.log('위시리스트: ', wishList);
        const { food_list} = this.state;
        // console.log(order_id);
        // console.log(user_id);
        // console.log(type);
        // console.log(food_list);
        return (
            <WishlistPresenter 
                order_id = {order_id}
                wishList = {wishList}
                total_price = {total_price}
                user_id = {user_id}
                type = {type}
                handleCancel = {this.handleCancel}
                handlePayment = {this.handlePayment}
                handleDelete = {this.handleDelete}
                error = {error}
            />
        );
    }

}