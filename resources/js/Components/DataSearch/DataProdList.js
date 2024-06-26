import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


const Container = styled.div`
    width: 50%;
    height: 100%;
    :not(:last-child){
        margin-bottom: 50px;
    }
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    margin: 4% 0 0 0;
    background-color: green;
`;
const Title = styled.span`
    font-size: 16px;
    font-weight: 600;
`;
const Grid = styled.div`
    display: grid;
    margin-top: 35px;
    grid-gap: 20px; 
    `;
    // grid-template-rows: repeat(auto-fill, 200px); 
    // grid-template-columns: repeat(auto-fill, 300px);


const DataProdList = ({ title, children}) => (
    <Container>
        <Title>'{title}'에 관한 검사 결과</Title>
        <Grid>{children}</Grid>
    </Container>
); 

DataProdList.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default DataProdList;