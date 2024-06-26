import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
// am4core.useTheme(am4themes_material);

class Map_with_bubbles extends Component {
  constructor(props){
    super(props);
    this.state = {
        third_data_result: this.props.third_data_result,
        source:  this.props.source, // false = 0리뷰, true = 1조회
        loading:  false, // false = 0리뷰, true = 1조회
    }
  }
  componentDidMount() {
    const {third_data_result } = this.state;
    let chart = am4core.create("Map_with_bubbles", am4maps.MapChart);

let title = chart.titles.create();
// title.text = "[bold font-size: 20]Population of the World in 2011[/]\nsource: Gapminder";
title.textAlign = "middle";
  let data = [];
  for(let i=0; i < third_data_result.data.length; i++ ){
    let data_data = {
      "id": third_data_result.data[i].id,
      "name": third_data_result.data[i].name,
      "value": third_data_result.data[i].value,
      "color": chart.colors.getIndex(Math.floor(Math.random() * 5)),
    }
    data.push(data_data);
  }
  console.log(data);
let mapData = data;

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Create map polygon series
let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
polygonSeries.exclude = ["AQ"];
polygonSeries.useGeodata = true;
polygonSeries.nonScalingStroke = true;
polygonSeries.strokeWidth = 0.5;
polygonSeries.calculateVisualCenter = true;

let imageSeries = chart.series.push(new am4maps.MapImageSeries());
imageSeries.data = mapData;
imageSeries.dataFields.value = "value";

let imageTemplate = imageSeries.mapImages.template;
imageTemplate.nonScaling = true

let circle = imageTemplate.createChild(am4core.Circle);
circle.fillOpacity = 0.7;
circle.propertyFields.fill = "color";
circle.tooltipText = "{name}: [bold]{value}[/]";


imageSeries.heatRules.push({
  "target": circle,
  "property": "radius",
  "min": 4,
  "max": 30,
  "dataField": "value"
})

imageTemplate.adapter.add("latitude", function(latitude, target) {
  let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
  if(polygon){
    return polygon.visualLatitude;
   }
   return latitude;
})

imageTemplate.adapter.add("longitude", function(longitude, target) {
  let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
  if(polygon){
    return polygon.visualLongitude;
   }
   return longitude;
})


  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <>
        <label>지역별 총 리뷰수를 볼 수 있습니다.</label>
        <div id="Map_with_bubbles" style={{ width: "100%", height: "500px" }}></div>
      </>
    );
  }
}

export default Map_with_bubbles;