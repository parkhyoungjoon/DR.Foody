import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div `

`;


const Image = styled.div`
height: 180px;
border-radius: 4px;
background-size: cover;
background-image: url(${ props => props.bgUrl });
    background-position: center center;
    transition: opacity 0.2s linear;
`; 

const Rating = styled.div`
    bottom: 5px;
    position: absolute;
    right: 5px;
    opacity: 0;
    text-shadow: -1px 0 #000000, 0 1px #000000, 1px 0 #000000, 0 -1px #000000;
    transition: opacity 0.2s linear;
`;

const ImageContainer = styled.div`
    margin-bottom: 5px;
    position: relative;
    &: hover {
        ${Image} {
            opacity: 0.4;
        }
        ${Rating} {
            opacity: 1;
        }
    }
`;

const Title = styled.span`
    display: block;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 3px;
`;

const Year = styled.span`
    font-size: 10px;
`;


const Product = ({food_id,company_name, food_name, food_photo, point, review_count, search_count,country, sex}) => (
    <Link to={`/data/${food_id}`}>
        <Container>
            <ImageContainer>
                <Image bgUrl={
                   food_photo
                   ? food_photo  
                   : require("../../../assets/no_image.png") }
                />
                <Rating>
                    <span role="img" aria-label="rating">
                        ⭐
                    </span>{" "}
                    {point}/10
                </Rating>
            </ImageContainer>
            <Title>{food_name.length <= 18 ? food_name : `${food_name.substring(0,18)}...`}</Title>
            <Year>{company_name}</Year>
        </Container>
    </Link>
);

// Product.prototype = {
//     id: PropTypes.number.isRequired,
//     imageUrl: PropTypes.string,
//     title: PropTypes.string.isRequired,
//     rating: PropTypes.number,
//     year: PropTypes.string,
//     isMovie: PropTypes.bool
// };

export default Product;


// 6.5