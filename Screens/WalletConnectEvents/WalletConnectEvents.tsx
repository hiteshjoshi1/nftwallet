
import React, { FC, useContext, useState } from 'react'
import { ActivityIndicator, LogBox, Text, View } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import type WalletConnect from '@walletconnect/client'
import { WalletConnectContext } from '../../utils'
import { CALL_REQUEST, HOME_SCREEN, LOG_BOX_LOGS, REJECT, SESSION_REQUEST_EVENT, ETH_METHODS } from '../../constants'
import { Wallet } from 'ethers'
import { SessionRequest } from './SessionRequest'
import { CallRequest } from './CallRequest'

import EthereWalletContext from '../../context/Etherwallet'
import { LoadingScreen } from '../components/LoadingScreen'
import { arrayify } from 'ethers/lib/utils'


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

const WalletConnectEvents = ({ route }: any) => {
  const navigation = useNavigation()
  const wallet = useContext<Wallet>(EthereWalletContext)
  const { walletConnectList, setWalletConnectList } = useContext(WalletConnectContext)

  const { eventType, payload, address } = route.params
  const wcSession: WalletConnect = route.params.wcSession

  const date = dayjs().format('DD MMM YYYY')
  const time = dayjs().format('hh:mm A')
  const [txInProgress, settxInProgress] = useState(false)

  const goBack = () => {
    navigation.goBack()
  }

  const acceptSession = async () => {
    const accounts = [address || '']

    const chainId = 4

    wcSession.approveSession({
      accounts: accounts,
      chainId: chainId,
    })

    // console.log('peer meta',payload.params[0].peerMeta)

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

    navigation.dispatch(
      StackActions.push(HOME_SCREEN),
    )

  }

  const rejectSession = () => {
    wcSession.rejectSession()
    setWalletConnectList([
      ...walletConnectList.filter((_wc) => _wc.handshakeTopic !== wcSession.handshakeTopic),
    ])
    goBack()
  }

  const approveCallRequest = async (payload: any) => {
    const txHash = await handleAllTransactions(payload)
    wcSession.approveRequest({
      id: payload.id,
      result: txHash,
      jsonrpc: payload.jsonrpc
    })
    goBack()
  }




  const handleAllTransactions = async (payload: any) => {
    console.log('call request', payload)

    switch (payload.method) {
      case ETH_METHODS.ETH_SEND_TRANSACTION:
        const { from, to, data, value } = payload?.params[0]
        let transactionParams = {
          from: from,
          to: to,
          value: value,
          data: data
        }
        const submittedTransaction = await wallet.sendTransaction(transactionParams)
        settxInProgress(true)
        const transaction = await submittedTransaction.wait()
        console.log(transaction)
        settxInProgress(false)
        console.log('https://rinkeby.etherscan.io/tx/' + transaction.transactionHash)
        return transaction.transactionHash;

      case ETH_METHODS.ETH_SIGN:
        console.log('Eth sign')
        break;

      case ETH_METHODS.PERSONAL_SIGN:
        const dataToSign = payload?.params[0]
        const accountToSign = payload?.params[1]
        const arrayfied = arrayify(dataToSign)
        const signature = await wallet.signMessage(arrayfied)
        return signature;

      case ETH_METHODS.ETH_SIGN_TRANSACTION:
        console.log('Eth sign transaction')
        break;

      case ETH_METHODS.ETH_SEND_RAW_TRANSACTION:
        console.log('Eth send raw transaction')
        break;

      default:
        console.log('default transaction')
        break;
    }

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
          approveSession={acceptSession}
          rejectSession={rejectSession}
        />
      )}


      {eventType === CALL_REQUEST && (
        <CallRequest
          date={date}
          time={time}
          payload={payload}
          approveCallRequest={approveCallRequest}
          rejectCallRequest={rejectCallRequest}
        />
      )}
      {txInProgress && (
        <LoadingScreen message="Transaction is being processed" loaderSize={'large'}></LoadingScreen>
      )}
    </View>
  )
}

export default WalletConnectEvents
