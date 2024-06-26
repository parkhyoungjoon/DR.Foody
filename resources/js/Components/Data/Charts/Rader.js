import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Rader extends Component {
  componentDidMount() {
    
    let chart = am4core.create("Rader", am4charts.RadarChart);

/* Add data */
chart.data = [{
  "country": "Lithuania",
  "litres": 501
}, {
  "country": "Czechia",
  "litres": 301
}, {
  "country": "Ireland",
  "litres": 266
}, {
  "country": "Germany",
  "litres": 165
}, {
  "country": "Australia",
  "litres": 139
}, {
  "country": "Austria",
  "litres": 336
}, {
  "country": "UK",
  "litres": 290
}, {
  "country": "Belgium",
  "litres": 325
}, {
  "country": "The Netherlands",
  "litres": 40
}];

/* Create axes */
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "country";

let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2);
valueAxis.renderer.axisFills.template.fillOpacity = 0.05;

/* Create and configure series */
let series = chart.series.push(new am4charts.RadarSeries());
series.dataFields.valueY = "litres";
series.dataFields.categoryX = "country";
series.name = "Sales";
series.strokeWidth = 3;
}

  

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <>
        <label>Rader</label>
        <div id="Rader" style={{ width: "100%", height: "500px" }}></div>
      </>
    );
  }
}

export default Rader;