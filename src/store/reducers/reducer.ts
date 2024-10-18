import { SET_MODEL_VALUE } from "../actions/actions";

// Initial state
const initialState = {
  modelValue: "",
};

// Reducer function to handle state changes
const connectModelReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MODEL_VALUE:
      return {
        ...state,
        modelValue: action.payload,
      };
    default:
      return state;
  }
};

export default connectModelReducer;
