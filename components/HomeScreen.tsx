import { Wallet } from "ethers";
import React, { useContext } from "react";
import { Alert, Button, Text, View } from "react-native";
import EthereWalletContext from "../context/Etherwallet";



export const HomeScreen = ({ navigation }) => {  
  const wallet = useContext<Wallet>(EthereWalletContext)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Your Ethereum Wallet Address</Text>
      <Text>{wallet.address}</Text>
      <Button
        title="Cilck to scan QR"
        
        onPress={() => navigation.navigate('QR')}
      />

    </View>
  );
  
}



