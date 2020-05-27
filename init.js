// init.js 에는 app.js에서 import한 application이 있다.
//application 관련 코드들은 app.js 파일에 담겨있다.
import "./db";
import app from "./app"; // app 을 export에 디폴트로 해줬기떄문에 이렇게 import가 가능.
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";

const PORT = process.env.PORT || 5000;
const hendleListening = () =>
  console.log(`▶Listening on : http://localhost:${PORT}`);

app.listen(PORT, hendleListening);
