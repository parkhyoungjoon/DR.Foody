import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import styled from 'styled-components';

const ChartDiv = styled.div`
transform: translate(15%);
left: 25%;
padding-top: 50px;
`;

am4core.useTheme(am4themes_animated);

class XYChart extends Component {
  constructor(props){
    super(props);
    this.state = {
        third_data_result: this.props.third_data_result,
        source:  this.props.source, // false = 0리뷰, true = 1조회
        source_bool:  false, // false = 0리뷰, true = 1조회
        loading:  false, // false = 0리뷰, true = 1조회
        data: null,
    }
}
  setChart = async(third_data_result) => {
    let data = [];
    for(let i=0; i < third_data_result.data.length; i++){
      let data_data = {
        age: third_data_result.data[i].country,
        reviews: third_data_result.data[i].review_count,
        rating: third_data_result.data[i].visits,
      }
      data.push(data_data);
    }
    // Add data
    await this.setState({
      data
    });
}

  componentDidMount() { 
      const {third_data_result} = this.state;
      this.setChart(third_data_result);
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      let data = [];
      for(let i=0; i < third_data_result.data.length; i++){
      let data_data = {
        age: third_data_result.data[i].country,
        reviews: third_data_result.data[i].review_count,
        rating: third_data_result.data[i].visits,
      }
      data.push(data_data);
    }
    // Add data
     chart.data = data;
  
  // Create axes
  let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "age";
  categoryAxis.numberFormatter.numberFormat = "#";
  categoryAxis.renderer.inversed = true;
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.cellStartLocation = 0.1;
  categoryAxis.renderer.cellEndLocation = 0.9;
  
  let  valueAxis = chart.xAxes.push(new am4charts.ValueAxis()); 
  valueAxis.renderer.opposite = true;
  // #FFBC42
  // Create series
  function createSeries(field, name) {
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = field;
    series.dataFields.categoryY = "age";
    series.name = name;
    series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
    series.columns.template.height = am4core.percent(100);
    series.sequencedInterpolation = true;
  
    let valueLabel = series.bullets.push(new am4charts.LabelBullet());
    valueLabel.label.text = "{valueX}";
    valueLabel.label.horizontalCenter = "left";
    valueLabel.label.dx = 10;
    valueLabel.label.hideOversized = false;
    valueLabel.label.truncate = false;
    // valueLabel.label.fill = am4core.color("#FFBC42");
  
    let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
    categoryLabel.label.text = "{name}";
    categoryLabel.label.horizontalCenter = "right";
    categoryLabel.label.dx = -10;
    categoryLabel.label.fill = am4core.color("#fff");
    categoryLabel.label.hideOversized = false;
    categoryLabel.label.truncate = false;
  }
  createSeries("reviews", "리뷰 수");
  createSeries("rating", "평점");
  chart.exporting.menu = new am4core.ExportMenu();
      chart.exporting.menu.align = "left";
      chart.exporting.menu.verticalAlign = "top";
  }
  // componentDidUpdate(prevProps){
  //   if(prevProps.third_data_result !== this.props.third_data_result){
  //     this.setChart(this.props.third_data_result);
  //     if(this.state.data){
  //       this.chart.data = this.state.data;
  //     }
  //   }
  // }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <>
      <ChartDiv>
        <label>연령별 리뷰 정보입니다.</label>
        <div id="chartdiv" style={{ width: "70%", height: "500px" }}></div>
      </ChartDiv>
      </>
    );
  }
}

export default XYChart;