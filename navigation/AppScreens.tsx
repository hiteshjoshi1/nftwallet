
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from "react";




import React from 'react';

import { AboutScreen } from "../Screens/AboutScreen";
import { HomeStackScreen } from "../Screens/Stacks/HomeStack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { Wallet, providers } from 'ethers';
import { EtherWalletProvider } from '../context/Etherwallet';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { LoadingScreen } from '../Screens/components/LoadingScreen';



const Tab = createBottomTabNavigator();

export const AppScreens = () => {

  const [wallet, setWallet] = useState<Wallet>();

  useEffect(() => {
    const getWallet = async () => {
      const mnemonic = await AsyncStorage.getItem('@mnemonic')
      const infuraProjectId = '1f59e51c65114fb68e791ba51f6b729a'
      const provider = new providers.InfuraProvider("rinkeby",infuraProjectId )
      const blockNum = await provider.getBlockNumber()
      
      if (mnemonic) {
        //setWallet(Wallet.fromMnemonic(mnemonic))
        const wallet = Wallet.fromMnemonic(mnemonic)
        const walletWithProvider = wallet.connect(provider)
        setWallet(walletWithProvider)
      }
      else {
        const newWallet = Wallet.createRandom()
        const walletWithProvider = newWallet.connect(provider)
        await AsyncStorage.setItem('@mnemonic', walletWithProvider.mnemonic.phrase)
        setWallet(walletWithProvider)
      }

    };
    getWallet();
  }, []);

  if (!wallet) {
    return (<LoadingScreen message="Loading wallet..." loaderSize='large'/>)
  }
  return (
    <EtherWalletProvider value={wallet}>
      <Tab.Navigator>
        <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{ headerShown: false }} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </EtherWalletProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    
  },

  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 }

});


