function updateReducer(state, action) {
  switch (action.type) {
    case "ADD_COMMENT":
      return {
        ...state,
        comments: [action.payload, ...state.comments], //or the other way around ref two examples
      };
    default:
      return state;
  }
}
export default updateReducer;
