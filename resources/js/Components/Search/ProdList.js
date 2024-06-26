import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


const Container = styled.div`
width: 100%;
    :not(:last-child){
        margin-bottom: 50px;
    }
    padding-top: 300px;
height: 100vh;

`;
const Title = styled.span`

    margin: 60px;
    font-size: 22px;
    font-weight: 600;
`;
const Grid = styled.div`
    display: grid;
    margin-top: 40px;
    grid-template-columns: 1fr 1fr 1fr;

    grid-gap: 30px;
    height: 300px;
`;


const ProdList = ({ title, children}) => (
    <Container>
        <Title>'{title}'에 관한 검사 결과</Title>
        <Grid>{children}</Grid>
    </Container>
); 

ProdList.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProdList;