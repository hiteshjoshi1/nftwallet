import React, { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";
import { Permission, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import QRCodeScanner from "react-native-qrcode-scanner";
import { FAIL } from "../constants";


import { createNewWcConnector, CustomWalletConnect, registerWalletConnectListeners } from "../utils/walletconnect";
import { useWcDisconnect } from "../utils/walletconnect/onWcDisconnect";




const scanQR = (data: any) => {
    
    if (data) {
     console.log(data.data)
      const wcString = data.data
      
      if (wcString.length > 3 && wcString.substring(0, 3) === 'wc:') {
        const _wcSession = createNewWcConnector(wcString)
        // Save wc session
        // walletConnectList?.length
        //   ? setWalletConnectList([...walletConnectList, _wcSession])
        //   : setWalletConnectList([_wcSession])
        // registerWalletConnectListeners(_wcSession, onWcDisconnect)
      } else {
        Alert.alert('FAIL', 'INVALID_DATA')
      }
    }
  }

  





export const QRScanScreen = () => {

    const [walletConnectList, setWalletConnectList] = useState<CustomWalletConnect[]>([])

    const value = { walletConnectList, setWalletConnectList }
    const { onWcDisconnect } = useWcDisconnect()

    const [isCameraPermissionGranted, setIsCameraPermissionGranted] = useState(false)

    const requestCameraPermission = (permission: Permission) => {
        request(permission)
          .then((result) => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                // learnMoreContext.setScanQrDialog(false)
                Alert.alert(FAIL, 'FEATURE_IS_NOT_AVAILABLE')
                break
              case RESULTS.DENIED:
                // learnMoreContext.setScanQrDialog(false)
                Alert.alert(FAIL, 'CAMERA_PERMISSION_IS_DENIED')
                break
              case RESULTS.GRANTED:
                setIsCameraPermissionGranted(true)
                break
              case RESULTS.BLOCKED:
                // learnMoreContext.setScanQrDialog(false)
                Alert.alert(FAIL, 'CAMERA_PERMISSION_IS_DENIED')
                break
            }
          })
          .catch((error) => {
            // learnMoreContext.setScanQrDialog(false)
            Alert.alert(FAIL, error)
          })
      }
      


    useEffect(() => {
        if (Platform.OS === 'android') {
          requestCameraPermission(PERMISSIONS.ANDROID.CAMERA)
        } else if (Platform.OS === 'ios') {
          requestCameraPermission(PERMISSIONS.IOS.CAMERA)
        } else {
          Alert.alert('Fail', 'Only android and ios are supported')
        }
      }, [])


    const backPressHandler = () => {
        // learnMoreContext.setScanQrDialog(false)
      }

    return (

        
        <View style={styles.containerView}>
          {Platform.OS === 'android' && isCameraPermissionGranted && (
            <View style={styles.cameraView}>
              {/* <TouchableOpacity style={styles.backButton} onPress={backPressHandler}>
                <Text style={styles.backButtonText}>BACK</Text>
              </TouchableOpacity> */}
              <QRCodeScanner onRead={scanQR} flashMode={RNCamera.Constants.FlashMode.auto} />
            </View>
          )}
          {Platform.OS === 'ios' && isCameraPermissionGranted && (
            <View>
              <TouchableOpacity style={styles.backButton} onPress={backPressHandler}>
                <Text style={styles.backButtonText}>BACK</Text>
              </TouchableOpacity>
              <QRCodeScanner onRead={scanQR} flashMode={RNCamera.Constants.FlashMode.auto} />
            </View>
          )}
        </View>


    );
  
}

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    },
    containerView: {
        position: 'absolute',
        top: 0,
        opacity: 0.8,
        left: 0,
        right: 0,
        borderRadius: 10,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
      },
      cameraView: {
        alignSelf: 'center',
      },
      backButtonText: {
        color: '#363B98',
        fontSize: 14,
      },
      backButton: {
        backgroundColor: '#7ED7DD',
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 20,
        left: 10,
        zIndex: 2,
        elevation: 2,
      },
      androidCameraViewStyle: {
        flex: 1,
      }
  });

function setWalletConnectList(arg0: import("../utils/walletconnect").CustomWalletConnect[]) {
    throw new Error("Function not implemented.");
}

function onWcDisconnect(_wcSession: CustomWalletConnect, onWcDisconnect: any) {
    throw new Error("Function not implemented.");
}
  