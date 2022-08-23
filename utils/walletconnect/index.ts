import { Alert } from 'react-native'
import { IWalletConnectOptions, IPushServerOptions } from '@walletconnect/types'
import WalletConnectDefault from '@walletconnect/client/dist/umd/index.min.js'
import {
  CALL_REQUEST,
  DISCONNECT,
  FAIL,
  SESSION_REQUEST_EVENT,
  SESSION_UPDATE_EVENT
} from '../../constants'

import { StackActions } from '@react-navigation/native'

// import { useWalletConnectStoreService } from '@hooks/authentication'

// import { LocalVCRequestStore } from '@services/VCRequestStore/LocalVCRequestStore'

// export const useWcTimestampUpdate = () => {
// //   const { localWalletConnectStore } = useWalletConnectStoreService()

//   const onWcTimestampUpdate = async (wcSession: CustomWalletConnect) => {
// //     try {
// //       const localStoreItem = await localWalletConnectStore.getById(wcSession.clientId)

// //       if (localStoreItem && localStoreItem.id) {
// //         localWalletConnectStore.update(localStoreItem.id, { updatedAt: wcSession.lastUpdated })
// //       }
// //     } catch (e) {}
// //   }

// //   return { onWcTimestampUpdate }
  
// }

export class CustomWalletConnect extends WalletConnectDefault {
  private _lastUpdated: Date = new Date() ;

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
    console.log('in create conn')
  const wcSession: CustomWalletConnect = new CustomWalletConnect({
    uri: wcString

  })
  return wcSession
}

export const registerWalletConnectListeners = async (
  walletConnectItem: CustomWalletConnect,
  onDisconnectCallback: (walletConnectItem: CustomWalletConnect) => void,
//   onWcTimestampUpdate: (walletConnectItem: CustomWalletConnect) => void,
  
) => {
  try {
    walletConnectItem.on(SESSION_REQUEST_EVENT, (error: any, payload: any) => {
        console.log('here')
      walletConnectItem.updateTimestamp()
    

      if (error) {
        Alert.alert(FAIL, error.toString())
        throw error
      }
      Alert.alert('Session request event')  

      console.log(payload)
    //   navigation.dispatch(
    //     StackActions.push(Screens.WalletConnectEvents, {
    //       payload,
    //       eventType: SESSION_REQUEST_EVENT,
    //       wcSession: walletConnectItem,
    //     }),
    //   )
    })

    walletConnectItem.on(SESSION_UPDATE_EVENT, (error: any) => {
      walletConnectItem.updateTimestamp()
    //   onWcTimestampUpdate(walletConnectItem)
    console.log(error)
      if (error) {
        Alert.alert(FAIL, error.toString())
        throw error
      }


    })

    walletConnectItem.on(CALL_REQUEST, (error: any, payload: any) => {
      walletConnectItem.updateTimestamp()
    //   onWcTimestampUpdate(walletConnectItem)

      if (error) {
        Alert.alert(FAIL, error.toString())
        throw error
      }
      console.log(payload)
    //   navigation.dispatch(
    //     StackActions.push(Screens.WalletConnectEvents, {
    //       payload,
    //       eventType: CALL_REQUEST,
    //       wcSession: walletConnectItem,
    //     }),
    //   )
    })

    walletConnectItem.approveSession({
        accounts: [                 // required
          'Test',
   
   
        ],
        chainId: 4                  // required
      })
  






    walletConnectItem.on(DISCONNECT, async (error: any) => {
      walletConnectItem.updateTimestamp()
    //   onWcTimestampUpdate(walletConnectItem)
    
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
