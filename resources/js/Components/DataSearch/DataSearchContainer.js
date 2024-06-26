import React, {Component} from 'react';
import styled from 'styled-components';
import DataProdList from './DataProdList';
import DataProduct from './DataProduct';
import Message from '../Message'
import ComplexGrid from "./ComplexGrid";
import CustomizedExpansionPanels from './ExpensionPannel';

const Container = styled.div`
    position: relative;
    
    padding-top: 100px;
`;
// Search section
const SerachContainer = styled.div`
width: 50%;
position: relative;
padding-top: 200px;
left: 71%;
transform: translate(-70%);
`;
const Form = styled.form`
width: 100%;
position: relative;
`;
const Input = styled.input`
padding: 0.5em;
  margin: 0.5em;
    all: unset;
    font-size: 22px;
    width: 48%;
    border: 1.8px solid #ff5122;
    padding: 5px;
    margin-top: 20px; 
    text-align: center;
`;
const BtnSearch = styled.button`
    
    background-color:  #ff5122;
    border: 1px solid  #ff5122;
    color: white;
    font-size: 22px;
    padding: 9px;
    padding-top: 10px;
    &: hover{
        opacity: 0.6;
    }
`;

const ResultContainer = styled.div`
    padding: 50px;
    width: 100%;
    height: 100%;
`;
const LogoImage = styled.div`
left: 50%;
transform: translate(-50%);
    position: absolute;
    display: block;
    width: 200px;
    height: 190px;
    background-size: contain;
    background-image: url(${ props => props.bgUrl });
    background-position: center center;
`;
const LogoImage2 = styled.div`
left: 50%;
top: 100%;
transform: translate(-50%);
    position: absolute;
    display: block;
    width: 700px;
    height: 280px;
    background-size: contain;
    background-image: url(${ props => props.bgUrl });
    background-position: center center;
`;



const DataSearchContainer = ({ logined, checkUser, onConfirm , handleSubmit, searchTerm, updateTerm, pastTerm, result, loading, error }) => (
        <Container>
            <LogoImage bgUrl = {require('../../assets/logo.jpg')} />
            <SerachContainer>
                <Form onSubmit={handleSubmit}>
                    <Input  value= {searchTerm} onChange={updateTerm} ></Input>
                    <BtnSearch type="submit" value="검색">검색</BtnSearch>
                </Form>
            </SerachContainer>
            <ResultContainer>
                { loading ? (
                    <LogoImage2  bgUrl = {require('../../assets/howToUse.png')}></LogoImage2>
                ) : (
                    <>
                        {result && result.length > 0 && (
                            <CustomizedExpansionPanels title={pastTerm}>
                                {result.map((c, index) => (
                                    // food_id : 제품 번호
                                    // food_name : 제품이름
                                    // food_photo : 제품사진
                                    // point: 별점 평균
                                    // review_count: 리뷰 수
                                    // search_count: 조회 수
                                    // country: 선호 국가
                                    // sex: 선호 성별
                                    <>
                                    {/* <DataProduct key={index}
                                            logined = {logined}
                                            food_id ={c.food_id} review_count ={c.review_count}
                                            food_name={c.food_name} food_photo={c.food_photo} 
                                            rating={c.point}
                                            search_count ={c.search_count} country ={c.country}
                                            sex ={c.sex}
                                            bought ={c.bought}
                                            checkUser = {checkUser}
                                            onConfirm = {onConfirm}
                                    /> */}
                                    <ComplexGrid 
                                            key={index}
                                            logined = {logined}
                                            food_id ={c.food_id} review_count ={c.review_count}
                                            food_name={c.food_name} food_photo={c.food_photo} 
                                            rating={c.point}
                                            search_count ={c.search_count} country ={c.country}
                                            sex ={c.sex}
                                            bought ={c.bought}
                                            checkUser = {checkUser}
                                            onConfirm = {onConfirm}
                                    />
                                    </>
                                ))}
                            </CustomizedExpansionPanels>
                        )}
                        { error && <Message color="#e74c3c" text={error} />}
                    </>
                )}
            </ResultContainer>
            {/* { error && <Message color="#e74c3c" text={error} />} */}
            {/* { result.length === 0  && <Message text={`Nothing Found for ${pastTerm}`} color="#FFFF00" />} */}
        </Container>
);

export default DataSearchContainer;