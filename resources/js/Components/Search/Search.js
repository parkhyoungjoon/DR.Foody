import React, {Component} from 'react';
import styled from 'styled-components';
import Rank from './Rank';
import axios from 'axios';
import SerachPresenter from './SearchPresenter';

class Search extends Component {
    state = {
            searchTerm: "",
            pastTerm: "",
            result: null,
            loading: true,
            // result: name, materials, photo, company 등 DB 내용
            error: null
        }
    
     // 검색어를 입력 하였을 때 빈칸인지 확인하고 검색 실행
     handleSubmit = e => {
        e.preventDefault();
        console.log("submit");
        const { searchTerm, pastTerm } = this.state;
        if(searchTerm !== "") {
            this.searchByTerm();
            this.setState({
                pastTerm: searchTerm
            });
        }
    };

    updateTerm = e => {
       const { target: { value } } = e;
       console.log(value);
        this.setState({
            searchTerm: value
        });

    };

    searchByTerm = async() => { 
    // async() =>{
        const { searchTerm } = this.state;
        this.setState({ loading: true});
        console.log('검색 작동');
        try {
            const {data : result} = 
                await axios.get(`http://3.34.97.97/api/searchFood/${searchTerm}`);
            this.setState({
                result
            });
            console.log(this.state.result);
        } catch {
            this.setState({ error: "Can't search"});
        } finally {
            this.setState({ loading: false});
        }
    }
    
    // update() {
    //   const { index, items } = this.state;
    //   const { history } = this.props;
  
    //   storage(index).then((res) => {
    //     this.setState({
    //       index: res.next,
    //       items: items.concat(res.pokemons),
    //     }, () => {
    //       history.replace(undefined, { ...this.state });
    //     });
    //   });
    // }

    // componentDidMount() {
    //     const { history, location } = this.props;
    //     if (!location.state) {
    //       this.update();
    //     } else {
    //       this.setState({ ...location.state });
    //       history.replace(undefined, undefined);
    //     }
    //   }
    
    
    render(){
        const {searchTerm, pastTerm, result, loading, error } = this.state;
        return (
            <SerachPresenter
                searchTerm={searchTerm}
                pastTerm={pastTerm}
                result={result}
                loading={loading}
                error={error}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
            />
        );
    }
     
}

export default Search;