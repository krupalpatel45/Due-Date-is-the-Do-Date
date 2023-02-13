import Names from "./actionNames";
import axios from "axios";

export const getData = (testNumber) => async (dispatch) => {
  dispatch({
    type: Names.GET_QUESTIONS,
    payload: { data: testNumber },
  });
};

export const changeQuestion = (newQues) => (dispatch) => {
  dispatch({
    type: Names.CHANGE_CURRENT_QUESTION,
    payload: { newQues: newQues },
  });
};
export const changeOption = (nOpt, cOpt) => (dispatch) => {
  dispatch({
    type: Names.OPTION_CLICKED,
    payload: { nOpt: nOpt, cOpt: cOpt },
  });
};
export const submit = () => (dispatch) => {
  dispatch({ type: Names.SUBMIT_RESULT, payload: {} });
};
export const changeLoading = () => (dispatch) => {
  dispatch({ type: Names.CHANGE_LOADING, payload: {} });
};
export const changeTheme = () => (dispatch) => {
  dispatch({ type: Names.CHANGE_THEME, payload: {} });
};
export const getTests = (type) => async (dispatch) => {
  let endPoint = "http://localhost:8083/test/" + type;
  let resp = await axios.get(endPoint);
  let d = resp["data"];
  for (let i = 0; i < d.length; i++) d[i].questions = d[i].questions.questions;

  dispatch({ type: Names.GET_LIST, payload: { data: d } });
};
export const setTestNum = (num) => async (dispatch) => {
  dispatch({ type: Names.SET_TEST_NUMBER, payload: { data: num } });
};
