# 영진전문대학 졸업 프로젝트 DR.FOody 

가공식품 사진 촬영을 통한 제품의 원재료와 맛 정보 및 취향 클러스터링 제공 서비스

## 시작하기에 앞서

본 프로젝트는 개발공부 및 결과물 기록용으로 작성된 폴더입니다.

### 개발환경

- PHP : 7.0
- Python : 3.8.2
- Server : Flask(3.0.3) 내장서버

### 사용 라이브러리
Laravel
flask : 3.0.3

### 커스텀 모델


## 테스트
로컬환경에서 테스트 진행  
AWS EC2, RDS를 통한 호스트 환경에서 테스트 진행
테스트 결과 노션에 작성  
https://www.notion.so/1462034914e880c69f33f78857908d0c

## 작성자

* **박형준** - *초기작업* - [PurpleBooth](https://github.com/parkhyoungjoon)

## 감사의 말

* 프로젝트를 수행할 수 있도록 도와준 팀원들과 영진전문대학교 교수님들에게 감사합니다.


결과
[product]
    불닭볶음면, 신라면, 마켓오-브라우니, 홍초, 효성 도시락 김

[밴치마킹]
    소머즈 https://somers.taglive.net/


[Task]
    Home
        search bar [ing]
        btn search [x]
        product ranking [x]
    Search result
        product card[x]
        btn buy [x]
    Product information
        data graph [x]
            review - pagenation
            clustering inform - package circle chart
            기간 내 조회 정보 - step count chart -> food_id = 제품번호 / year = 년도
            지역별 검색 순위 - table
            검색 증가 추이 - line graph
            연령대별 검색 수 - simple column chart
            성비(검색) - dounot chart, Pie Chart With Legend
            국가별 비율 - simple pie chart
            성별 + 연령별 - pictorial stacked chart

[check] 
    react url 주소 확인


[Ref]
    api 호출 테스트:     https://jsonplaceholder.typicode.com/
    jwt설정: https://dev-yakuza.github.io/ko/laravel/jwt/

    date picker: https://reactdatepicker.com/
                 AirBnB 것도 찾아보기
    react-moment: npm i react-moment-input --save
    
    엑셀 파일 내보내기: Export html table data to Excel using JavaScript

    아임포트 사용법: https://github.com/iamport/iamport-react-example

[error]
    condition에 알맞는 chart 띄우기 html container not found error:
        condition에 맞게 chart를 보여 줘야하는데 안됨.
        단일 chart는 생성 됨
        도전:
            한번에 모든 차트 다 띄워 보기
    

[error해결]
    json 통신이 되지 않는 문제:
        1. request url에서 /api 제거 후 경로 설정
        or
        2. 이전의 controller 경로 /Controllers/Auth/... 를 지정하면 route:list시 에러가 뜸
           /Auth 안의 파일들을 /Controllers로 빼내 오고 
           api.php 에서 경로 재설정 하면
           1. 의 경우인 /api를 제거하지 않고도 정상 작동 and route:list 정상 작동

    url창 새로 고침시 404 not found error문제:
        /path/path 식이었던 경로를 /path로 간단하게 하나로 통일

    /ViewProd/Product.js -> componentDidMount() 실행안되는 문제:
        생명주기를 생각하지 않은 문제, 초기 state설정 null문제
         - componentDidMount()는 render이후에 동작
         - null을 보내줘서 처음 render때 에러가 뜸
         - componentDidMount() -> 동작하지 않음 
         - 초기 state값을 받아올 값과 동일하게 설정 (null이 아니게 설정)

아임포트 사용법
    npm i antd -> Form.create가 삭제됨
    npm i @ant-design/compatible  => Form
    npm i dayjs - 종속성
    npm i node-sass - 종속성
    npm i node-gyp
    npm i fibers - 종속성
    npm i fibers_node_v8
    npm install --save @ant-design/icons => Icon
