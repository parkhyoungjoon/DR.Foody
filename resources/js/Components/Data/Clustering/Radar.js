import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {Api} from '../../api';

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end
class Radar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            productName: this.props.food_name,
            data: null,
        }
    }
    async componentDidMount(){
        
        const {productName} = this.state;
        const {data: {taste_item}} = await Api.tasteFigureApi(productName);
        this.setState({
            data: taste_item
        });
        let chart = am4core.create("Radar", am4charts.RadarChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        let chart_data = [];
        for(let i =0; i < taste_item.length; i++){
            let chart_data_data = {
                category: taste_item[i].taste_name,
                taste_count: taste_item[i].taste_count,
                taste_sum: taste_item[i].taste_sum,
                taste_rate: taste_item[i].taste_rate.toFixed(3) ,
            };
            chart_data.push(chart_data_data);
        }
        console.log("chart_data: ");
        console.log(chart_data, productName);
        chart.data = chart_data;
       

        chart.padding(20, 20, 20, 20);

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.labels.template.location = 0.5;
        categoryAxis.renderer.tooltipLocation = 0.5;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.labels.template.horizontalCenter = "left";
        valueAxis.min = 0;

        let series1 = chart.series.push(new am4charts.RadarColumnSeries());
        series1.columns.template.tooltipText = "맛 관련 단어 검출 횟수: {valueY.value}";
        series1.columns.template.width = am4core.percent(80);
        series1.name = "taste_count";
        series1.dataFields.categoryX = "category";
        series1.dataFields.valueY = "taste_count";
        series1.stacked = true;

        let series2 = chart.series.push(new am4charts.RadarColumnSeries());
        series2.columns.template.width = am4core.percent(80);
        series2.columns.template.tooltipText = "총 맛 레벨 점수: {valueY.value}";
        series2.name = "taste_sum";
        series2.dataFields.categoryX = "category";
        series2.dataFields.valueY = "taste_sum";
        series2.stacked = true;

        let series3 = chart.series.push(new am4charts.RadarColumnSeries());
        series3.columns.template.width = am4core.percent(80);
        series3.columns.template.tooltipText = "평균 맛 레벨: {valueY.value}";
        series3.name = "taste_rate";
        series3.dataFields.categoryX = "category";
        series3.dataFields.valueY = "taste_rate";
        series3.stacked = true;

        chart.seriesContainer.zIndex = -1;

        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarX.exportable = false;
        chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarY.exportable = false;

        chart.cursor = new am4charts.RadarCursor();
        chart.cursor.xAxis = categoryAxis;
        chart.cursor.fullWidthXLine = true;
        chart.cursor.lineX.strokeOpacity = 0;
        chart.cursor.lineX.fillOpacity = 0.1;
        chart.cursor.lineX.fill = am4core.color("#000000");
      chart.exporting.menu = new am4core.ExportMenu();
      chart.exporting.menu.align = "left";
      chart.exporting.menu.verticalAlign = "top";
    }
    componentWillUnmount() {
        if (this.chart) {
        this.chart.dispose();
        }
    }
    render(){
        
        return (
            <>
                <div>
                    <div id="Radar" style={{ width: "100%", height: "500px" }}></div>
                </div>
                <div style={{ padding:"50px" }} />
                
        </>
        ) 
    }
}

export default Radar;