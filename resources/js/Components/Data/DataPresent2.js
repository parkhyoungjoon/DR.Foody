import React from 'react';
import styled from 'styled-components';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { DatePicker } from 'antd';
import moment from 'moment';
import Clustering from './Clustering/Clustering';
import { Button } from 'antd';
import Loading from '../Loading';
// User inform
import ViewChart from './Charts/ViewChart';
import ReviewChart from './Charts/ReviewChart';

import Pie_Chart_With_Legend from './Charts/Pie_Chart_With_Legend';
import Pie_Chart_With_Legend_review from './Charts/Pie_Chart_With_Legend_review';
import Map_with_bubbles from './Charts/Map_with_bubbles';
import Date_Based from './Charts/Date_Based';

import { load } from '@amcharts/amcharts4/.internal/core/utils/Net';
import XYChart from './Charts/XYChart';
// Clustering inform

// Control Button Group
// const ButtonGroup = styled.div`
//     background-color: white;
//     display:inline;
// `;
const ButtonGroup = styled.div`
    width: 100%;
    background-color: white;
`;
const ControlButton1 = styled.button`
    background-color: ${props => props.current ? "red" : "white"};
    &.outline {
        font-weight: 700;
        position: relative;
        z-index: 3;
        background: transparent;
        background-color: ${props => props.current ? "#0464C9" : "white"};
        color: ${props => props.current ? "white" : "black"};
        font-size: 14px;
        border-color: #d3d3d3;
        border-style: solid;
        border-width: 1px;
        border-radius: 22px;
        padding: 10px 40px;
        text-transform: uppercase;
        transition: all 0.2s linear;
        a {
            text-decoration: none;
        }
    }
    &.outline:hover {
        color: white;
        background: #0464C9;
        border-color: white;
        transition: all 0.2s linear;
    }
    &.outline:active {
        border-radius: 22px;
    }
    &.green-white {
        font-weight: 700;
        color: #7dc21e;
        border-color: #7dc21e;
        background: transparent;
    }
    &.green-white:hover {
        color: white;
        background: #7dc21e;
        border-color: #7dc21e;
    }
    &.purple-white {
        font-weight: 700;
        color: #664e96;
        border-color: #664e96;
        background: transparent;
    }
    &.purple-white:hover {
        color: white;
        background: #664e96;
        border-color: #664e96;
    }
}
`;
const ControlButton2 = styled.button`
    background-color: ${props => props.current ? "tomato" : "white"};
    &.outline {
      position: relative;
      z-index: 3;
      background: transparent;
      color: #1172c4;
      font-size: 14px;
      border-color: #1172c4;
      border-style: solid;
      border-width: 1px;
      border-radius: 22px;
      padding: 10px 20px;
      text-transform: uppercase;
      transition: all 0.2s linear;
      a {
          text-decoration: none;
      }
  }
  &.outline:hover {
      color: white;
      background: #1172c4;
      border-color: white;
      transition: all 0.2s linear;
  }
  &.outline:active {
      border-radius: 22px;
  }
  &.green-white {
      font-weight: 700;
      color: #0587B3;
      border-color: #d3d3d3;
      background: transparent;
      background-color: ${props => props.current ? "#0587B3" : "white"};
      color: ${props => props.current ? "white" : "black"};
  }
  &.green-white:hover {
      color: white;
      background: #0587B3;
      border-color: #0587B3;
  }
  &.purple-white {
      font-weight: 700;
      color: #04C9C7;
      border-color: #d3d3d3;
      background: transparent;
      background-color: ${props => props.current ? "#04C9C7" : "white"};
      color: ${props => props.current ? "white" : "black"};
  }
  &.purple-white:hover {
      color: white;
      background: #04C9C7;
      border-color: #04C9C7;
  }
  &.search-color {
    font-weight: 700;
    color: #04C9C7;
    border-color: #04C9C7;
    background: transparent;
  }
  &.search-color:hover {
      color: white;
      background: #04C9C7;
      border-color: #04C9C7;
  }
}
`;


const SearchButton = styled.button`

`;

// Chart
const ChartPresenter = styled.div`

`;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 500,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 300,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 80,
    width: 80,
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
    marginLeft: 50,
  }
}));

const ShowContainer = styled.div`
    width: 100%;
    height: 70%;
    position: relative;
    padding: 100px;
    background-color: white;
`;

const ProdImage = styled.div`
    width: 200px;
    height: 200px;
    background-color: green;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
        background-image: url(${props => props.bgPoster});
`;
const ProgressDiv = styled.div`
top: 50%;
left: 50%;
    transform: translate(50% 50%);
`;

const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const currentDate = new Date(dateFormat);
const { RangePicker } = DatePicker;

function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }

