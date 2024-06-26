import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '100%',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));
const Image = styled.div`
    position: absolute;
    width:100%;
    height: 100%;
    max-width: 200px;
    max-height: 300px;
    &: hover {
        ${Image} {
            opacity: 0.4;
        }
    }
    background-image: url(${ props => props.bgUrl });
    border-radius: 4px;
    background-size: cover;
    transition: opacity 0.2s linear;
    resize: both;
    
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
      padding: 10px 40px;
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
    const BuyContainer = styled.div`
    display: flex;
    background-color: pink;
    width: 20%;
    `;
export default function ComplexGrid({food_id, food_name, food_photo, rating, review_count, search_count, country, sex, onConfirm, checkUser, logined, bought}) {
          const classes = useStyles();
            // 로그인 했는지 확인하고 사용자의 구매 목록에 있는지 확인 후 
            // 구매 목록에 있으면 그냥 볼 수 있고 and 구매, 찜 버튼 사라짐
            // 없으면 구매해야한다, 찜 버튼 생성
            
  return (
            <>
            {!logined
            ? (
                // 로그인이 되어 있지 않을 때
                <div className={classes.root}>
                  <Paper className={classes.paper}>
                    <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={2}>
                      <Grid item onClick={checkUser}>
                        <ButtonBase className={classes.image}>
                          <Image bgUrl={
                                        food_photo
                                            ? food_photo  
                                            : require("./no_image.png") }
                                    />
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="row" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                              {`제품명: ${food_name}`}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              {`총 리뷰 수:${review_count? review_count: '0'}`}
                              <span> / </span>
                              {`총 조회 수:${search_count? search_count: '0'}`}
                              <span> / </span>
                              {`선호국가 :${country? country: '데이터가 없습니다'}`}
                              <span> / </span>
                              {`선호성별:${sex? sex: '데이터가 없습니다'}`}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                            <Typography variant="body2" style={{ cursor: 'pointer' }} onClick={checkUser}>
                              <ControlButton2 className="outline green-white">구매</ControlButton2>
                              <ControlButton1 className="outline">찜</ControlButton1>
                            </Typography>
                            </Typography>
                          </Grid>
                          <Grid item>
                            
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1">
                          5ooo￥
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </div>
            ) : (
                // 로그인이 되어 있을 때
                <>
                <div className={classes.root}>
                  <Paper className={classes.paper}>
                    <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={2}>
                      <Grid item onClick={checkUser}>
                        <ButtonBase className={classes.image}>
                          <Image bgUrl={
                                        food_photo
                                            ? food_photo  
                                            : require("./no_image.png") }
                                    />
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="row" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                              {`제품명: ${food_name}`}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                            {`총 리뷰 수:${review_count? review_count: '0'}`}
                              <span> / </span>
                              {`총 조회 수:${search_count? search_count: '0'}`}
                              <span> / </span>
                              {`선호국가 :${country? country: '데이터가 없습니다'}`}
                              <span> / </span>
                              {`선호성별:${sex? sex: '데이터가 없습니다'}`}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {bought
                                  ?(
                                      <Link to={`/data/${food_id}`} >
                                              <ControlButton1 className="outline" variant="contained">데이터 확인</ControlButton1>
                                      </Link>
                                  )
                                  :(
                              <Grid item>
                                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                  {/* <Button variant="contained">구매</Button>
                                  <Button variant="contained">찜</Button> */}
                                  <ControlButton2 className="outline green-white" onClick={onConfirm} value={food_id} name='buy'  variant="contained">구매</ControlButton2>
                                  <ControlButton1 className="outline" onClick={onConfirm} value={food_id} name='wish' variant="contained">찜</ControlButton1>
                                </Typography>
                              </Grid>
                              )
                            }
                            </Typography>
                          </Grid>
                          
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1">
                          5ooo￥
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </div>                
                </>
              )
          }  
      </>
  );
}
