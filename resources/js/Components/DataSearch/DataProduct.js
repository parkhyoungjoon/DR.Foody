import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";


const Container = styled.div `
    width: 500px;
    height: 200px;
    position: relative;
    z-index: 1;
    float: left;
`;

const Image = styled.div`
    position: absolute;
    width:30%;
    height: 100%;
    max-width: 200px;
    max-height: 300px;
    margin-bottom: 5px;
    &: hover {
        ${Image} {
            opacity: 0.4;
        }
    }
    background-image: url(${ props => props.bgUrl });
    border-radius: 4px;
    background-size: cover;
    transition: opacity 0.2s linear;
    resize: both;
    
    `; 
    // background-position: center center;zx
// position: relative;
const ImageContainer = styled.div`
    width: 50%;
    height: 50%;
    margin-bottom: 5px;
    &: hover {
        ${Image} {
            opacity: 0.4;
        }
    }
`;

const InformationContainer = styled.div`
    width: 50%;
    margin-left: 50px;
`;
const Title = styled.span`
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 3px;
    display: block;
`;
const Rating = styled.div`
    bottom: 5px;
    right: 5px;
    text-shadow: -1px 0 #000000, 0 1px #000000, 1px 0 #000000, 0 -1px #000000;
    transition: opacity 0.2s linear;
`;

const Inform = styled.span`
    font-size: 10px;
    
`;

const ContainerButton = styled.div`
    border: 0;
    outline: 0;
    background-color: white;
`;
const Button = styled.button`
`;
const BuyContainer = styled.div`
    display: flex;
    background-color: pink;
    width: 20%;
`;
const TextDiv = styled.div`

`;

// key={index}
// food_id ={c.food_id} review_count ={c.review_count}
// food_name={c.food_name} food_photo={c.food_photo} 
// rating={c.point}
// search_count ={c.search_count} country ={c.country}
// sex ={c.sex}
// food_id로 고치기
const DataProduct = ({food_id, food_name, food_photo, rating, review_count, search_count, country, sex, onConfirm, checkUser, logined, bought}) => (
            // 로그인 했는지 확인하고 사용자의 구매 목록에 있는지 확인 후 
            // 구매 목록에 있으면 그냥 볼 수 있고 and 구매, 찜 버튼 사라짐
            // 없으면 구매해야한다, 찜 버튼 생성
            <>
            {!logined
            ? (
                // 로그인이 되어 있지 않을 때
                <ContainerButton>
                    <Container onClick={checkUser}>
                        <Image bgUrl={
                            food_photo
                                ? food_photo  
                                : require("./no_image.png") }
                        />
                        <InformationContainer>
                            <Title>{`제품명: ${food_name}`}</Title>
                            <Inform>{`총 리뷰 수: ${review_count}`}</Inform>
                            <Inform>{`총 조회 수: ${search_count}`}</Inform>
                            <Inform>{`선호국가 : ${country}`}</Inform>
                            <Inform>{`선호성별: ${sex}`}</Inform>
                        </InformationContainer>
                    </Container>
                    <BuyContainer onClick={checkUser}>
                        <TextDiv>5ooo￥</TextDiv>
                        <Button>구매</Button>
                        <Button>찜</Button>
                    </BuyContainer>
                </ContainerButton>
            )
            : (
                // 로그인이 되어 있을 때
                <>
                <ContainerButton>
                    <Container onClick={onConfirm} value={food_id} name='buy'>
                        <Image bgUrl={
                            food_photo
                                ? food_photo  
                                : require("./no_image.png") }
                        />
                        <InformationContainer>
                            <Title>{`제품명: ${food_name}`}</Title>
                            <Inform>{`총 리뷰 수: ${review_count}`}</Inform>
                            <Inform>{`총 조회 수: ${search_count}`}</Inform>
                            <Inform>{`선호국가 : ${country}`}</Inform>
                            <Inform>{`선호성별: ${sex}`}</Inform>
                        </InformationContainer>
                    </Container>
                    {bought
                        ?(
                            <Link to={`/data/${food_id}`} >
                                <BuyContainer>
                                    <Button>데이터 확인</Button>
                                </BuyContainer>
                            </Link>
                        )
                        :(
                            <BuyContainer>
                                <TextDiv>5ooo￥</TextDiv>
                                <Button onClick={onConfirm} value={food_id} name='buy'>구매</Button>
                                <Button onClick={onConfirm} value={food_id} name='wish'>찜</Button>
                            </BuyContainer>
                        )
                    }
                    </ContainerButton>
                </>
            )
            // 구매 목록에 있을 때도 하나 더
            // <Link to={`/data/${food_id}`}>
            //             <Container>
            //                 <Image bgUrl={
            //                     food_photo
            //                         ? food_photo  
            //                         : require("./no_image.png") }
            //                 />
            //                 <InformationContainer>
            //                     <Title>{`제품명: ${food_name}`}</Title>
            //                     <Inform>{`총 리뷰 수: ${review_count}`}</Inform>
            //                     <Inform>{`총 조회 수: ${search_count}`}</Inform>
            //                     <Inform>{`선호국가 : ${country}`}</Inform>
            //                     <Inform>{`선호성별: ${sex}`}</Inform>
            //                 </InformationContainer>
            //             </Container>
            //         </Link>
            }
            
            </>
);

DataProduct.prototype = {
    // id: PropTypes.number.isRequired,
    food_id: PropTypes.number,
    food_photo: PropTypes.string,
    food_name: PropTypes.string.isRequired,
    rating: PropTypes.number,
    review_count: PropTypes.number,
    search_count: PropTypes.number,
    country: PropTypes.string,
    sex: PropTypes.string,
};

export default DataProduct;
