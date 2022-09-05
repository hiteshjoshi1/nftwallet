import React, {useState } from 'react';



import { useWcDisconnect } from './utils/walletconnect/onWcDisconnect';
import WebviewCrypto from 'react-native-webview-crypto'
import { CustomWalletConnect } from './utils/walletconnect';
import { NavigationContainer } from '@react-navigation/native';
import { AppScreens } from './navigation/AppScreens';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';




const App =  () => {

  const { onWcDisconnect } = useWcDisconnect()
  const [walletConnectList, setWalletConnectList] = useState<CustomWalletConnect[]>([])
  const value = { walletConnectList, setWalletConnectList }

  return (

    
    <WalletConnectContext.Provider value={value}>
      <WebviewCrypto />
     <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <AppScreens></AppScreens>
        </SafeAreaView>
      </NavigationContainer>

     
    </WalletConnectContext.Provider>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});



export interface WalletConnectStateType {
  walletConnectList: CustomWalletConnect[]
  setWalletConnectList: (walletConnect: CustomWalletConnect[]) => void
}

export const WalletConnectContext = React.createContext<WalletConnectStateType>({
  walletConnectList: [],
  setWalletConnectList: (walletConnect: CustomWalletConnect[]) => { },
})

export default App;
