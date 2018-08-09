import {
  UPDATE_NETWORK_INFO,
  UPDATE_WALLET_INFO,
  UPDATE_WALLET_HISTORY,
  UPDATE_DIFFICULTY
} from "../constants/action-types";

import {
  getNetworkInfo,
  getWalletInfo,
  getWalletHistory,
  getNetworkDifficulty
} from '../../helpers.js';

const initialState = {
    wallet: null,
    history: null,
    network: null,
    difficulty: null
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WALLET_INFO:
      return { ...state, wallet: action.payload };
    case UPDATE_WALLET_HISTORY:
      return { ...state, history: action.payload };
    case UPDATE_NETWORK_INFO:
      return { ...state, network: action.payload }
    case UPDATE_DIFFICULTY:
      return { ...state, difficulty: action.payload }
    default:
      return state;
  }
};

export default rootReducer;