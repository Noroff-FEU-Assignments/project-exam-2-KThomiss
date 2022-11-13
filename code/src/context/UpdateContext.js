import { createContext, useReducer } from "react";
import UpdateReducer from "./UpdateReducer";

const initialState = {
  comments: [],
};

export const UpdateContext = createContext(initialState);

export const UpdateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UpdateReducer, initialState);

  function addComment(comment) {
    console.log(comment);
    dispatch({
      type: "ADD_COMMENT",
      payload: comment,
    });
  }

  return <UpdateContext.Provider value={{ comments: state.comments, addComment }}>{children}</UpdateContext.Provider>;
};
