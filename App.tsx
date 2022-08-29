import React, {useState } from 'react';



import { useWcDisconnect } from './utils/walletconnect/onWcDisconnect';
import WebviewCrypto from 'react-native-webview-crypto'
import { CustomWalletConnect } from './utils/walletconnect';
import { NavigationContainer } from '@react-navigation/native';
import { AppScreens } from './navigation/AppScreens';
import { HomeScreen } from './components/HomeScreen';
import { ContactScreen } from './components/ContactScreen';



const App =  () => {

  const { onWcDisconnect } = useWcDisconnect()
  const [walletConnectList, setWalletConnectList] = useState<CustomWalletConnect[]>([])
  const value = { walletConnectList, setWalletConnectList }

  return (

    
    <WalletConnectContext.Provider value={value}>
      <WebviewCrypto />
      <NavigationContainer>
        <AppScreens></AppScreens>
        
      </NavigationContainer>
    </WalletConnectContext.Provider>

  );
};



export interface WalletConnectStateType {
  walletConnectList: CustomWalletConnect[]
  setWalletConnectList: (walletConnect: CustomWalletConnect[]) => void
}

export const WalletConnectContext = React.createContext<WalletConnectStateType>({
  walletConnectList: [],
  setWalletConnectList: (walletConnect: CustomWalletConnect[]) => { },
})

export default App;
