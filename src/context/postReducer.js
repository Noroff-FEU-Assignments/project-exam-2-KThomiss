export const initialState = {
  userAvatar: "",
  posts: [],
  loading: true,
  error: null,
  details: null,
  comments: [],
  reactions: [],
  userPosts: [],
};

const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_USER_AVATAR":
      return {
        ...state,
        userAvatar: payload,
      };

    case "SET_POSTS":
      return {
        ...state,
        posts: payload,
        loading: false,
        error: null,
      };

    case "ADD_POST":
      return {
        ...state,
        posts: [payload, ...state.posts],
      };

    case "SET_USER_POSTS":
      return {
        ...state,
        userPosts: payload,
      };

    case "REMOVE_USER_POST":
      return {
        ...state,
        userPosts: state.userPosts.filter((post) => post.id !== payload),
      };

    case "SET_ERROR":
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case "POST_DETAILS":
      return {
        ...state,
        details: payload,
      };

    case "SET_COMMENTS":
      return {
        ...state,
        comments: payload,
      };
    case "ADD_COMMENT":
      return {
        ...state,
        comments: [...state.comments, payload],
      };

    case "SET_REACTIONS":
      return {
        ...state,
        reactions: payload,
      };

    case "ADD_REACTION":
      return {
        ...state,
        reactions: [...state.reactions, payload],
      };

    default:
      throw new Error(`No case for type ${type} found in postReducer.`);
  }
};

export default postReducer;