export default function MediaControlCard({chart, previous_term, later_term, prod_value_result,food_id, reviewed,visible,error,
  first_condition, second_condition, third_condition, prod_search_result, loading, search_condition, all_data_result,source, third_data_result,
  handleSearch,handleCondition,handleDateChange, refreshCondition}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
      
      <>
    <ShowContainer>
        {prod_search_result && (
          <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          >
            <>
                <Card className={classes.root}>
                    <ProdImage 
                        bgPoster = {
                            prod_search_result.food_photo 
                            ?  prod_search_result.food_photo
                            : require("../../assets/no_image.png")
                        }
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                          {prod_search_result.food_name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {`전체 조회 수: ${prod_search_result.search_count}`}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {`전체 리뷰 수: ${prod_search_result.review_count}`}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {`선호 성별: ${prod_search_result.sex}`}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {`인기 국가: ${prod_search_result.country}`}
                        </Typography>
                        </CardContent>
                    </div>
                    
                </Card>
            </>
            <div className={classes.button}>
            <RangePicker onChange={handleDateChange}  format={dateFormat}  disabledDate={disabledDate} 
                            ranges={{
                                Today: [moment(), moment()],
                                'A Month': [moment().startOf('month'), moment().endOf('day')],
                                'A Week': [moment().startOf('day').subtract(7, 'days'), moment().endOf('day')],
                                'All Time': [moment([2020,0,1]), moment().endOf('day')]
                            }}
                        />
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <ControlButton1 current={ first_condition === 'user_inform' } className="outline" value='user_inform' name="first" onClick={handleCondition}>자사 서비스 분석</ControlButton1>
                <ControlButton1 current={ first_condition === 'clustering' } className="outline"  value='clustering' name="first" onClick={handleCondition}>크롤링 데이터 분석</ControlButton1>
            </ButtonGroup>
              {first_condition && first_condition==='user_inform' && (
                <>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <ControlButton2 current={ second_condition === 'views' } className="outline green-white" value='views' name="second" onClick={handleCondition}>리뷰 정보</ControlButton2>
                        <ControlButton2 current={ second_condition === 'reviews' } className="outline green-white" value='reviews' name="second" onClick={handleCondition}>조회 정보</ControlButton2>
                    </ButtonGroup>
                    {second_condition && second_condition!=='' && 
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            <ControlButton2 current={ third_condition === 'gender' } className="outline purple-white" value='gender' name="third" onClick={handleCondition}>성별</ControlButton2>
                            <ControlButton2 current={ third_condition === 'age' } className="outline purple-white" value='age' name="third" onClick={handleCondition}>연령</ControlButton2>
                            <ControlButton2 current={ third_condition === 'country' } className="outline purple-white" value='country' name="third" onClick={handleCondition}>국가</ControlButton2>
                            <ControlButton2 current={ third_condition === 'term' } className="outline purple-white" value='term' name="third" onClick={handleCondition}>기간</ControlButton2>
                        </ButtonGroup>
                    }
                </>
              )}
              <Button className="outline search-color" name='search' value='search' type='submit' onClick={handleSearch}>검색</Button>
            </div>
          </Grid>
        )}
          {loading? (
              <Loading />
          )
          :(
              <>
              {first_condition === 'user_inform' && all_data_result && visible===true && ( 
                                <>
                                    {second_condition === 'views' && reviewed===false && (
                                        <>
                                            {third_condition === "" && (
                                                <ReviewChart 
                                                    all_data_result = {all_data_result}
                                                    food_id = {food_id}
                                                    source = {source}
                                                />
                                            )}
                                            {third_condition==='gender' && third_data_result && reviewed===false && (
                                                <Pie_Chart_With_Legend_review  
                                                  third_data_result = {third_data_result}
                                                  source={source}
                                                  />
                                            )}
                                            {third_condition==='age' && third_data_result && reviewed===false && (
                                                <XYChart  
                                                  third_data_result = {third_data_result}
                                                  source={source}
                                                  />
                                            )}
                                            {third_condition==='country' && third_data_result && reviewed===false && (
                                                <Map_with_bubbles  
                                                  third_data_result = {third_data_result}
                                                  source={source}
                                                  />
                                            )}
                                            {third_condition==='term' && third_data_result && reviewed===false && (
                                                <Date_Based  
                                                  third_data_result = {third_data_result}
                                                  source={source}
                                                  />
                                            )}
                                        </>
                                    )}
                                    {/* 3차 트리 조회+성별 일 떄 */}
                                    {second_condition === 'reviews' && reviewed===true && (
                                        <>
                                            {third_condition === "" && (
                                                <ViewChart 
                                                    all_data_result = {all_data_result}
                                                    food_id = {food_id}
                                                    source = {source}
                                                />
                                            )}
                                            {third_condition==='gender' && third_data_result   && reviewed===true && (
                                                <Pie_Chart_With_Legend  
                                                  third_data_result = {third_data_result}
                                                  source={source}
                                                  />
                                            )}
                                            {third_condition==='age' && third_data_result && reviewed===true && (
                                                <XYChart  
                                                  third_data_result = {third_data_result}
                                                  source={source}
                                                  />
                                            )}
                                            {third_condition==='country' && third_data_result && reviewed===true && (
                                                <Map_with_bubbles  
                                                  third_data_result = {third_data_result}
                                                  source={source}
                                                  />
                                            )}
                                            {third_condition==='term' && third_data_result && reviewed===true && (
                                                <Date_Based  
                                                  third_data_result = {third_data_result}
                                                  source={source}
                                                  />
                                            )}
                                        </>
                                    )}
                                </>
                    )}
                            {/* 클러스터링 정보 */}
                            {first_condition === 'clustering' && visible===true && (
                                <>
                                    <Clustering food_name={prod_search_result.food_name} />
                                </>
                            )}

            </>
          )
        }
                        {error && (
                            <div>검색 결과가 없습니다.</div>
                        )}
    </ShowContainer>
    </>
  );
                          }