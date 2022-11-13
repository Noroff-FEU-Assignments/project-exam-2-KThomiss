function UpdateReducer(state, action) {
  switch (action.type) {
    case "ADD_COMMENT":
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    default:
      return state;
  }
}
export default UpdateReducer;
