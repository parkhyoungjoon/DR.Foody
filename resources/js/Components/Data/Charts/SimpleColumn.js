import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

class SimpleColumn extends React.Component{
    state = {
      value: this.props.prod_value_result,
    }
    componentDidMount(){

        let chart = am4core.create("chartdiv", am4charts.XYChart);
        
        // Add data
        chart.data = this.state.value.slice(0, 7);
        // [{
        //   "country": "USA",
        //   "visits": 2025
        // }, {
        //   "country": "China",
        //   "visits": 1882
        // }, {
        //   "country": "Japan",
        //   "visits": 1809
        // }, {
        //   "country": "Germany",
        //   "visits": 1322
        // }, {
        //   "country": "UK",
        //   "visits": 1122
        // }, {
        //   "country": "France",
        //   "visits": 1114
        // }];
        // 나라, 수치 다 보내고 상위 몇개만 그래프로 나머지는 text
        // Create axes
        
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country_name";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        
        categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
          if (target.dataItem && target.dataItem.index & 2 == 2) {
            return dy + 25;
          }
          return dy;
        });
        
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        
        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "count";
        series.dataFields.categoryX = "country_name";
        series.name = "Count";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;
        
        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
    }
    componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
      }
    
      render() {
        return (
          <>
            <label>SimpleColumn</label>
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
          </>
        );
      }
    }
    export default SimpleColumn;
// Create chart instance
