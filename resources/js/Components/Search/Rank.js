import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

//Rank section
const RankContainer = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    padding-top: 300px;
    margin-left:34.7%;
`;
const RankCardSt = styled.div`
    width: 30%;
    height: 100%;
    flex:1;
    margin: 0 auto;
    background-color: #ff5122;
    
    box-shadow: 2px 3px 3px 2px gray;
    
    text-align: center;
    padding-top: 10px;
    
    font-size: 15px;
    
    `;
    // border: 6px ridge #ff5722;
//border-radius: 10px 10px 10px 10px;
const RankListSt = styled.ul`
    width: 100%;
    height: 100%;
    list-style: none;
    display: block;
    
    text-align: center;
    
    padding-top: 10px;
    font-size: 20px;
    background-color: white;
    `;
    // border-top: 1px solid gray;
const RankTitle = styled.h1`
    font-size: bold;
    color : white;
    font-size: 15px;
    padding-bottom:10px;
    
`;
const RankItem = styled.li`
    font-size: 20px;
    padding-top: 5px;
    padding-bottom: 15px;
    font-weight: bold;
`;


const items = [
    {   
        category: '인기 검색 제품',
        prod: ['신라면', '불닭볶음면', '자가비', '홍초', '마켓오']
    }
];
class RankCard extends Component {
    render(){
        const {prod} = this.props.prod
        // console.log(prod);
        return (
            <RankCardSt>
                <RankTitle>{this.props.category}</RankTitle>

                {this.props.prod.map((p, i)=>{
                    return <RnakList key={i} food_code={i} prod={p} />
                })}
            </RankCardSt>
        );
    }
}
class RnakList extends Component {
    state = {
        food_code: this.props.food_code,
    }
    render(){
        const {food_code} = this.state;
        return (
            <Link to={`/searchProduct/${food_code+1}`}>
                <RankListSt>
                    <RankItem key={this.key}>{this.props.prod}</RankItem>
                </RankListSt>
            </Link>
        );
    }
}
class Rank extends Component {
 render(){
    return (
            <RankContainer>
                {items.map((i, index) => {
                    return <RankCard key={index} category={i.category} prod={i.prod} />
                })}
            </RankContainer>
    );
    }
}

export default Rank;