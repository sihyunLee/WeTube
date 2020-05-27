import express from "express"; //const express = require('express'); express를 호출하고

//미들웨어 import
//미들웨어는 연결을 끊을 수 있다.
import morgan from "morgan"; // morgan은 로깅(미들웨어를 저장)을 해줌
import helmet from "helmet"; //helmet은 보안을 위해서
//cookie-parser와 body-parser는 express의 미들웨어로 쿠키와 바디를 다루는걸 도와줌.
import cookeiParser from "cookie-parser"; //세션의 데이터를 이용
import bodyParser from "body-parser"; // 바디의 데이터를 이용

//export default 해준 파일들 import
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { loaclsMiddleware } from "./middlewares";
const app = express(); // express를 실행하여 app을 상수로 만듬.

//커넥션
//view engine
//express의 html 기본 경로는 views로 셋팅되어 있어서 views로 폴더 생성
app.use(helmet()); // application이 더 안전하도록.
app.set("view engine", "pug"); //express의 view engine을 다운받은 pug로 확장자 변경.
app.use("/uploads", express.static("uploads")); // 누군가가 /uploads로 간다면 express.statoc을 이용하여 디렉토리에서 파일을 보내주는 미들웨어
app.use(cookeiParser()); //cookieParser는 cookie를 전달받아서 사용할 수 있도록 만들어주는 미들웨어. 사용자 인증 같은 곳에서 쿠키를 검사.
app.use(bodyParser.json()); //bodyParser는 사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어. requsest 정보에서 form이나 json 형태로 된 body를 검사. 아바타의 사진이나 비디오를 업로드 할 때 제목이나 댓글 같은 정보를 전달할때 form에 담음.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // application에서 발생하는 모든 일들을 logging함.

app.use(loaclsMiddleware);
//routers
//한 파일이 바뀌면 모두 적용되도록 주소들은 routers.js에 정의해둠.
//router의 모든 함수들은 Controller에 정의되어있음.
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
