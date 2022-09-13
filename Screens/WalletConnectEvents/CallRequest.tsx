import { utils } from 'ethers'
import React, { FC, useContext } from 'react'
import {  LogBox, StyleSheet, Text, View } from 'react-native'
import { ETH_METHODS, LOG_BOX_LOGS } from '../../constants'

import { AppButton } from '../components/AppButton'





LogBox.ignoreLogs([LOG_BOX_LOGS])

type Props = {
  date: string
  time: string
  payload: {
    id: number
    jsonrpc: string
    method: string
    params: any
  }
  approveCallRequest: (payload: {
    id: number
    jsonrpc: string
    method: string
    params: any
  }) => void
  rejectCallRequest: (payload: { id: number; jsonrpc: string; method: string; params: any }) => void
}

export const CallRequest: FC<Props> = ({
  date,
  time,
  payload,
  approveCallRequest,
  rejectCallRequest,
}) => {


  const params = payload.params
  console.log('payload', payload)

  switch (payload.method) {
    case ETH_METHODS.ETH_SEND_TRANSACTION:
        const { from, to, data, value } = payload?.params[0]

        const valueInEth = utils.formatEther(value);
        
        // const t2 = utils.toUtf8String(value)
        return (
          <View>
          <Text style = {[styles.largeText, styles.simpleText]}> Request details </Text>
          <View>
            <View>
          <Text style = {[styles.mediumText, styles.simpleText]}> Method type : {payload.method} </Text>
          </View>
          <View>
          <Text style = {[styles.mediumText, styles.simpleText]}>From : {from} </Text>
          </View>
           <View>
           <Text style = {[styles.mediumText, styles.simpleText]}>To : {to} </Text>
           </View>
           <View>
           <Text style = {[styles.mediumText, styles.simpleText]}>Value : {valueInEth} Eth </Text>
           </View>
           
          </View>
  
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <AppButton title="Connect" onPress={() => approveCallRequest(payload)} />
          <View />
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <AppButton title="Cancel" onPress={() => rejectCallRequest(payload)} />
          </View>
        </View>
      </View >
        )

      case ETH_METHODS.ETH_SIGN:
        console.log('Eth_Sign')
        return (
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        <AppButton title="Connect" onPress={() => approveCallRequest(payload)} />
        <View />
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <AppButton title="Cancel" onPress={() => rejectCallRequest(payload)} />
        </View>
      </View>
        )

      case ETH_METHODS.PERSONAL_SIGN:
        const dataToSign = payload?.params[0]
        const messageClearText = utils.toUtf8String(dataToSign);
        console.log(messageClearText)
        return (
          <View>
            <Text style = {[styles.largeText, styles.simpleText]}> Sign a challenge</Text>
            <Text style = {[styles.mediumText, styles.simpleText]}>Data to Sign</Text>
            <Text style = {[styles.smallText, styles.simpleText]}> {messageClearText} </Text>
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <AppButton title="Connect" onPress={() => approveCallRequest(payload)} />
          <View />
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <AppButton title="Cancel" onPress={() => rejectCallRequest(payload)} />
          </View>
        </View>
        </View>
          )
    

      case ETH_METHODS.ETH_SIGN_TRANSACTION:
        console.log('Eth sign transaction')
        return (
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <AppButton title="Connect" onPress={() => approveCallRequest(payload)} />
          <View />
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <AppButton title="Cancel" onPress={() => rejectCallRequest(payload)} />
          </View>
        </View>
        )

      case ETH_METHODS.ETH_SEND_RAW_TRANSACTION:
        console.log('Eth send raw transaction')
        return (
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <AppButton title="Connect" onPress={() => approveCallRequest(payload)} />
          <View />
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <AppButton title="Cancel" onPress={() => rejectCallRequest(payload)} />
          </View>
        </View>
        )

      default:
        console.log('default transaction')
        return (
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <AppButton title="Connect" onPress={() => approveCallRequest(payload)} />
          <View />
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <AppButton title="Cancel" onPress={() => rejectCallRequest(payload)} />
          </View>
        </View>
        )
    }

}

const styles = StyleSheet.create({
  simpleText: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    padding: 10
  },
  largeText: {
    fontSize: 20
  },
  smallText: {
    fontSize: 10
  },
  mediumText: {
    fontSize: 15
  }

})
