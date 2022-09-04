import { Wallet } from "ethers";
import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SCAN_SCREEN } from "../constants";
import EthereWalletContext from "../context/Etherwallet";
import { AppButton } from "./components/AppButton";
import Clipboard from '@react-native-clipboard/clipboard';

const copyToClipboard = (txt: string) => {
  console.log(txt)
  Clipboard.setString(txt);
};

export const HomeScreen = ({ navigation }: any) => {
  const wallet = useContext<Wallet>(EthereWalletContext)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ padding: 10 }}>Your Ethereum Wallet Address</Text>



      <Text style={{
        textAlign: "center",
        color: "black",
        fontWeight: "bold",
        
      }}
      >{wallet.address}</Text>


      <TouchableOpacity onPress={()=> copyToClipboard(wallet.address)}>
          <Text style= {{padding: 10}}>Click here to copy to Clipboard</Text>
        </TouchableOpacity>

      <AppButton title="Click to scan QR" onPress={() => navigation.navigate(SCAN_SCREEN)} />
    </View>
  );

}



