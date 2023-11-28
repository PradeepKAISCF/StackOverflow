import axios from "axios";

const API = axios.create({
  baseURL: "https://stackoverflowclone-f7389aa5696b.herokuapp.com/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id,userId) => API.post(`/questions/delete/${id}`,{userId});
export const voteQuestion = (id, value, userId) =>
  API.patch(`/questions/vote/${id}`, { value ,userId});

export const postAnswer = (userId, id, noOfAnswers, answerBody, userAnswered) =>
  API.patch(`/answer/post/${id}`, { userId,noOfAnswers, answerBody, userAnswered });
export const deleteAnswer = (id, answerId, noOfAnswers, userId) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers, userId });

export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);

export const getNotification = (id) => API.get(`/notify/${id}`)

export const uploadVideo = (fileData, fileOptions) =>
  API.post("/video/uploadVideo", fileData, fileOptions);
export const getVideos = () => API.get("/video/getvideos");

export const posttoken = (fcmtoken,userid) => API.post(`token/${userid}`,{fcmtoken})
