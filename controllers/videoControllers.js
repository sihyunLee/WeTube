import routes from "../routes";
import Video from "../models/Video";

//render로 어떤 pug로 보여줄지 셋팅.
export const home = async (req, res) => {
  try {
    //async는 await를 쓰기위해 사용
    const videos = await Video.find({}); // await는 다음 과정이 끝날 때까지 잠시 기다려달라. Video.find({})는 DB에 있는 모든 Video를 가져옴
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    //에러가 발생한다면 케치하여 로그로 보여주고 videos를 빈 배열로 만든다.
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
}; // render 함수의 첫번째 인자는 템플릿(home.pug) 두번째 인자는 템플릿에 추가할 정보가 담긴 객체.
export const search = (req, res) => {
  const {
    query: { term: searchingBy } // term에 searchingBy 으로 이름 변경
  } = req; // const searchingBy = req.query.term을 한것과 같은 뜻. ES6 이전 코딩
  console.log(searchingBy);
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id } //url 에서 정보를 가져오는 유일한 방법. id가 들어가는 이유는 router에 /:id 로 이름을 줬기떄문이다.
  } = req;
  try {
    const video = await Video.findById(id);
    console.log(video);
    res.render("videoDetail", { pageTitle: "Video Detail", video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
