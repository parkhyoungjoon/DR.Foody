import React from 'react';
import {BaseUrl} from '../api';
import axios from 'axios';
import moment from 'moment';
import Moment from 'react-moment';
import {Api} from '../api';
import MediaControlCard from './DataPresent2'; 
// User inform
import XYChart from './Charts/XYChart';
import Area_With_Time from './Charts/Area_With_Time';
import Rader from './Charts/Rader';
import Map_with_bubbles from './Charts/Map_with_bubbles';

import Redial from './Charts/Redial';
import SimpleColumn from './Charts/SimpleColumn';
import Pictorial_Stacked from './Charts/Pictorial_Stacked';
import Pie_Chart_With_Legend from './Charts/Pie_Chart_With_Legend';
import ExportExcel from './Charts/ExportExcel';
// Clustering inform
import Clustering from './Clustering/Clustering';

// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
// import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

export default class extends React.Component{
    // 제품에 대한 받아야 할 데이터 
    // 
    constructor(props){
        super(props);
        const test_moment = new Date();
        const {
            match:{params:{food_id}}
          } = this.props;
        this.state = {
            moment: new Date(),
            previous_term: moment().format('YYYY-MM-DD'),
            later_term: moment().format('YYYY-MM-DD'),
            prod_search_result: null,
            prod_value_result: null,
            loading: false,
            food_id: food_id,
            chart: 'chartdiv',
            
            collapsible: null,

            first_condition: "",
            second_condition: "",
            third_condition: "",

            search_condition: null,
            all_data_result: null,
            third_data_result: null,
            source: 0,
            loading: false,
            reviewed: false,

            visible: false,
            error: false,
            // // date picker
            // startDate: moment().format('YYYY-MM-DD'),
            // endDate: moment().format('YYYY-MM-DD')
        }
        this.refreshCondition = this.refreshCondition.bind(this);
        this.refreshThirdCondition = this.refreshThirdCondition.bind(this);
    }

    // 전체 데이터 받아오기
    refreshCondition = async(search_condition) => {
        console.log("refreshCondition: 실행");
        let source = 0;
        let reviewed = false;
        const sdate = search_condition.previous_term;
        const edate = search_condition.later_term;
        if(search_condition.second_condition === 'views'){
            source = 0;
            reviewed = false;
        } else if (search_condition.second_condition === 'reviews') {
            source = 1;
            reviewed = true;
        }
        const {data: all_data_result} = await Api.service_exApi(search_condition.food_id, source, sdate, edate);
        this.setState({
            all_data_result,
            source,
            reviewed,
        });
        console.log(all_data_result);
        console.log(source);
    }


    refreshThirdCondition = async(search_condition) => {
        let source = 0;
        let category = 0;
        let reviewed = false;
        const sdate = search_condition.previous_term;
        const edate = search_condition.later_term;
        if(search_condition.second_condition === 'views'){
            source = 0;
            reviewed = false;
        } else if (search_condition.second_condition === 'reviews') {
            source = 1;
            reviewed = true;
        }
        // 3차가 성별 일 때
        if(search_condition.third_condition === 'gender'){
            category = 1;
        } else if (search_condition.third_condition === 'age'){
            category = 2;
        } else if (search_condition.third_condition === 'country'){
            category = 3;
        } else if (search_condition.third_condition === 'term'){
            category = 4;
        }
        const {data: third_data_result} = await axios.post('http://3.34.97.97/api/chartMake', {
            food_id: search_condition.food_id,
            source,
            category,
            sdate,
            edate
        });
        if(third_data_result.data[0]===null){
            this.setState({
                error: true
            });
        } else {
            this.setState({
                third_data_result,
                source,
                reviewed,
                error: false,
            });

        }
        console.log('third_data_result: ', third_data_result);
        console.log('3차 트리 검색 조건 확인: ', search_condition.food_id,
        source,
        category,
        sdate,
        edate);
    }

