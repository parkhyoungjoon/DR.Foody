import React from 'react';
import styled from 'styled-components';

import {Api} from '../api';
import Rating from '@material-ui/lab/Rating';
import { Input, Button ,Modal } from 'antd';
import Reviews from './Reviews';
const { TextArea } = Input;

const Container = styled.div`
    width: 50%;
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
`;
const LoggedButton = styled.button``;
const ReviewCreateContainer = styled.div`
    width: 100%;
`;
const RatingDiv = styled.div`
width: 300px;
      display: 'flex';
      alignItems: 'center';
`;
const Title = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: red;
`;
const Grid = styled.div`
    width: 100%;
    height: 100%;
    grid-gap: 20px;
`;
const labels = {
    0.5: '최악이에요',
    1: '추천하지 않음',
    1.5: '그닥이에요',
    2: '별로..',
    2.5: '좀 별로',
    3: '괜찮음',
    3.5: '무난무난',
    4: 'Good',
    4.5: '맛있어요',
    5: '정말 맛있어요~',
  };
  

// display: grid;  
class ReviewList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            review_count: this.props.review_count,
            review_result: this.props.review_result,
            logged: this.props.logged ,
            user_id: this.props.user_id , // auto inc
            id: this.props.id , // login id
            text_value: '',
            rating: 5,
            click_modified: false,
    
            // modify inform
            visible: false,
            ModalText: '',
            ModalRating: 0,
            review_id: 0,

            loading: false,
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleDlete = this.handleDlete.bind(this);
        this.checkLogged = this.checkLogged.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.onChangeModal = this.onChangeModal.bind(this);
    }
    setModalContents = async(review_id) => {
        const {review_result} = this.state;
        console.log("review_result: ", review_result);
        console.log("review_id: ", review_id);
        try {
            for(let i=0; i < review_result.length; i++){
                console.log(review_result[i].review_id, i);
                if(review_id == review_result[i].review_id){
                    console.log("for문 통과: ", review_id);
                    await this.setState({
                        review_id: review_id,
                        ModalText:review_result[i].review_content,
                        ModalRating:review_result[i].review_point,
                        loading: false,
                    });
                }
            }
        } catch(error){
            console.log('for문 실패');
        }
    };
    showModal = async({ target: {value}}) => {
        // e.preventDefault();
        // const { target : {value}} = e;
        console.log('잘 받아오나: ', value);
        await this.setModalContents(value);
        console.log('쇼모달 작동');
        setTimeout(() => {
            this.setState({
                    visible: true})
              }, 1000);
    };
    handleOk = async(e) => {
        const {ModalText, ModalRating, review_id} = this.state;
        const taste = 1;
        if(ModalText.length < 6){
            alert('리뷰는 5자 이상 작성해 주세요');
        } else {
            await Api.reviewUpdateApi(ModalText, review_id, ModalRating, taste );
            this.props.getReviewList();
        }
        this.setState({
            visible: false,
          });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    handleCreate = async(e) =>{
        e.preventDefault();
        const {text_value, rating,  review_result, user_id} = this.state;
        // 나중에 수정해야할 부분
        const language_code = 1;
        let content = text_value; 
        let point = rating;
        let hot = 1;
        let sweet = 1;
        let sour = 1;
        let bitter = 1;
        let salty= 1;
        const food_id = review_result[0].food_id;
        let review_create = false;
        // 리뷰 저장 api 호출
        // 1 맛리뷰, 0 일반리뷰
        if(text_value.length < 6){
            alert('리뷰는 5자 이상 작성해 주세요');
        } else {
            const {data: taste} = await Api.predictReviewApi(text_value);
            ({data: review_create} = await Api.reviewWriteApi(user_id, food_id, language_code, 
                content, taste[0], point, hot, sweet, sour, bitter, salty));
        }
        this.props.getReviewList();
            this.setState({
                text_value: "",
                rating: 5,
            });
        console.log('작성 성공');
        console.log('등록 버튼 작동');
    };
    handleDlete = async(e) =>{
        e.preventDefault();
        const {target: {value}} = e;
        const {data: delete_result} = await Api.reviewDeleteApi(value);
        this.props.getReviewList();
        console.log('삭제 버튼 작동');
    };

    onChange = ({ target: { name, value } }) => {
        if(name==='text_area'){
            this.setState({ text_value: value });
        } else if(name==='rating'){
            this.setState({rating: value});
        }
    };
    onChangeModal = ({target: { name, value } }) => {
        if(name==='modal_text_area'){
            this.setState({ ModalText: value });
        } else if(name==='modal_rating'){
            this.setState({ModalRating: value});
        }
    };

    checkLogged = e =>{
        const {logged} = this.state;
        e.preventDefault();
        if(!logged) {
            alert('로그인 후 사용 가능합니다.');
        }
    };
    // review_id
    //      내가 쓴 리뷰에는 수정 삭제 버튼이 있다
    // 리뷰 작성 
    //      => 평점과 textarea가 있띠ㅏ

    // 수정 
    //      => 해당 리뷰가 사라지고 text area와 별점 넣는 곳이 생긴다
    //         등록을 누르면 리뷰 내용이 수정된다.
    //          => 수정 flag 를 줘서 3항 연산자로?
    // 삭제 
    //      => 해당 리뷰가 사라진다.

    componentDidUpdate(prevProps){
        if(prevProps.review_result !== this.props.review_result){
            this.setState({
                review_result: this.props.review_result
            });
            console.log('컴디업 실행');
        }
    }
    render(){
        const {review_count,review_result,logged,user_id, text_value, rating, id,
            // modal option
            visible, ModalText,  ModalRating , loading
        } = this.state;
        console.log('리뷰 컴: ', ModalText, ModalRating, loading );
        console.log(this.state.user_id, id);
        return (
            <>
                <Container>
                            {logged? (
                                <ReviewCreateContainer>
                                    <RatingDiv>
                                        <Rating
                                            name="rating"
                                            value={parseInt(rating)}
                                            precision={0.5}
                                            onChange={this.onChange}
                                        />
                                        {/* {rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>} */}
                                    </RatingDiv>
                                    <TextArea
                                        name="text_area"
                                        value={text_value}
                                        onChange={this.onChange}
                                        placeholder="리뷰를 입력해 주세요"
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                        />
                                    <Button onClick={this.handleCreate}>등록</Button>
                                </ReviewCreateContainer>
                            )
                            :(
                                <ReviewCreateContainer  onClick={this.checkLogged}>
                                    <RatingDiv>
                                        <Rating
                                            name="rating"
                                            value={parseInt(rating)}
                                            precision={0.5}
                                            onChange={this.onChange}
                                        />
                                        {/* {rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>} */}
                                    </RatingDiv>
                                        <div>

                                        </div>
                                    <TextArea
                                        name="text_area"
                                        value={text_value}
                                        onChange={this.onChange}
                                        placeholder="리뷰를 입력해 주세요"
                                        autoSize={{ minRows: 3, maxRows: 5 }}
                                        />
                                    <Button>등록</Button>
                                </ReviewCreateContainer>
                            )
                        }
                    <Grid>
                        {review_result.map( (r, index) => (
                            <Reviews 
                                key={index}
                                id={r.id} // 123
                                user_id={id} // 123
                                review_id={r.review_id} 
                                review_date={r.review_date}
                                review_content={r.review_content}
                                review_point={r.review_point} 
                                user_nickname={r.user_nickname} 
                                // onClick 수정 삭제 필요
                                country_code={r.country_code}
                                logged={logged}
                                handleDlete={this.handleDlete}
                                onChange={this.onChange}
                                // modal option
                                showModal = {this.showModal}
                                handleOk = {this.handleOk}
                            />
                        ))}
                    </Grid>
                    <Modal
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        centered
                        okText="등록"
                        cancelText="취소"
                    >
                        <ReviewCreateContainer>
                            <RatingDiv>
                                <Rating
                                    name="modal_rating"
                                    value={parseInt(ModalRating)}
                                    precision={0.5}
                                    onChange={this.onChangeModal}
                                />
                                {/* {rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>} */}
                            </RatingDiv>
                            <TextArea
                                name="modal_text_area"
                                value={ModalText}
                                onChange={this.onChangeModal}
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </ReviewCreateContainer>
                    </Modal>
                </Container>
                {/* // <div>{`${review_count},${review_result},${logged},${user_id}`}</div> */}
            </>
            );
    }
}

export default ReviewList; 