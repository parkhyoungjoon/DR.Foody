/* Imports */
import React from 'react';
import 'antd/dist/antd.css';
import { Table, Typography } from 'antd';
import styled from 'styled-components';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const Container = styled.div`
  display: flex; 
`;
const TableContainer = styled.div`
  padding-left: 20px;
  width: 20%; 
  height: 500px;
`;
const ChartContainer = styled.div`
background-size: cover;
`;

const { Text } = Typography;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Borrow',
    dataIndex: 'borrow',
  },
  {
    title: 'Repayment',
    dataIndex: 'repayment',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    borrow: 10,
    repayment: 33,
  },
  {
    key: '2',
    name: 'Jim Green',
    borrow: 100,
    repayment: 0,
  },
  {
    key: '3',
    name: 'Joe Black',
    borrow: 10,
    repayment: 10,
  },
  {
    key: '4',
    name: 'Jim Red',
    borrow: 75,
    repayment: 45,
  },
];
/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

class Simple_pie extends React.Component{
    // 부모 = 불닭볶음면
    // keyword_dict
    // 첫째 = keyword
    //  

    componentDidMount(){
              // Create chart instance
      let chart = am4core.create("posinega", am4charts.PieChart);

      // Add data
      chart.data = [ {
        "Name": "Positive",
        "litres": 501.9,
        "color": am4core.color("#00d2ff"),
      }, {
        "Name": "Negative",
        "litres": 301.9,
        "color": am4core.color("#EF629F"),
      }];

      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "litres";
      pieSeries.dataFields.category = "Name";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      // 색깔 적용
      pieSeries.slices.template.propertyFields.fill = "color";
      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
    }
    componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
      }
    render(){
        return (
          <>
          <Container>
            <ChartContainer>
              <label>긍정부정</label>
              <div id="posinega" style={{ width: "100%", height: "500px" }}></div>
            </ChartContainer>
            <TableContainer>

            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                summary={pageData => {
                  let totalBorrow = 0;
                  let totalRepayment = 0;

                  pageData.forEach(({ borrow, repayment }) => {
                    totalBorrow += borrow;
                    totalRepayment += repayment;
                  });

                  return (
                    <>
                      <Table.Summary.Row>
                        <Table.Summary.Cell>Total</Table.Summary.Cell>
                        <Table.Summary.Cell>
                          <Text type="danger">{totalBorrow}</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell>
                          <Text>{totalRepayment}</Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                      <Table.Summary.Row>
                        <Table.Summary.Cell>Balance</Table.Summary.Cell>
                        <Table.Summary.Cell colSpan={2}>
                          <Text type="danger">{totalBorrow - totalRepayment}</Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  );
                }}
              />
              </TableContainer>
              <TableContainer>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    bordered
                    summary={pageData => {
                      let totalBorrow = 0;
                      let totalRepayment = 0;

                      pageData.forEach(({ borrow, repayment }) => {
                        totalBorrow += borrow;
                        totalRepayment += repayment;
                      });

                      return (
                        <>
                          <Table.Summary.Row>
                            <Table.Summary.Cell>Total</Table.Summary.Cell>
                            <Table.Summary.Cell>
                              <Text type="danger">{totalBorrow}</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell>
                              <Text>{totalRepayment}</Text>
                            </Table.Summary.Cell>
                          </Table.Summary.Row>
                          <Table.Summary.Row>
                            <Table.Summary.Cell>Balance</Table.Summary.Cell>
                            <Table.Summary.Cell colSpan={2}>
                              <Text type="danger">{totalBorrow - totalRepayment}</Text>
                            </Table.Summary.Cell>
                          </Table.Summary.Row>
                        </>
                      );
                    }}
                  />
            </TableContainer>
          </Container>
          </>
        )
    }
}

export default Simple_pie;