    // 검색 동작
    handleSearch= e => {
        e.preventDefault();
        console.log('Worked Search button');
        const {previous_term,later_term, second_condition, third_condition,food_id} = this.state;
        // axios 동작 search_condition 보내기
        const search_condition = {
            previous_term,
            later_term,
            second_condition,
            third_condition,
            food_id
        };
        console.log('검색 조건 확인: ',search_condition);
        this.setState({
            loading: true
        });
        // 2차 트리 일 때 (리뷰 or 조회수만)
        // 3차 트리 일 때 (2차트리 + 3차트리)
        if(second_condition!=="" && third_condition!==""){
            this.refreshThirdCondition(search_condition);
        }   
        this.refreshCondition(search_condition);
        this.setState({
            search_condition,
        });
        setTimeout(() => {
            this.setState({
                loading: false,
                    visible: true})
              }, 2000);
    };

    // 날짜 설정
    handleDateChange = (date, dateString) => {
        
        const dateFormat = 'YYYY-MM-DD';
        this.setState({
            previous_term: dateString[0],
            later_term:dateString[1],
        });
        console.log(date, dateString);
        const {previous_term,later_term } = this.state;
        console.log("날짜 변경 확인");
        console.log(previous_term,later_term);
    }

    // 조건 설정
    // 버튼 누르면 바로 로딩 버튼은 하나만 가능하게
    handleCondition= e => {
        e.preventDefault();
        const { target : {name, value}} = e;
        console.log('name: ',name);
        this.setState({
            visible: false
        });
        if(name==='first'){
            this.setState({
                first_condition: value,
                second_condition:  "",
                third_condition: ""
            });
        } else if (name==='second'){
            this.setState({
                second_condition: value,
                third_condition: ""
            });
        } else if(name==='third'){
            this.setState({
                third_condition: value
            });
        }
        console.log('   condition: ', this.state.first_condition,this.state.second_condition,this.state.third_condition);
    };

    // key 

      componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
      }

    async componentDidMount() {
        console.log('DATA componentDidMount 실행: ');
        const { food_id } =this.state;
        console.log(food_id);
        this.setState({
            loading: true,
        });
        try {
            // food_id에 대한 정보 가져오는 api
            const {data : prod_search_result} = await Api.detailFood2Api(food_id);
            const {data : prod_value_result} = await Api.countryDataApi(food_id);;
            // 유저 정보 데이터 가져오기
            console.log("DATA food_id: ");
            console.log(prod_search_result);
            // console.log("collapsible: ");
            // console.log(collapsible);
            this.setState({
                prod_search_result,
                prod_value_result,
                loading: false,
            });
        } catch (e) {
            this.setState({
                error: "Can't find results information",
                loading: false,
            });
        }
    }

      render() {
          const {
            chart, food_id,
            previous_term, later_term,  visible, error,
            first_condition,second_condition,third_condition, search_condition, all_data_result, source, third_data_result,
            prod_search_result,prod_value_result,  loading,  reviewed} = this.state;
        return (
            // <>
            //     이걸로 감싸고
            //     chart component들을 만든 다음에 DataPresenter 밑에 같이 랜더해보기
            // </>
            <>
                <MediaControlCard 
                    chart = {chart}
                    food_id = {food_id}
                    previous_term = {previous_term} 
                    later_term = {later_term} 
                    first_condition = {first_condition}
                    second_condition = {second_condition}
                    third_condition = {third_condition}
                    prod_search_result= {prod_search_result}
                    prod_value_result= {prod_value_result}
                    search_condition= {search_condition}
                    // data
                    all_data_result= {all_data_result}
                    third_data_result= {third_data_result}
                    source= {source}
                    loading = {loading}
                    reviewed = {reviewed}
                    visible = {visible}
                    error = {error}
                    handleSearch = {this.handleSearch}
                    handleCondition = {this.handleCondition}
                    handleDateChange = {this.handleDateChange}
                    refreshCondition = {this.refreshCondition}
                />
                {/* 유저 정보 분석 */}
                
            </>
        );
      }
    }