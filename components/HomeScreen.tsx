import { Wallet } from "ethers";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import EthereWalletContext from "../context/Etherwallet";

export const HomeScreen = () => {  
  const wallet = useContext<Wallet>(EthereWalletContext)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{wallet.address}</Text>
    </View>
  );
  
}



