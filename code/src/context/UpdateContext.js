import { createContext, useReducer } from "react";
import UpdateReducer from "./UpdateReducer";

const initialState = {
  comments: [],
};

export const UpdateContext = createContext(initialState);

export const UpdateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UpdateReducer, initialState);

  function addComment(comment) {
    dispatch({
      type: "ADD_COMMENT",
      payload: comment,
    });
  }

  return <UpdateContext.Provider value={{ comments: state.comments, addComment }}>{children}</UpdateContext.Provider>;
};
