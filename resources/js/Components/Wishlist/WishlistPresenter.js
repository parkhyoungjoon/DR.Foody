import React from 'react';
import styled from 'styled-components';
import Message from '../Message';
import ProductList from './ProductList';
import Product from './Product';
import MediaCard from './MediaCard';

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 100px;
    padding-bottom: 50px;
    
    transform: translate(20%);
    `;
    // padding-left: 100px;
const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;
const CartImage = styled.div`
position:absolute;
    width: 50px;
    height: 50px;
    background-size: cover;
    background-image: url(${ props => props.bgUrl });
    background-position: center center;
`;
const Text = styled.span`
    position:absolute;
    font-size: 45px;
    margin-left: 50px;
`;
const Border = styled.div`
width: 60%;
height: 100%;
border-bottom: 5px solid;
padding-top: 4%;
`;
const Button = styled.button``;
const ResultContainer = styled.div`
    padding-top: 10px;    
    
`;
const ButtonGroup = styled.div`
  width: 100%;
  background-color: white;
`;

const ControlButton2 = styled.button`
    background-color: ${props => props.current ? "tomato" : "white"};
    &.outline {
      position: relative;
      z-index: 3;
      background: transparent;
      color: #1172c4;
      font-size: 14px;
      border-color: #1172c4;
      border-style: solid;
      border-width: 1px;
      border-radius: 22px;
      padding: 10px 40px;
      text-transform: uppercase;
      transition: all 0.2s linear;
      a {
          text-decoration: none;
      }
  }
  &.outline:hover {
      color: white;
      background: #1172c4;
      border-color: white;
      transition: all 0.2s linear;
  }
  &.outline:active {
      border-radius: 22px;
  }
  &.green-white {
      font-weight: 700;
      color: #0587B3;
      border-color: #d3d3d3;
      background: transparent;
      background-color: ${props => props.current ? "#0587B3" : "white"};
      color: ${props => props.current ? "white" : "black"};
  }
  &.green-white:hover {
      color: white;
      background: #0587B3;
      border-color: #0587B3;
  }
  &.purple-white {
      font-weight: 700;
      color: #04C9C7;
      border-color: #d3d3d3;
      background: transparent;
      background-color: ${props => props.current ? "#04C9C7" : "white"};
      color: ${props => props.current ? "white" : "black"};
  }
  &.purple-white:hover {
      color: white;
      background: #04C9C7;
      border-color: #04C9C7;
  }
  &.search-color {
    font-weight: 700;
    color: #04C9C7;
    border-color: #04C9C7;
    background: transparent;
  }
  &.search-color:hover {
      color: white;
      background: #04C9C7;
      border-color: #04C9C7;
  }
}
`;
const Div = styled.div`
padding-bottom: 10px;
`;
// "food_id": 1,
//         "company_name": "(주)농심",
//         "food_name": "신라면",
//         "food_photo": "http://image.nongshim.com/non/pro/03_product.jpg",
//         "point": 5,
//         "review_count": 2,
//         "search_count": 661,
//         "company": null,
//         "country": "대한민국",
//         "sex": "남자"
 
const WishlistPresenter = ({wishList , handleCancel, handlePayment, handleDelete, total_price, user_id, type, order_id,  error}) =>(
    <Container>
        <ImageContainer>
            <CartImage bgUrl = {require('../../assets/cart.png')} />
            <Text>데이터 구매 장바구니</Text>
        </ImageContainer>
        <Border />
        {wishList && wishList.length > 0? 
            (
                <ProductList>
                    {wishList.map( (w, index)=> (
                        <MediaCard
                            key= {index}
                            handleDelete = {handleDelete}
                            food_id = {w.food_id}
                            company_name = {w.company_name}
                            food_name = {w.food_name}
                            food_photo = {w.food_photo}
                            point = {w.point}
                            review_count = {w.review_count}
                            search_count = {w.search_count}
                            country = {w.country}
                            sex = {w.sex}
                        />
                    ))}
                </ProductList>
            )
        : (
            <Message color="#e74c3c" text="결과를 찾을 수 없습니다." />
        )
    }
    {/* 결제 화면 */}
    <Border />
    <ResultContainer>
            <Div>주문자: {user_id}</Div>
            <Div>주문번호: {order_id}</Div>
            <Div>결제 방식: {type}</Div>
            <Div>총 결제 금액: {total_price}</Div>
    </ResultContainer>
    <ButtonGroup color="primary" aria-label="outlined primary button group">
        <ControlButton2 className="outline green-white" onClick={handlePayment}>결제하기</ControlButton2>
        <ControlButton2 className="outline green-white" onClick={handleCancel}>취소하기</ControlButton2>
    </ButtonGroup>
        {/* <ProductList>
            wishList.map(product)
        </ProductList> */}
        {/* check로 만들어야함 
            value or name 받아서 axios로 제거도 가능하게
        */}
    </Container>
);

export default WishlistPresenter;