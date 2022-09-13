import React, { FC } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

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
        <View style={styles.container}>
          <Image style={styles.tinyLogo}
            source={{ uri: payload.params?.[0].peerMeta.icons?.[0] }}
          />
        </View>
      </View>

        <View>
          <Text style={[styles.largeText, styles.simpleText]}>
            {payload.params?.[0].peerMeta.url || ''}
          </Text>
          <Text style={styles.simpleText}>
            Wants to connect
          </Text>
          <Text style={styles.simpleText}>
            Check that the link above matches with the website you are connecting
          </Text>
        </View>

        <View>
        <Text style={[styles.largeText, styles.simpleText]}>
          Connect to this site?
        </Text>
        <Text style={[styles.smallText, styles.simpleText]}>
          By clicking connect, you allow this dapp to view your public address.
          This is an important security step to protect your data from poetential security risks.
        </Text>


        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <AppButton title="Connect" onPress={approveSession} />

          <View />
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <AppButton title="Cancel" onPress={rejectSession} />
          </View>

        </View>
      </View>
    </View>
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
  },
  tinyLogo: {
    align: "center",
    height: 50,
    width: 50
  },
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
})