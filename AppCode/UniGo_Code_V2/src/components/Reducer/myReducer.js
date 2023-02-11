import axios from "axios";
import Names from "./actionNames";

let initState = {
  questions: [],
  curQues: 0,
  progress: 0,
  completeDialog: false,
  result: { correct: 0, wrong: 0, unattempt: 0 },
  loading: true,
  dark: false,
  theme: { color: "#2E3B55", headText: "white", normalText: "black" },
  tests: [],
  testNumber: -1,
};

export const MyReducer = (state = initState, action) => {
  let localState;
  switch (action.type) {
    case Names.GET_QUESTIONS:
      if (state.tests[action.payload.data - 1] === undefined) return state;
      let D = state.tests[action.payload.data - 1].questions;

      for (let i = 0; i < D.length; i++) {
        D[i]["clicked"] = 0;
        D[i]["disabled"] = 0;
        D[i]["waiting"] = true;
        D[i]["correct"] = false;
        D[i]["wrong"] = false;
        let tempJson = [];
        for (let j = 0; j < 4; j++) {
          tempJson.push({ opt: D[i]["options"][j], clicked: 0 });
        }
        D[i]["options"] = tempJson;
        D[i]["my"] = "";
      }

      return {
        ...state,
        questions: D,
        testNumber: action.payload.data,
        curQues: 0,
        progress: 0,
        completeDialog: false,
        result: { correct: 0, wrong: 0, unattempt: 0 },
        loading: false,
      };

    case Names.CHANGE_CURRENT_QUESTION:
      console.log(action.payload);
      return {
        ...state,
        curQues: action.payload["newQues"],
      };

    case Names.OPTION_CLICKED:
      localState = state;
      let nOpt = action.payload["nOpt"],
        cOpt = action.payload["cOpt"];

      localState["questions"][state.curQues]["clicked"] = 1;
      localState["questions"][state.curQues]["options"][nOpt - 1][
        "clicked"
      ] = 1;
      localState["questions"][state.curQues]["disabled"] = 1;
      localState["questions"][state.curQues]["my"] = cOpt;

      // check user's answer
      if (cOpt === localState["questions"][state.curQues]["answer"]) {
        localState["questions"][state.curQues]["waiting"] = false;
        localState["questions"][state.curQues]["correct"] = true;
        localState["questions"][state.curQues]["wrong"] = false;
      } else {
        localState["questions"][state.curQues]["waiting"] = false;
        localState["questions"][state.curQues]["correct"] = false;
        localState["questions"][state.curQues]["wrong"] = true;
      }
      let count = 0;
      for (let i = 0; i < localState["questions"].length; i++) {
        if (localState["questions"][i]["clicked"] === 1) count += 1;
      }

      localState["progress"] = Math.floor(
        (count * 100) / localState["questions"].length
      );
      return {
        ...state,
        question: localState["questions"],
        progress: localState["progress"],
      };

    case Names.SUBMIT_RESULT:
      localState = state;
      let cur = localState["questions"];
      let total = localState["questions"].length;
      let localResult = { correct: 0, wrong: 0, unattempt: 0 };

      for (let i = 0; i < cur.length; i++) {
        if (cur[i]["clicked"] === 1) {
          if (cur[i]["answer"] === cur[i]["my"]) localResult["correct"] += 1;
          else localResult["wrong"] += 1;
        } else localResult["unattempt"] += 1;
      }
      return {
        ...state,
        completeDialog: true,
        questions: localState["questions"],
        result: {
          correct: localResult["correct"],
          wrong: localResult["wrong"],
          unattempt: localResult["unattempt"],
        },
      };
    case Names.CHANGE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case Names.CHANGE_THEME:
      let themes = [
        { color: "#2E3B55", headText: "white", normalText: "black" },
        { color: "#212121", headText: "white", normalText: "white" },
      ];
      let lastTheme = state.dark;
      let selTheme = themes[0];
      if (lastTheme === true) {
        lastTheme = false;
        selTheme = themes[0];
      } else {
        lastTheme = true;
        selTheme = themes[1];
      }
      return {
        ...state,
        dark: lastTheme,
        theme: selTheme,
      };
    case Names.GET_LIST:
      return {
        ...state,
        tests: action.payload.data,
      };

    default:
      return state;
  }
};
