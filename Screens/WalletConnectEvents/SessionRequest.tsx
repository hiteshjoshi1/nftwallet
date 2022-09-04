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
      <Text style={{
                      textAlign: "center",
                      color: "black",
                      fontWeight: "bold",
                      padding:10 
                    }}>{payload.params?.[0].peerMeta.name} is requesting a connection</Text>
        <View>
          <Image
            source={payload.params?.[0].peerMeta.icons?.[0] || CealLogo}
            
            resizeMode="contain"
          />
        </View>
      </View>
      <View
      >
        <View>
          <View/>
        </View>
        <Text>
          Check that the link below matches with the website you are connecting
        </Text>
        <View>
          {/* <Image source={LockImage} /> */}
          <Text style={{
                      textAlign: "center",
                      color: "black",
                      fontWeight: "bold",
                      padding:10 
                    }} numberOfLines={1}>
            {payload.params?.[0].peerMeta.url || ''}
          </Text>
        </View>
        <Text>
          Date : {date}
        </Text>
   
        <Text
        >
          Time: {time}
        </Text>
   

         <View style={{alignItems: 'center', justifyContent: 'center', padding:10 }}>
            <AppButton title="Connect" onPress={approveSession}/>   
            

          <View/>
          <View style={{alignItems: 'center', justifyContent: 'center', padding:10 }}>
          <AppButton title="Cancel" onPress={rejectSession}/>
         </View>

        </View>
      </View>
    </View>
  )
}
