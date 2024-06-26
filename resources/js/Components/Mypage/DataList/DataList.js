import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {Api} from '../../api';
import DataListPresenter from './DataListPresenter';

export default class extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user_id: window.sessionStorage.getItem('id'),
            bought_list: null,
            error: '',
            
        }
    }
    async componentDidMount(){
        // 구매 내역 확인하는 api
        const {user_id} = this.state;
        console.log('구매목록 어싱크');
        try {
            const {data: bought_list} = await Api.myDataApi(user_id);
            this.setState({
                bought_list
            });
            console.log(bought_list);
        } catch {
            this.setState({
                error: "데이터를 받아오지 못했습니다."
            });
        }
    }
    render() {
        const {bought_list} = this.state;
        console.log('구매목록 랜더');
        console.log('bought_list: ', bought_list);
        return(
                <DataListPresenter 
                bought_list = {bought_list}
                />
            );
    }
}