import { SET_WALLET_ACCOUNT } from "../actions/actions";

// Initial state
const initialState = {
  account: "",
};

// Reducer function to handle state changes
const connectWalletReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_WALLET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      };
    default:
      return state;
  }
};

export default connectWalletReducer;
