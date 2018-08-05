import { 
    UPDATE_WALLET_INFO,
} from '../constants/action-types'

export const updateWalletInfo = (wallet) => ({
  type: UPDATE_WALLET_INFO,
  payload: wallet
})