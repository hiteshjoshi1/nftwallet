import React, { FC, useContext } from 'react'
import { Dimensions, LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { APPROVE, LOG_BOX_LOGS, REJECT } from '../../constants'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen'
import { AppButton } from '../components/AppButton'
import { Wallet } from 'ethers'
import EthereWalletContext from '../../context/Etherwallet'



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



  return (
    <View>
      <View
      >
        <Text>Call Request</Text>
        <Text>is making request</Text>
      </View>
      <View
      >
        <View>
          <View/>
        </View>
        <Text>
          Check if the website valid
        </Text>
        <Text
        >
          Date:
        </Text>
        <Text
        >
          {date}
        </Text>
        <Text
        >
          Time:
        </Text>
        <Text
        >
          {time}
        </Text>


        <View style={{alignItems: 'center', justifyContent: 'center', padding:10 }}>
            <AppButton title="Connect" onPress={() => approveCallRequest(payload)}/>   
            

          <View/>
          <View style={{alignItems: 'center', justifyContent: 'center', padding:10 }}>
          <AppButton title="Cancel" onPress={() => rejectCallRequest(payload)}/>
         </View>


        {/* <View>
          <TouchableOpacity
            onPress={() => rejectCallRequest(payload)}
            
          >
            <Text>{REJECT}</Text>
          </TouchableOpacity>
          <View/> */}
          {/* <TouchableOpacity
            onPress={() => approveCallRequest(payload)}
    
          >
            <Text>{APPROVE}</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  )
}

// const styles = StyleSheet.create({
//     imageBackground: {
//       width: '100%',
//       height: '100%',
//     },
//     safeAreaView: { marginHorizontal: wp('5%'), flex: 1 },
//     background: {
//       height: hp('100%'),
//     },
//     container: {
//       flex: 1,
//       width: Dimensions.get('window').width,
//       justifyContent: 'center',
//       backgroundColor: 'rgba(52, 52, 52, 0.8)',
//       height: Dimensions.get('window').height,
//     },
//     horizontal: {
//       flexDirection: 'row',
//       justifyContent: 'space-around',
//       padding: 10,
//     },
//     maxContainer: {
//       width: '100%',
//       height: '100%',
//     },
//     logoContainer: {
//       overflow: 'hidden',
//       alignItems: 'center',
//       position: 'relative',
//       height: 120,
//       width: 'auto',
//     },
//     logo: {
//       flex: 1,
//     },
//     fortyPercentHeight: {
//       height: '40%',
//     },
//     sixtyPercentHeight: {
//       height: '60%',
//     },
//     flexBottom: {
//       flex: 1,
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//       marginBottom: wp('10%'),
//     },
//     title: {
//       color: '#fff',
//       fontSize: wp('7%'),
//       fontWeight: '600',
//     },
//     description: {
//       color: '#fff',
//     },
//     urlContainer: {
//       marginLeft: 12,
//       marginRight: 12,
//       marginTop: 12,
//       backgroundColor: 'rgba(255, 255, 255, 0.15)',
//       padding: 20,
//       borderRadius: 15,
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
//     urlText: {
//       color: '#7ED7DD',
//       fontWeight: '600',
//       marginLeft: 12,
//       marginRight: 16,
//     },
//     urlContainerChild: {
//       backgroundColor: 'rgba(255, 255, 255, 0.15)',
//     },
//     drawerLikeContainer: {
//       backgroundColor: '#171561',
//       borderTopLeftRadius: 25,
//       borderTopRightRadius: 25,
//     },
//     bar: {
//       width: wp('20%'),
//       marginTop: wp('5%'),
//       marginBottom: wp('8%'),
//       height: 6,
//       borderRadius: 50,
//       backgroundColor: 'rgba(255, 255, 255, 0.23)',
//     },
//     center: {
//       alignItems: 'center',
//     },
//     whiteFont: {
//       color: '#fff',
//     },
//     boldFont: {
//       fontWeight: '600',
//     },
//     marginLeft: {
//       marginLeft: wp('3%'),
//     },
//     marginTop: {
//       marginTop: 16,
//     },
//     twoColumns: {
//       flex: 1,
//       flexDirection: 'row',
//       alignItems: 'flex-end',
//       justifyContent: 'center',
//     },
//     cancelButton: {
//       padding: 20,
//       marginLeft: 20,
//       borderRadius: 15,
//       borderColor: '#fff',
//       borderWidth: 1,
//       alignContent: 'center',
//       marginBottom: 30,
//     },
//     cancelButtonText: {
//       textAlign: 'center',
//       color: '#fff',
//     },
//     width20: {
//       width: 20,
//     },
//     flex: {
//       flex: 1,
//     },
//     connectButton: {
//       padding: 20,
//       marginRight: 20,
//       borderRadius: 15,
//       borderColor: '#7ED7DD',
//       borderWidth: 1,
//       alignContent: 'center',
//       marginBottom: 30,
//       backgroundColor: '#7ED7DD',
//     },
//     connectButtonText: {
//       textAlign: 'center',
//       color: '#171561',
//     },
//   })
