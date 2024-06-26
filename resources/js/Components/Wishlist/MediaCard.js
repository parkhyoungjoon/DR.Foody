import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import styled from "styled-components";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    textAlign: "center",
  },
  media: {
    height: 140,
  },
});
const ButtonContainer = styled.div`
    display: flex;
    width: 20%;
`;
const Image = styled.div`
top:0;
left:0;
    width:100%;
    height: 100%;
    min-width: 90px;
    min-height: 180px;
    margin-bottom: 5px;
    &: hover {
        ${Image} {
            opacity: 0.4;
        }
    }
    background-image: url(${ props => props.bgUrl });
    border-radius: 4px;
    transition: opacity 0.2s linear;
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    `; 

const ButtonGroup = styled.div`
  width: 100%;
  background-color: white;
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

export default function MediaCard({food_id,company_name, food_name, food_photo, point, review_count, search_count,country, sex, handleDelete}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Image bgUrl={
                      food_photo
                          ? food_photo  
                          : require("../../assets/no_image.png") }
                  />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`${food_name}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {`제조사: ${company_name}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {`총 리뷰 수: ${review_count? review_count: '0'}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {`총 조회 수: ${search_count? search_count: '0'}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {`선호국가: ${country? country: '데이터가 없습니다.'}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {`선호성별: ${sex? sex: '데이터가 없습니다.'}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
            <ControlButton2 className="outline green-white" onClick={handleDelete} value={food_id}>삭제 하기</ControlButton2>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}