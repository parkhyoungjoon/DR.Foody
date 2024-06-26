import React from 'react';
import { withRouter } from 'react-router-dom';
import api, { Api } from '../api';
import styled from 'styled-components';

const Container = styled.div`
    padding-top: 20px;
    left: 50%;
    top: 50%;
    transform: translate(-50% -50%);
`;
const Div = styled.div`
    padding-top: 10px;
`;

class PaymentTest extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user_id: window.sessionStorage.getItem('id'),
            food_list: [], // => wish list에 있는 food_id 들임
            order_id:"",
            total_price:0,
            type:"kakaopay",
            date: new Date().getTime(),
        }
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

    // 구매하기 버튼을 눌렀을 때 동작
    requestPay = () => {
        const { user_id, order_id, food_list, total_price, type} = this.state;
        // IMP.request_pay(param, callback) 호출
        //   const { IMP } = window;
        const userCode = 'imp81806721';
        IMP.init(userCode);
      IMP.request_pay({ // param
          pay_method :'card',
          merchant_uid : 'TestOrder0002',
          name : '데이터 구매 test',
          amount : 100,
          buyer_name : window.sessionStorage.getItem('id'),
          buyer_tel : '01041974198',
          buyer_email: "rmsidsha@naver.com",
          escrow:'true',
      }, rsp => { // callback
        if (rsp.success) {
          // 결제 성공 시 로직,
          console.log('결제 성공');
          Api.buyDataApi(user_id,
            order_id,
            price,
            type,
            date);

          this.props.history.push('/data/1');
        } else {
          // 결제 실패 시 로직,
          console.log(rsp);
        }
      });
    }

    componentDidMount(){
        this.createMerchant_uid();   
    }
    render() {
        const { user_id, order_id, total_price,type} = this.state;
      return (
        <>
        <Container>
          <div>결제 진행중입니다.</div>
        </Container>
        </>
      );
    }
  }

  export default withRouter(PaymentTest);