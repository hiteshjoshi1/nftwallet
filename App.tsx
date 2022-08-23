/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren, useState} from 'react';


import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import { useWcDisconnect } from './utils/walletconnect/onWcDisconnect';
// import { useNavigation } from '@react-navigation/native';
import WebviewCrypto from 'react-native-webview-crypto'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createNewWcConnector, CustomWalletConnect, registerWalletConnectListeners } from './utils/walletconnect';




const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};





const App = () => {
  
  
  // const onSuccess = ((e:BarCodeReadEvent) => {
  //   console.log(e.data);
  // })
  const [showQrCode, setShowQrCode] = useState(false)
  const { onWcDisconnect } = useWcDisconnect()
  // const navigation = useNavigation()

  
  // const { onWcTimestampUpdate } = useWcTimestampUpdate()

  const [walletConnectList, setWalletConnectList] = useState<CustomWalletConnect[]>([])
  const value = { walletConnectList, setWalletConnectList }

  const onSuccess = (data: any) => {
    if (data) {
     
      const wcString = data.data
      console.log(wcString)
      if (wcString.length > 3 && wcString.substring(0, 3) === 'wc:') {
        const _wcSession = createNewWcConnector(wcString)
        walletConnectList?.length
          ? setWalletConnectList([...walletConnectList, _wcSession])
          : setWalletConnectList([_wcSession])
        registerWalletConnectListeners(_wcSession, onWcDisconnect)
      } else {
        Alert.alert('FAIL', 'INVALID_DATA')
      }
    }
  }
  
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  return (
    <SafeAreaView style={backgroundStyle}>
    <WalletConnectContext.Provider value={value}>
    <WebviewCrypto />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
      <Header />
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
     
      </ScrollView>
      </WalletConnectContext.Provider>
    </SafeAreaView>
  );
};


export interface WalletConnectStateType {
  walletConnectList: CustomWalletConnect[]
  setWalletConnectList: (walletConnect: CustomWalletConnect[]) => void
}

export const WalletConnectContext = React.createContext<WalletConnectStateType>({
  walletConnectList: [],
  setWalletConnectList: (walletConnect: CustomWalletConnect[]) => {},
})





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
});

export default App;
