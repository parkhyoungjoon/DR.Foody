import React, { Component } from 'react';
// import { AuthContent, InputWithLabel, AuthButton, AuthLink } from './Auth';
import {InputWithLabel, SelectWithLabel, CheckWithLabel} from './InputWithLabel';
import AuthContent from './AuthContent';
import AuthButton from './AuthButton';
import AuthLink from './AuthLink';
import styled, { ThemeConsumer } from 'styled-components';
import axios from "axios";
import RegisterPresenter from './RegisterPresenter';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            page : 0,
            id : "",
            password: "",
            password_confirmation: "",
            nickname: "",
            country: '한국',
            country_code: 0,
            gender: 1,
            // 남=1, 여=0
            birth: null,
            material : [],
            sweet: 1,
            salty: 1,
            hot: 1,
            sour: 1,
            bitter: 1,
            photo: null,
            email: "",

            // 국가 정보
            DB_Country: [{
                country_code: null,
                country_name_kr: null
            }],
            DB_language: null,
        }
    }

    // 다음페이지로 넘어가는 기능
    handlePageButton = e => {
        e.preventDefault();
        let {page} = this.state;
        console.log(page);
        if (page>=0 && page<=3){
            page++;
            this.setState({
                page
            });
        }
    };

    // 기피재료 이외의 정보 설정
    updateInform = e => {
        // e.preventDefault();
        const { target : {name, value}} = e;
        const  {id ,email, password,password_confirmation,nickname,country,gender,birth,sweet,salty,hot,sour,bitter} = this.state;
        const set = {
            id ,email, password, password_confirmation ,nickname,country,gender,birth,sweet,salty,hot,sour,bitter
        };
        for(var key in set){
            if(key === name){
                set[key] = value;
                switch(key){
                    case "id":
                        this.setState({
                            id: set[key]
                        });
                        break;
                    case "email":
                        this.setState({
                            email: set[key]
                        });
                        break;
                    case "password":
                        this.setState({
                            password: set[key]
                        });
                        break;
                    case "password_confirmation":
                        this.setState({
                            password_confirmation: set[key]
                        });
                        break;
                    case "nickname":
                        this.setState({
                            nickname: set[key]
                        });
                        break;
                        // 업데이트 된 country값을 country_code로 변환
                    case "country":
                        this.setState({
                            country: set[key]
                        });
                        updateCountryCode(set[key]);
                        break;
                    case "gender":
                        this.setState({
                            gender: set[key]
                        });
                        break;
                    case "birth":
                        this.setState({
                            birth: set[key]
                        });
                        break;
                    case "sweet":
                        this.setState({
                            sweet: set[key]
                        });
                        break;
                    case "salty":
                        this.setState({
                            salty: set[key]
                        });
                        break;
                    case "hot":
                        this.setState({
                            hot: set[key]
                        });
                        break;
                    case "sour":
                        this.setState({
                            sour: set[key]
                        });
                        break;
                    case "bitter":
                        this.setState({
                            bitter: set[key]
                        });
                        break;
                    default:
                        console.log('error');
                }
            }
        }
        console.log(name+" : "+value);
    };

    // 기피재료 정보 설정
    updateMaterial = e => {
        const { target : {value}} =e;
        let { material} = this.state;
        let temp = [];
        let flag = false;
        let index;
        // console.log(typeof(material));
        // console.log(typeof(id));
        // for(var i=0; i<material.length; i++){
        //     if(material[i] === value){
        //         flag = true;
        //     }
        // }
        // if (!flag){
        //     temp =  material.push(value);
        // }
        
        material.forEach( (item, ide) => {
            console.log("item: "+ item);
            if( item===value){
                flag = true;
                index = ide;
            }
        });
        if (!flag){
            temp =  material.push(value);
        } else {
            material.splice(index, 1);
        }
        this.setState({
            material
        });
        // console.log("material: "+material);
        // console.log("count: "+count);
    };

    updateCountryCode(country){
    // country_code 
	//  410 대한민국
	//  392 일본
	//  156 중화인민공화국
	//  840 미국
        switch (country){
            case '한국':
                this.setState({
                    country_code : 410
                });
                break;
            case '일본':
                this.setState({
                    country_code : 392
                });
                break;
            case '미국':
                this.setState({
                    country_code : 840
                });
                break;
            case '중국':
                this.setState({
                    country_code : 156
                });
                break;
        }
    };

    // form 제출 
    handleFormButton = e => {
        e.preventDefault();
        const {id, email, password,password_confirmation, nickname, photo, country_code, gender, birth, material, sweet, bitter, hot, sour, salty } = this.state;
        let material_str = material.toString();
        axios.post('/api/regist', {
            // inform : {
                id, 
                email,
                password, 
                password_confirmation, 
                nickname, 
                country_code, 
                gender, 
                birth,
                material: material_str, 
                sweet, 
                bitter, 
                hot, 
                sour, 
                salty,
                photo,
        })
        .then( response => {
            console.log(response);
        })
        .catch( error => {
            console.log(error);
        }); 
        console.log("----Function form----");
        console.log("id: "+ id);
        console.log("email: "+ email);
        console.log("password: "+ password);
        console.log("nickname: "+ nickname);
        console.log("country_code: "+ country_code);
        console.log("gender: "+ gender);
        console.log("birth: "+ birth);
        console.log("material: "+ material);
        console.log("sweet: "+ sweet);
        console.log("bitter: "+ bitter);
        console.log("hot: "+ hot);
        console.log("sour: "+ sour);
        console.log("salty: "+ salty);
        console.log("photo: "+ photo);
    };


    async componentDidMount(){
        let result_country = null;
        try {
            ({data: { country : result_country }} = await axios.get('http://3.34.97.97/api/registData'));
        }  catch {
            this.setState({
                error: '나라 정보 받기 실패'
            });
        } finally{
            console.log('작동');
        }
        this.setState({
            DB_Country:result_country
        });
        console.log(this.state.DB_Country);
    }
    
    render() {
        // const {handlePage} = this.handlePage;
        // const { DB_Country } = this.state;
        console.log('랜더 후');
        // console.log(this.state.DB_Country);
        const test = [
            {
                country_code : 41,
                country_name_kr: '한국'
            }
        ] 
        const { page,id ,password, password_confirmation,nickname,country,country_code,gender,
            // 남=1, 여=0
            birth,material,sweet,salty,hot,sour,bitter,photo,email,
            // 국가 정보
            DB_Country,
            DB_language,} = this.state;
        return (

            <RegisterPresenter
                handleFormButton = {this.handleFormButton}
                handlePageButton = {this.handlePageButton}
                updateInform = {this.updateInform}
                updateMaterial = {this.updateMaterial}
                page = {page}
                id = {id}
                password= {password}
                password_confirmation= {password_confirmation}
                nickname= {nickname}
                country= {country}
                country_code= {country_code}
                gender= {gender}
                // 남=1 여=0
                birth= {birth}
                material= {material}
                sweet= {sweet}
                salty= {salty}
                hot= {hot}
                sour= {sour}
                bitter= {bitter}
                photo= {photo}
                email= {email}
    
                // 국가 정보
                DB_Country= {DB_Country}
                DB_language= {DB_language}
            />
        );
    }
}

export default Register;