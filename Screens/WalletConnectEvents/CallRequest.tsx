import React, { FC, useContext } from 'react'
import { Dimensions, Image, LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { APPROVE, LOG_BOX_LOGS, REJECT } from '../../constants'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import { AppButton } from '../components/AppButton'
import { CealLogo } from '../../assets/images'




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

  console.log('Payoad in call', payload)

  const params = payload.params

  return (
    <View>
        <Text> Transaction details </Text>
        <View>
              <Text> Method type : {params[0].method} </Text>
              <Text> From : {params[0].from} </Text>
              <Text> To : {params[0].to} </Text>
              <Text> Value : {params[0].value} </Text>
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
}


