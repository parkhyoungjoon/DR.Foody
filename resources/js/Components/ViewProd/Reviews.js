import React from 'react';
import styled from 'styled-components';
import { Button, Input, Modal } from 'antd';
import Rating from '@material-ui/lab/Rating';

const { TextArea } = Input;

const Container = styled.div`
    width: 70%;
    border: 1px solid black;
    position: relative;
`;
const Content = styled.div`
    width: 70%;
    margin-left: 50px;
`;

const Cover = styled.div`
    width: 100px;
    height: 100px;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
`;


const Writer = styled.span`
    font-size: 24px;
    color: black;
    font-weight: bold;
`;

const Divider = styled.span`
    margin: 0 7px;
`;

const InformationContainer = styled.div`
width: 100px;
`;

const Information = styled.span`
    font-size: 15px;
    margin-bottom: 20px;
`;

const Overview = styled.div`
    margin-top: 20px;
    font-size: 16px;
    world-spacing: 5px;
    letter-spacing: 1px;
    line-height: 1.5;
    width: 80%;
`;
// 수정 버튼 눌렀을 때
const ModefyContainer = styled.div`
    width: 50%;
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
`;
const LoggedButton = styled.button``;
const ReviewCreateContainer = styled.div`
    width: 100%;
`;
const RatingDiv = styled.div`
width: 300px;
      display: 'flex';
      alignItems: 'center';
`;

const Reviews = ({ user_id, id, review_date, review_content, review_point, user_nickname, review_id, 
    // onClick 수정 삭제 필요
    handleDlete ,    
    // modal option
     showModal  ,handleOk,
    onChange,
    country_code, logged}) => (
    // user_nickname
    // language_code
    // review_date
    // country_code
    // review_content
    // 국기
    // 버튼: 수정->수정, 삭제, 취소 | 전체 리뷰, 맛리뷰
    // 총 리뷰 수
    <Container>
            <>
            <Cover 
                bgImage = {
                    // country_code
                    require(`../../assets/korea.png`)
                    // require(country_code.toString())
                    // require("../../assets/no_image.png")
                }
            />
            <Content>
                <Writer>{user_nickname}</Writer>
                <Information>님이 리뷰를 작성하였습니다</Information>
                <Rating name="read-only" value={review_point} readOnly />
                    <Information>{`${review_date.substring(0,11)}`}</Information>
                <Overview>
                    {review_content}
                </Overview>
            </Content>
            {logged && user_id === id && (
                <>
                    <Button onClick={showModal} type="primary" value={review_id}>수정</Button>
                    <Button onClick={handleDlete} value={review_id}>삭제</Button>
                </>
            )}    
            </>
    </Container>
);

export default Reviews;