const dogState = {
  loading: false,
  dogs: [],
  selected: null,
  error: ""
};

export const dogReducer = (state = dogState, action) => {
  switch (action.type) {
    case "REQUEST":
      return {
        ...state,
        loading: true
      };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        dogs: action.list,
        error: ""
      };
    case "FAILURE":
      return {
        ...state,
        loading: false,
        dogs: [],
        error: action.payload
      };
    default:
      return state;
  }
};

const userState = {
  loading: false,
  user: {},
  error: ""
};

export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case "REQUEST":
      return {
        ...state,
        loading: true
      };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.user,
        error: ""
      };
    case "FAILURE":
      return {
        ...state,
        loading: false,
        user: [],
        error: action.payload
      };
    default:
      return state;
  }
};
