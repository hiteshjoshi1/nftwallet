
import React, { FC, useContext } from 'react'
import { LogBox, View } from 'react-native'


import { useNavigation } from '@react-navigation/native'


import dayjs from 'dayjs'

import type WalletConnect from '@walletconnect/client'
import { WalletConnectContext } from '../../utils'
import { LOG_BOX_LOGS, REJECT, SESSION_REQUEST_EVENT } from '../../constants'
import { Wallet } from 'ethers'
import { SessionRequest } from './SessionRequest'

type Props = {
    route: {
      params: {
        eventType: typeof SESSION_REQUEST_EVENT | 'call_request'
        payload: any
        wcSession: WalletConnect,
        address: string
      }
    }
  }

  LogBox.ignoreLogs([LOG_BOX_LOGS])

const WalletConnectEvents  = ({route}:any) => {
  const navigation = useNavigation()
  const { walletConnectList, setWalletConnectList } = useContext(WalletConnectContext)
  
  const { eventType, payload, wallet } = route.params
  const wcSession = route.params.wcSession

  const date = dayjs().format('DD MMM YYYY')
  const time = dayjs().format('hh:mm A')

  const goBack = () => {
    navigation.goBack()
  }

  const approveSession = async () => {
    const accounts = [wallet.address|| '']
    const chainId = 4

    wcSession.approveSession({
      accounts: accounts,
      chainId: chainId,
    })

    //store in cache
    // await localWalletConnectStore.store({
    //   payload: {
    //     connected: true,
    //     accounts: accounts,
    //     chainId: chainId,
    //     bridge: wcSession?.session.bridge,
    //     key: wcSession?.session.key,
    //     clientId: wcSession?.clientId,
    //     clientMeta: wcSession?.clientMeta,
    //     peerId: wcSession?.peerId,
    //     peerMeta: wcSession?.peerMeta,
    //     handshakeId: wcSession?.handshakeId,
    //     handshakeTopic: wcSession?.handshakeTopic,
    //     uri: wcSession?.uri,
    //   },
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   id: wcSession.clientId,
    // })

    if (wcSession?.peerMeta?.icons?.[1] !== 'PREVENT_NAVIGATION') {
      goBack()
    }
  }

  const rejectSession = () => {
    wcSession.rejectSession()
    setWalletConnectList([
      ...walletConnectList.filter((_wc) => _wc.handshakeTopic !== wcSession.handshakeTopic),
    ])
    goBack()
  }

  const approveCallRequest = (payload: any) => {
    wcSession.approveRequest({
      id: payload.id,
      result: '',
    })
    goBack()
  }

  const rejectCallRequest = (payload: any) => {
    wcSession.rejectRequest({
      id: payload.id,
      error: {
        message: REJECT,
      },
    })
    goBack()
  }

  return (
    <View>
      {eventType === SESSION_REQUEST_EVENT && (
        <SessionRequest
          date={date}
          time={time}
          payload={payload}
          approveSession={approveSession}
          rejectSession={rejectSession}
        />
      )}
      {/* {eventType === CALL_REQUEST && (
        <CallRequest
          date={date}
          time={time}
          payload={payload}
          approveCallRequest={approveCallRequest}
          rejectCallRequest={rejectCallRequest}
        />
      )} */}
    </View>
  )
}

export default WalletConnectEvents
