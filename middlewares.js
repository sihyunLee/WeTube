import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const loaclsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube"; // pug에게 loacals(지역) 변수를 주기위함.
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
