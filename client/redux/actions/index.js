import { 
    UPDATE_WALLET_INFO,
    UPDATE_WALLET_HISTORY,
    UPDATE_NETWORK_INFO,
    UPDATE_DIFFICULTY
} from '../constants/action-types'

export const updateWalletInfo = (wallet) => ({
  type: UPDATE_WALLET_INFO,
  payload: wallet
})

export const updateWalletHistory = (history) => ({
  type: UPDATE_WALLET_HISTORY,
  payload: history
})

export const updateNetworkInfo = (info) => ({
  type: UPDATE_NETWORK_INFO,
  payload: info
})

export const updateDifficulty = (difficulty) => ({
  type: UPDATE_DIFFICULTY,
  payload: difficulty
})