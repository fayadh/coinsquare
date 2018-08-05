import {
  UPDATE_NETWORK_INFO,
  UPDATE_WALLET_INFO,
  UPDATE_WALLET_HISTORY
} from "../constants/action-types";

const initialState = {
    wallet: null,
    history: null,
    network: null
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WALLET_INFO:
      return { ...state, wallet: action.payload };
    case UPDATE_WALLET_HISTORY:
      return { ...state, history: action.payload };
    case UPDATE_NETWORK_INFO:
      return { ...state, network: action.payload }
    default:
      return state;
  }
};

export default rootReducer;