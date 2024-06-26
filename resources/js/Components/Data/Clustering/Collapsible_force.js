/* Imports */
import React from 'react';
import {Api} from '../../api';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected"; 
import { Table } from 'antd';

import ExportExcel from '../Charts/ExportExcel';

/* Chart code */
// Themes begin

am4core.useTheme(am4themes_animated);


class Collapsible_force extends React.Component{
    // 부모 = 불닭볶음면
    // keyword_dict
    // 첫째 = keyword
    constructor(props){
        super(props);
        const {food_name } = this.props;
        this.state = {
            food_name,  
            keyword_data: null,
            keyword_result: null,
            productNameList: null,
            columns : [],
            table_data:[],

        }
    }
   
    async componentDidMount(){
        console.log("키워드 컴디마 시작");
    // 유사단어 생성===========================================================================
        const { food_name } = this.state;
        let chart = am4core.create("Collapsible_force", am4plugins_forceDirected.ForceDirectedTree);
        let productNameList = [food_name];
        // 키워드 가져오기
        const {data:  {keyword_dict : dict_result}} = await Api.clusteringApi(food_name);
        let dict_keyword = [food_name];
        let dict_value = [];
        // 키워드와 횟수 분류
        for (let i=0; i < dict_result.length; i++){
            dict_keyword.push(dict_result[i].keyword);
            dict_value.push(dict_result[i].number);
        }
        console.log('dict_keyword: ');
        console.log(dict_keyword);

        // 유사 단어 가져오기
        const {data:  {food_keyword: keyword_result}} = await Api.foodKeyWordApi(food_name, dict_keyword);
        console.log(food_name, productNameList);
        console.log(keyword_result);
        let keyword_data = [];
        let keyword_data_node = [];
        for (let i=0; i < keyword_result[0].surrounding.length-5; i++){
            let nodedata = {
                name : keyword_result[0].surrounding[i],
                value: 1,
            }
            keyword_data_node.push(nodedata); 
        }
        for (let i=1; i < keyword_result.length-5; i++){
            let test = null;
            let chilTest = [];
            for(let k=0; k< keyword_result[i].surrounding.length-5; k++){
                let childata = {
                    name : keyword_result[i].surrounding[k],
                    value: 1,
                }
                chilTest.push(childata); 
            }
            test = {
                name: keyword_result[i].name,
                children: chilTest,
            }
            keyword_data_node.push(test);
        }
        keyword_data = [{
            name: keyword_result[0].name, // 제품 이름
            children : keyword_data_node
        }];
        console.log("keyword_data: ");
        console.log(keyword_data);
    // 유사단어 생성===========================================================================
       
    // 테이블 생성 ============================================================================
    const columns = [
        {
          title: '기준 단어',
          dataIndex: 'name',
          width: 100,
        },
        {
          title: '유사단어(유사도)',
          dataIndex: 'i1',
          width: 139,
        },{
            title: '유사단어(유사도)',
            dataIndex: 'i2',
            width: 139,
          },{
            title: '유사단어(유사도)',
            dataIndex: 'i3',
            width: 139,
          },{
            title: '유사단어(유사도)',
            dataIndex: 'i4',
            width: 139,
          },{
            title: '유사단어(유사도)',
            dataIndex: 'i5',
            width: 139,
          },{
            title: '유사단어(유사도)',
            dataIndex: 'i6',
            width: 139,
          },{
            title: '유사단어(유사도)',
            dataIndex: 'i7',
            width: 139,
          },{
            title: '유사단어(유사도)',
            dataIndex: 'i8',
            width: 139,
          },{
            title: '유사단어(유사도)',
            dataIndex: 'i9',
            width: 139,
          },
          {
            title: '유사단어(유사도)',
            dataIndex: 'i10',
            width: 139,
          },
      ];
      
      let table_data = [];
      for (let i = 0; i < keyword_result.length; i++) {
        table_data.push({
          key: i,
          name: keyword_result[i].name,
          i1: `${keyword_result[i].surrounding[0]}(${keyword_result[i].surroundingNumber[0]})`,
          i2: `${keyword_result[i].surrounding[1]}(${keyword_result[i].surroundingNumber[1]})`,
          i3: `${keyword_result[i].surrounding[2]}(${keyword_result[i].surroundingNumber[2]})`,
          i4: `${keyword_result[i].surrounding[3]}(${keyword_result[i].surroundingNumber[3]})`,
          i5: `${keyword_result[i].surrounding[4]}(${keyword_result[i].surroundingNumber[4]})`,
          i6: `${keyword_result[i].surrounding[5]}(${keyword_result[i].surroundingNumber[5]})`,
          i7: `${keyword_result[i].surrounding[6]}(${keyword_result[i].surroundingNumber[6]})`,
          i8: `${keyword_result[i].surrounding[7]}(${keyword_result[i].surroundingNumber[7]})`,
          i9: `${keyword_result[i].surrounding[8]}(${keyword_result[i].surroundingNumber[8]})`,
          i10: `${keyword_result[i].surrounding[9]}(${keyword_result[i].surroundingNumber[9]})`,
        });
      }
// 테이블 생성 =========================================================================
    // 차트 옵션 =====================================================================
            chart.legend = new am4charts.Legend();
            
            let networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());
            
            networkSeries.data = keyword_data;
            console.log(keyword_data);
            
            networkSeries.dataFields.linkWith = "linkWith";
            networkSeries.dataFields.name = "name";
            networkSeries.dataFields.id = "name";
            networkSeries.dataFields.value = "value";
            networkSeries.dataFields.children = "children";
            
            networkSeries.nodes.template.tooltipText = "{name}";
            networkSeries.nodes.template.fillOpacity = 2;
            
            networkSeries.nodes.template.label.text = "{name}";
            networkSeries.fontSize = 16;
            networkSeries.maxLevels = 3;
            networkSeries.maxRadius = am4core.percent(5);
            networkSeries.minRadius = am4core.percent(3);
            networkSeries.manyBodyStrength = -20;
            networkSeries.nodes.template.label.hideOversized = true;
            networkSeries.nodes.template.label.truncate = true;
        
        // 차트 옵션 =====================================================================
        // 엑셀 데이터 ===================================================================
            let excel_data =  [{
                columns: ["기준 단어", "유사단어", "유사도"],
                data: []
            }]
            for(let i=0; i < keyword_result.length; i++){
                for (let k=0; k < keyword_result[i].surrounding.length; k++){
                    let setting = [];
                    setting.push(keyword_result[i].name, keyword_result[i].surrounding[k], keyword_result[i].surroundingNumber[k]);
                    excel_data[0].data.push(setting);
                }
            }
            console.log("excel_data: ",excel_data);
            
        // 엑셀 데이터 ===================================================================
        // chart.data = data;
      chart.exporting.menu = new am4core.ExportMenu();
      chart.exporting.menu.align = "left";
      chart.exporting.menu.verticalAlign = "top";
        this.setState({
            excel_data,
            columns,
            table_data,
            keyword_data,
            keyword_result,
        });
    }
    componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
      }
    render(){
        const { columns, table_data, keyword_result, excel_data} = this.state;
        return (
            <>
                <ExportExcel dataSet={excel_data}/>
                <div>
                    <div id="Collapsible_force" style={{ width: "100%", height: "500px" }}></div>
                </div>
                <div style={{ padding:"50px" }} />
                <Table columns={columns} dataSource={table_data} pagination={{ pageSize: 50 }} scroll={{ y: 500 }} />
          </>
        ) 
    }
}

export default Collapsible_force;