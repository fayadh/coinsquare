import {
  UPDATE_WALLET_INFO,
} from "../constants/action-types";

const initialState = {
    wallet: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WALLET_INFO:
      return { ...state, wallet: action.payload };
    default:
      return state;
  }
};

export default rootReducer;