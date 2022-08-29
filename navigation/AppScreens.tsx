
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FC, useRef, useContext, useEffect, useState } from "react";




import React from 'react';

import { AboutScreen } from "../components/AboutScreen";
import { HomeStackScreen } from "../components/Stacks/HomeStack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Wallet } from 'ethers';
import { EtherWalletProvider } from '../context/Etherwallet';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';




const Tab = createBottomTabNavigator();

export const  AppScreens =  ()=> {

  
  const [wallet, setWallet] = useState<Wallet>();

  useEffect(() => {
    const getWallet = async () => {
      const mnemonic = await AsyncStorage.getItem('@mnemonic')
      if(mnemonic ) {
        setWallet(Wallet.fromMnemonic(mnemonic))
      }
      else {
        const newWallet = Wallet.createRandom()
        await AsyncStorage.setItem('@mnemonic', newWallet.mnemonic.phrase)
        setWallet(newWallet)
      }

    };
    getWallet();
  }, []);

  if (!wallet) {
    return (
    <View style={[styles.container, styles.horizontal]}>
     <ActivityIndicator size="large" color="#00ff00" />
    </View>
    )
    
  }
  return (
    <EtherWalletProvider value ={wallet}>
    <Tab.Navigator>
      <Tab.Screen name="HomeStack" component={HomeStackScreen}  options={{ headerShown: false }}/>
      <Tab.Screen name="About" component={AboutScreen} />
      
    </Tab.Navigator>
    </EtherWalletProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});


