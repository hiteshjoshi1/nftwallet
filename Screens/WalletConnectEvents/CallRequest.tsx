import React, { FC, useContext } from 'react'
import {  LogBox, StyleSheet, Text, View } from 'react-native'
import { LOG_BOX_LOGS } from '../../constants'

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
// fix the screens for different method types
  return (
    <View>
        <Text style = {[styles.largeText, styles.simpleText]}> Call request details </Text>
        <View>
        <Text style = {[styles.mediumText, styles.simpleText]}> Method type : {params[0].method} </Text>

         <Text style = {[styles.mediumText, styles.simpleText]}>From : {params[0].from} </Text>
         <Text style = {[styles.mediumText, styles.simpleText]}>To : {params[0].to} </Text>
         <Text style = {[styles.mediumText, styles.simpleText]}>Value : {params[0].value} </Text>
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
