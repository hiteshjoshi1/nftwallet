import { Alert } from 'react-native'
import { IWalletConnectOptions, IPushServerOptions } from '@walletconnect/types'
import WalletConnectDefault from '@walletconnect/client/dist/umd/index.min.js'
import {
  CALL_REQUEST,
  DISCONNECT,
  FAIL,
  SESSION_REQUEST_EVENT,
  WC_SCREEN,
} from '../../constants'

import { CealLogo } from '../../assets/images'
import { Wallet } from 'ethers'
import { StackActions } from '@react-navigation/native'
import WalletConnectEvents from '../../Screens/WalletConnectEvents/WalletConnectEvents'

// import { useWalletConnectStoreService } from '@hooks/authentication'

// import { LocalVCRequestStore } from '@services/VCRequestStore/LocalVCRequestStore'

// export const useWcTimestampUpdate = () => {
//   // const { localWalletConnectStore } = useWalletConnectStoreService()

//   const onWcTimestampUpdate = async (wcSession: CustomWalletConnect) => {
//     try {
//       // const localStoreItem = await localWalletConnectStore.getById(wcSession.clientId)

//       if (localStoreItem && localStoreItem.id) {
//         localWalletConnectStore.update(localStoreItem.id, { updatedAt: wcSession.lastUpdated })
//       }
//     } catch (e) {}
//   }

//   return { onWcTimestampUpdate }
// }

export class CustomWalletConnect extends WalletConnectDefault {
  private _lastUpdated: Date = new Date();

  constructor(connectorOpts: IWalletConnectOptions, pushServerOpts?: IPushServerOptions) {
    super(connectorOpts, pushServerOpts)
  }

  get lastUpdated(): Date {
    return this._lastUpdated
  }

  set lastUpdated(value: Date) {
    this._lastUpdated = value
  }

  public updateTimestamp(): void {
    this._lastUpdated = new Date()
  }
}

export const createNewWcConnector = (wcString: string): CustomWalletConnect => {
  const wcSession: CustomWalletConnect = new CustomWalletConnect({
    uri: wcString,
    clientMeta: {
      description: 'Crypto Wallet',
      url: 'https://nftwallet.com',
      icons: [CealLogo],
      name: 'NFT Wallet',
    },
  })
  return wcSession
}

export const registerWalletConnectListeners = async (
  walletConnectItem: CustomWalletConnect,
  wallet:Wallet , navigation:any,
  onDisconnectCallback: (walletConnectItem: CustomWalletConnect) => void
) => {

  try {
    walletConnectItem.on(SESSION_REQUEST_EVENT, (error: any, payload: any) => {
      console.log(' ----Session request event-----')
      if (error) {
        Alert.alert(FAIL, error.toString())
        throw error
      }
      navigation.dispatch(
        StackActions.push(WC_SCREEN, {
          payload,
          eventType: SESSION_REQUEST_EVENT,
          wcSession: walletConnectItem,
          address: wallet.address
        }),
      )
    })

    walletConnectItem.on(CALL_REQUEST, (error: any, payload: any) => {
    
      console.log(' ---- Call event-----')
      if (error) {
        Alert.alert(FAIL, error.toString())
        throw error
      }
      navigation.dispatch(
        StackActions.push(WC_SCREEN, {
          payload,
          eventType: CALL_REQUEST,
          wcSession: walletConnectItem,
          address: wallet.address
        }),
      )
    })

  

    walletConnectItem.on(DISCONNECT,async (error:any, payload:any) => {
      console.log('disconnect event')
      if (error) {
        throw error
      }
      try {
        await walletConnectItem?.killSession()
      } catch (e) {
        onDisconnectCallback && onDisconnectCallback(walletConnectItem)
      }
      onDisconnectCallback && onDisconnectCallback(walletConnectItem)
    })

  } catch (e) {
    onDisconnectCallback && onDisconnectCallback(walletConnectItem)
  }
}

