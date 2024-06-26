import React from 'react';
import styled from 'styled-components';
import {Api} from '../../api';

import Collapsible_force from './Collapsible_force';
import Simple_pie from './Simple_pie.js';
import Radar from './Radar';

const Container = styled.div`
    display: grid;
`;
const MoveContainer = styled.div`
left: 50%;
transform: translate(50%);
`;
const MoveA = styled.a`
    border
`;
const Title = styled.div`
    font-size: 16px;
    font: bold;
    font-color: black;
    padding-bottom: 10px;
`;
const ChartContainer = styled.div`
    grid-column-start: 0;
    grid-column-end: 1;
    padding-top: 70px;
    float: left;
`;

class Clustering extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            food_name: this.props.food_name,
            keyword_result: null,
            productNameList: null,
            // collapsible: this.props.,
            // simple_pie: null,
        }
    }
    
    render(){
        const {food_name} = this.state;
        
        return (
            <Container>
                {/* <MoveContainer>
                    <MoveA href="#text_similarity">Text 유사도 분석 결과</MoveA>
                    <span> / </span>
                    <MoveA href="#clustering_title">맛 레벨 분석</MoveA>
                </MoveContainer> */}
                <ChartContainer id="text_similarity">
                    <Title className="clustering_title">Text 유사도 분석 결과</Title>
                    <Collapsible_force 
                        food_name={food_name}
                    />
                </ChartContainer>
                <ChartContainer id="clustering_title">
                    <Title className="clustering_title">맛 레벨 분석</Title>
                    <Radar food_name={food_name}/>
                </ChartContainer>
            </Container>

        );
    }
}

export default Clustering;