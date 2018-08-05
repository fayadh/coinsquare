import { 
    UPDATE_WALLET_INFO,
    UPDATE_WALLET_HISTORY,
    UPDATE_NETWORK_INFO
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