import React, { FC } from 'react'
import { LogBox, Text, TouchableOpacity, View, Image } from 'react-native'
import { CealLogo } from '../../assets/images'
import { AppButton } from '../components/AppButton'



type Props = {
  date: string
  time: string
  payload: {
    id: number
    jsonrpc: string
    method: string
    params: Array<{
      chainId: number
      peerId: string
      peerMeta: {
        description: string
        icons: Array<any>
        name: string
        url: string
      }
    }>
  }
  approveSession: () => void
  rejectSession: () => void
}

export const SessionRequest: FC<Props> = ({
  date,
  time,
  payload,
  approveSession,
  rejectSession,
}) => {
  return (
    <View >
      <View>
        <Text>{payload.params?.[0].peerMeta.name}</Text>
        <View>
          <Image
            source={payload.params?.[0].peerMeta.icons?.[0] || CealLogo}
            
            resizeMode="contain"
          />
        </View>
        <Text>is requesting a connection</Text>
      </View>
      <View
      >
        <View>
          <View/>
        </View>
        <Text>
          Check that this matches with the website you are connecting
        </Text>
        <View>
          {/* <Image source={LockImage} /> */}
          <Text  numberOfLines={1}>
            {payload.params?.[0].peerMeta.url || ''}
          </Text>
        </View>
        <Text>
          Date
        </Text>
        <Text
        >
          {date}
        </Text>
        <Text
        >
          Time
        </Text>
        <Text
        >
          {time}
        </Text>

        <View>
          {/* <TouchableOpacity
            onPress={rejectSession}>
            <Text>Cancel</Text>
          </TouchableOpacity> */}
            <AppButton title="Cancel" onPress={rejectSession}/>

          <View/>
          {/* <TouchableOpacity
            onPress={approveSession}>
            <Text>Connect</Text>
          </TouchableOpacity> */}
         <AppButton title="Connect" onPress={approveSession}/>   

        </View>
      </View>
    </View>
  )
}
