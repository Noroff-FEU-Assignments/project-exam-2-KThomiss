import { createContext, /* useReducer, */ useState } from "react";
/* import UpdateReducer from "./UpdateReducer"; */

const initialState = {
  commentsArray: [],
};

export const UpdateContext = createContext(initialState);

export const UpdateContextProvider = ({ children }) => {
  /* const [, dispatch] = useReducer(UpdateReducer, initialState); */
  const [comments, setComments] = useState(initialState);

  console.log(comments);

  /*   function addComment(comment) {
    console.log(comment);
    dispatch({
      type: "ADD_COMMENT",
      payload: comment,
    });
  } */

  return <UpdateContext.Provider value={{ comments, setComments }}>{children}</UpdateContext.Provider>;
};

/*comments: state.comments*/
