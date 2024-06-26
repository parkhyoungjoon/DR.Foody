import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
// import { Icon} from '@ant-design/icons';
import { Icon } from '@ant-design/compatible';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { param } from 'jquery';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  padding-top: 100px;
`;
const ButtonDiv = styled.div`
  position: absolute;
  padding-top: 18%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  bottom: 2rem;
  padding: 2rem;
  > .anticon {
    font-size: 10rem;
    text-align: center;
    margin-bottom: 2rem;
    color: ${props => props.colorType};
  }
  p {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 3rem;
    li {
      display: flex;
      line-height: 2;
      span:first-child {
        width: 8rem;
        color: #888;
      }
      span:last-child {
        width: calc(100% - 8rem);
        color: #333;
      }
    }
  }
  button, button:hover {
    border-color: ${props => props.colorType};
    color: ${props => props.colorType};
  }
  button:hover {
    opacity: 0.7;
  }
`;

class PaymentResult extends React.Component {
  constructor(props){
    super(props);
    const {match:{params:{order_id}}} =this.props;
    const {id} = this.props;
    this.state = {
      order_id: order_id,
      id: id,
      // order_id: "test"
    };
  }

  render(){
    const {order_id, id} = this.state;
    console.log(id);
    return (
      <Wrapper>
        <Container colorType="blue">
          <Icon type='smile' theme="filled" />
          <p>{`결제를 완료하였습니다`}</p>
          <ul>
            <li style={{fontSize: "20px"}}>
              <span>주문번호</span>
              <span>{order_id}</span>
            </li>
          </ul>
          <ButtonDiv>
            <Button size="large" onClick={() => this.props.history.push('/')}>
              <Icon type="arrow-left" />
              메인화면으로 돌아가기
            </Button>
            <Button size="large" onClick={() => this.props.history.push(`/mypage/datalist/${id}`)}>
              구매내역 확인하기
              <Icon type="arrow-right" />
            </Button>
          </ButtonDiv>
        </Container>
      </Wrapper>
    );
  }
}



export default withRouter(PaymentResult);