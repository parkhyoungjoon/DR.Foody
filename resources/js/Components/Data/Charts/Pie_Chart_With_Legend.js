import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import styled from 'styled-components';
import Rating from '@material-ui/lab/Rating';

const ChartDiv = styled.div`
  left: 50%;
  transform: translate(30%);
`;
const PointDiv = styled.div`
  position absolute;
`;
am4core.useTheme(am4themes_animated);

class Pie_Chart_With_Legend extends Component {
  constructor(props){
    super(props);
    this.state = {
        third_data_result: this.props.third_data_result,
        source:  this.props.source, // false = 0리뷰, true = 1조회
        loading:  false, // false = 0리뷰, true = 1조회
    }
}
  componentDidMount() {
    this.setState({
      loading: true
    });
      const {third_data_result, source} = this.state;
      console.log('파이차티 third_data_result: ', third_data_result);
      // Create chart instance
      let chart = am4core.create("Pie_Chart_With_Legend", am4charts.PieChart);
      
      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "litres";
      pieSeries.dataFields.category = "country";

      // Let's cut a hole in our Pie chart the size of 30% the radius
      chart.innerRadius = am4core.percent(30);

      // Put a thick white border around each Slice
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      pieSeries.slices.template
        // change the cursor on hover to make it apparent the object can be interacted with
        .cursorOverStyle = [
          {
            "property": "cursor",
            "value": "pointer"
          }
        ];

      pieSeries.alignLabels = false;
      pieSeries.labels.template.bent = true;
      pieSeries.labels.template.radius = 3;
      pieSeries.labels.template.padding(0,0,0,0);

      pieSeries.ticks.template.disabled = true;

      // Create a base filter effect (as if it's not there) for the hover to return to
      let shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
      shadow.opacity = 0;

      // Create hover state
      let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

      // Slightly shift the shadow and make it more prominent on hover
      let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
      hoverShadow.opacity = 0.7;
      hoverShadow.blur = 5;
      pieSeries.slices.template.propertyFields.fill = "color";
      // Add a legend
      chart.legend = new am4charts.Legend();

      // 차트 데이터 삽입
      // #F7CAC9
// #92A8D1
      // 리뷰 차트
      let data = [];
      // 조회 차트
      data = [{
        "country" : third_data_result.data[0].country,
        "litres" : third_data_result.data[0].litres,
        "color": am4core.color("#92A8D1"),
      },
      {
        "country" : third_data_result.data[1].country,
        "litres" : third_data_result.data[1].litres,
        "color": am4core.color("#F7CAC9"),
      }];
      this.setState({
        loading: false
      });
      console.log('파이차트 data: ', data);
      chart.data = data;
      chart.exporting.menu = new am4core.ExportMenu();
      chart.exporting.menu.align = "left";
      chart.exporting.menu.verticalAlign = "top";

}

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps.third_data_result !== this.props.third_data_result){
        this.setState({
          third_data_result: this.props.third_data_result,
        });
    } 
  }

  render() {
    const {loading} = this.state;
    return (
        <>
          <ChartDiv>
              <div style={{ fontSize: "20px", paddingTop: "30px" }}>성별 조회수 정보입니다.</div>
              <div id="Pie_Chart_With_Legend" style={{ width: "50%", height: "500px" }}></div>
          </ChartDiv>
        </>
     
    );
  }
}

export default Pie_Chart_With_Legend;