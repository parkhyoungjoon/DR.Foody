import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


const Container = styled.div`
width: 60%;
padding-top: 20px;
    :not(:last-child){
        margin-bottom: 50px;
    }
`;
const Title = styled.span`
    font-size: 16px;
    font-weight: 600;
`;
const Grid = styled.div`
    margin-top: 25px;
    display: grid;
    grid-template-rows: repeat(auto-fill, 200px); 
    grid-template-columns: repeat(auto-fill, 300px);
    grid-gap: 20px;
`;

const ProductList = ({children}) => (
    <Container>
        <Grid>{children}</Grid>
    </Container>
);

ProductList.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProductList;