import React, { Component } from 'react'
import axios from 'axios'
import ProductPresenter from './ProductPresenter'
import WordCloud from './WordCloud';

export default class extends Component {
  constructor(props) {
    super(props)
    // const {location: {pathname}} = props;
    const {
      match:{params:{food_code}}
    } = this.props;
    this.state = {
      // result: null,
      result: null,
      review_result: null,
      review_count: 0,
      logged: false,
      loading: true,
      error: "Can't find movies information",
      test: '',
      food_code:food_code,
      user_id : window.sessionStorage.getItem('user_id'),
      id: window.sessionStorage.getItem('id'),
    }
    this.getReviewList = this.getReviewList.bind(this);
    // this.handleModify = this.handleModify.bind(this);
    // this.handleCreate = this.handleCreate.bind(this);
    // this.handleDlete = this.handleDlete.bind(this);
    // result:{'food_name': 'test',
    // 'food_photo': null,
    // 'food_rating': 10,
    // 'material': 'test'},
  }
  // food_id: 1,
  // company_name: "(주)농심",
  // food_name: "신라면",
  // food_photo: "http://image.nongshim.com/non/pro/03_product.jpg",
  // point: 4,
  // review_count: 2,
  // search_count: 7,
  // company: null,
  // country: "대한민국",
  // sex: "여자"
  getReviewList = async() => {
    const {food_code} = this.state;
    let review_result = null;
    let review_count = 0;
    let review_country_photo = "";
    ({data : {review: review_result}} = await axios.post(`http://3.34.97.97/api/app/reviewList`,
        {
          food_id: food_code,
          page: 1,
        }
      ));
      console.log("review_result: ");
      console.log(review_result);
      review_count = review_result.length;
      // 국가 이미지 설정하는 부분
      // E:\캡스톤\drfoody\resources\js\assets\usa.png
      let base = "E:/캡스톤/drfoody/resources/js/assets/";
      // let base = "../../assets/";
      let country = "";
      review_result.map( (r, index) => {
        switch(r.country_code){
          case 410:
            country = 'korea.png';
            break;
          case 392:
            country  = 'japan.png';
            break;
          case 840:
            country  = 'usa.png';
            break;
        }
        // review_result[index].country_code = `${base}${country}`;
        review_result[index].country_code = `${base}${country}`;
      });
      console.log("review_result.country_code: ");
      console.log(review_result[0].country_code);
      this.setState({
        review_count,
        review_result,
      });
  }
  async componentDidMount() {
    
    console.log('componentDidMount 실행: ');
    // const props_user_id =this.props.id;
    // console.log(`user_id: ${user_id}, ${props_user_id}`);

    // jwt 토큰을 통해 유저 정보를 가져 옴
    // 근데 세션에 id가 저장되어 있어서 window.sessionStorage.getItem('id')로 그냥해도 됨
    // // db에서 정보 가져 오고
   
    // let user_id = "admin";
    let result = null;
    
    let logged = false;
    const {food_code, user_id} = this.state;
    console.log("user_id: ",user_id);
    console.log("food_code: ",food_code);
    try {
      // food_id에 대한 정보 가져오는 api
      // user_id = window.sessionStorage.getItem('id');
      if(user_id) {
        logged = true;
        ({data : result} = await axios.get(`http://3.34.97.97/api/detailFood/${food_code}/${user_id}`));
      } else { 
        ({data : result} = await axios.get(`http://3.34.97.97/api/detailFood/${food_code}`));
      }
      // 리뷰 리스트 출력
      this.getReviewList();
      console.log("result: ");
      console.log(result);
      this.setState({
        result,
        loading: false,
        logged
      });
    } catch (e) { 
      this.setState({
        error: "Can't find result",
        loading: false,
      });
    }
  }

  render() {
    // const {result ,loading, error, test} = this.state;
    console.log('render state: ')
    console.log(this.state.result)
    const { result, error, loading, logged, user_id, id,
            // 리뷰 부분
            review_result, review_count,  
            food_code 
          } = this.state
    return (
      <>
        <ProductPresenter 
          result={result} 
          logged={logged} 
          user_id={user_id} 
          id={id} 
          // 리뷰 정보
          review_count={review_count}
          review_result={review_result} 
          getReviewList={this.getReviewList} 
          error={error} 

        />
      </>
    );
  }
}
