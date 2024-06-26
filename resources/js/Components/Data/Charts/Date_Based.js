import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Date_Based extends Component {
    constructor(props){
        super(props);
        this.state = {
            third_data_result: this.props.third_data_result,
            source:  this.props.source, // false = 0리뷰, true = 1조회
            loading:  false, // false = 0리뷰, true = 1조회
            count: 0,
        }
      }
  componentDidMount() {
      let chart = am4core.create("Date_Based", am4charts.XYChart);
    const {third_data_result } = this.state;
    let data = [];
    let count = 0;
    for(let i=0; i < third_data_result.data.length; i++ ){
        let data_data = {
          "date": third_data_result.data[i].date,
          "value": third_data_result.data[i].value,
        }
        data.push(data_data);
        count = count+third_data_result.data[i].value;
      }
    this.setState({
        count
    });
    chart.data = data;
      
      // Set input format for the dates
      chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
      
      // Create axes
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      
      // Create series
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value";
      series.dataFields.dateX = "date";
      series.tooltipText = "{value}"
      series.strokeWidth = 2;
      series.minBulletDistance = 15;
      
      // Drop-shaped tooltips
      series.tooltip.background.cornerRadius = 20;
      series.tooltip.background.strokeOpacity = 0;
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.label.minWidth = 40;
      series.tooltip.label.minHeight = 40;
      series.tooltip.label.textAlign = "middle";
      series.tooltip.label.textValign = "middle";
      
      // Make bullets grow on hover
      let bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.strokeWidth = 2;
      bullet.circle.radius = 4;
      bullet.circle.fill = am4core.color("#fff");
      
      let bullethover = bullet.states.create("hover");
      bullethover.properties.scale = 1.3;
      
      // Make a panning cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = "panXY";
      chart.cursor.xAxis = dateAxis;
      chart.cursor.snapToSeries = series;
      
      // Create vertical scrollbar and place it before the value axis
      chart.scrollbarY = new am4core.Scrollbar();
      chart.scrollbarY.parent = chart.leftAxesContainer;
      chart.scrollbarY.toBack();
      
      // Create a horizontal scrollbar with previe and place it underneath the date axis
      chart.scrollbarX = new am4charts.XYChartScrollbar();
      chart.scrollbarX.series.push(series);
      chart.scrollbarX.parent = chart.bottomAxesContainer;
      
      dateAxis.start = 0.79;
      dateAxis.keepSelection = true;
      chart.exporting.menu = new am4core.ExportMenu();
      chart.exporting.menu.align = "left";
      chart.exporting.menu.verticalAlign = "top";
      

  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
      const {count} = this.state;
    return (
      <>
        <label>기간별 추이를 확인할 수 있습니다.</label>
        <div>총 {count}건의 결과가 있습니다.</div>
        <div id="Date_Based" style={{ width: "100%", height: "500px" }}></div>
      </>
    );
  }
}

export default Date_Based;