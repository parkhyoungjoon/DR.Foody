import React from "react";
import {InputWithLabel, SelectWithLabel,SelectWithLabel2, CheckWithLabel} from './InputWithLabel';
import AuthContent from './AuthContent';
import AuthButton from './AuthButton';
import AuthLink from './AuthLink';
import styled, { ThemeConsumer } from 'styled-components';
import axios from "axios";

const CheckInput = styled.input`
    width: 100%;
`;

const RegisterPresenter = ({ 
                handleFormButton,
                handlePageButton ,
                updateInform ,
                updateMaterial ,
                page,id,password ,password_confirmationirmation,
                nickname,country ,country_code,
                gender,birth,material,sweet,salty,hot,sour,bitter,photo,email,
                DB_Country,
                DB_language,

}) => (
            <AuthContent title="회원가입">
                <InputWithLabel label="아이디" name="id" placeholder="아이디"  onChange={updateInform} />
                <InputWithLabel label="이메일" name="email" placeholder="이메일"  onChange={updateInform} />
                <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" onChange={updateInform} />
                <InputWithLabel label="비밀번호 확인" name="password_confirmation" placeholder="비밀번호 확인" type="password"  onChange={updateInform} />
                <InputWithLabel label="닉네임" name="nickname" placeholder="닉네임"  onChange={updateInform} />
                <SelectWithLabel label="국적" name="country" input={DB_Country}  onChange={updateInform} />
                <SelectWithLabel2 label="언어" name="language"  input={['한국어', '일본어', '중국어', '영어']} />
                <SelectWithLabel2 label="성별" name="gender" input={['남자', '여자']} onChange={updateInform} />
                {/* radio handle 만들기 */}
                <InputWithLabel label="생년월일" name="birth" type="date" onChange={updateInform} />
                {/* <AuthButton onClick={handlePageButton}>다음페이지</AuthButton> */}
                {/* 기피 원재료 선택 */}
                <CheckWithLabel label="빠른 선택" name="fast" type="checkbox" defaultValue={['할랄', '비건', '코셔']} input={['기독교', '베지테리언', '불교', '유대교', '이슬람교', '세미베지테리언', '시크교', '프루테리언', '힌두교']} onChange={updateInform} />
                <CheckWithLabel label="카테고리" name="kategory" type="checkbox" input={['갑각류', '과일', '곡물', '견과류', '야채', '유제품', '육류', '생선', '조개류', '해조류']} onClick={updateMaterial}/>
                <CheckWithLabel label="원재료" name="material" type="checkbox" input={['가재','게', '새우']} onClick={updateMaterial}/>
                {/* 맛 정보 선택 */}
                <InputWithLabel label="단맛" name="sweet" placeholder="1-5"  onChange={updateInform}/>
                <InputWithLabel label="쓴맛" name="bitter" placeholder="1-5"  onChange={updateInform} />
                <InputWithLabel label="매운맛" name="hot" placeholder="1-5" onChange={updateInform} />
                <InputWithLabel label="신맛" name="sour" placeholder="1-5"  onChange={updateInform} />
                <InputWithLabel label="짠맛" name="salty" placeholder="1-5" onChange={updateInform} />
                {/* <CheckWithLabel label="빠른 선택" type="checkbox" value="select" input={['할랄', '비건', '코셔']} /> */}
                <AuthButton onClick={handleFormButton}>회원가입</AuthButton>
                <AuthLink to="/login" children="로그인"></AuthLink>
                {/* <PageButton>다음</PageButton> */}
            </AuthContent>
);

export default RegisterPresenter;